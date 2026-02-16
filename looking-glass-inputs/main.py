import os
import threading
import time
from datetime import datetime
from pathlib import Path

import matplotlib
import matplotlib.pyplot as plt
import numpy as np
from dotenv import load_dotenv
from flask import Flask, request
from watchdog.events import FileSystemEventHandler
from watchdog.observers import Observer
from web3 import Web3


matplotlib.use("Agg")

BASE_DIR = Path(__file__).resolve().parent
load_dotenv(BASE_DIR / ".env")

WATCH_DIR = (BASE_DIR / os.getenv("WATCH_DIR", "./looking_glass_inputs")).resolve()
PLOT_DIR = (BASE_DIR / os.getenv("PLOT_DIR", "./plots")).resolve()
BATCH_SIZE = int(os.getenv("BATCH_SIZE", "50"))

ETH_RPC_URL = os.getenv("ETH_RPC_URL", "")
ETH_PRIVATE_KEY = os.getenv("ETH_PRIVATE_KEY", "")
CHAIN_ID = int(os.getenv("CHAIN_ID", "11155111"))  # Sepolia
TO_ADDRESS_ENV = os.getenv("TO_ADDRESS", "")
GAS_PRICE_GWEI = os.getenv("GAS_PRICE_GWEI", "")

FLASK_HOST = os.getenv("FLASK_HOST", "0.0.0.0")
FLASK_PORT = int(os.getenv("FLASK_PORT", "5000"))

for directory in (WATCH_DIR, PLOT_DIR):
    directory.mkdir(parents=True, exist_ok=True)


def quantum_harmonic_sim(numbers, keys):
    harmonics = []
    if len(keys) == 0:
        raise ValueError("keys array must not be empty")
    for i, num in enumerate(numbers):
        key = keys[i % len(keys)]
        harmonic = np.sin(float(num) * 0.01) * (float(key) % 1000.0)
        harmonics.append(float(harmonic))
    return harmonics


def predict_future(harmonics):
    return float(sum(harmonics) * 0.42)


def _safe_name(source_name: str) -> str:
    return "".join(c if c.isalnum() or c in {"-", "_"} else "_" for c in source_name)[:80]


def plot_harmonics(harmonics, source_name):
    timestamp = datetime.utcnow().strftime("%Y%m%d-%H%M%S")
    filename = f"{_safe_name(source_name)}-{timestamp}.png"
    output_path = PLOT_DIR / filename

    plt.figure(figsize=(9, 4))
    plt.plot(harmonics, marker="o", linestyle="-", color="cyan")
    plt.title(f"Harmonics from {source_name}")
    plt.xlabel("Index")
    plt.ylabel("Amplitude")
    plt.grid(True, alpha=0.3)
    plt.tight_layout()
    plt.savefig(output_path, dpi=120)
    plt.close()

    return output_path


w3 = Web3(Web3.HTTPProvider(ETH_RPC_URL)) if ETH_RPC_URL else None
wallet_address = None
if w3 and ETH_PRIVATE_KEY:
    wallet_address = w3.eth.account.from_key(ETH_PRIVATE_KEY).address


def _build_tx(prediction: str):
    if w3 is None or wallet_address is None:
        raise RuntimeError("Blockchain not configured. Set ETH_RPC_URL and ETH_PRIVATE_KEY in .env")

    to_address = TO_ADDRESS_ENV if TO_ADDRESS_ENV else wallet_address
    nonce = w3.eth.get_transaction_count(wallet_address, "pending")
    data_hex = Web3.to_hex(text=prediction)

    tx = {
        "from": wallet_address,
        "to": Web3.to_checksum_address(to_address),
        "value": 0,
        "nonce": nonce,
        "chainId": CHAIN_ID,
        "data": data_hex,
    }

    if GAS_PRICE_GWEI:
        tx["gasPrice"] = w3.to_wei(float(GAS_PRICE_GWEI), "gwei")
    else:
        tx["gasPrice"] = w3.eth.gas_price

    tx["gas"] = w3.eth.estimate_gas(tx)
    return tx


def log_to_blockchain(prediction):
    try:
        tx = _build_tx(prediction)
        signed_tx = w3.eth.account.sign_transaction(tx, ETH_PRIVATE_KEY)
        tx_hash = w3.eth.send_raw_transaction(signed_tx.raw_transaction)
        print("Logged to blockchain:", tx_hash.hex())
    except Exception as exc:
        print("Blockchain logging error:", exc)


def parse_input_file(path: Path):
    with path.open("r", encoding="utf-8") as handle:
        lines = [
            line.strip()
            for line in handle
            if line.strip() and not line.strip().startswith("#")
        ]

    if len(lines) < 2:
        raise ValueError("Expected at least 2 non-comment lines")

    radionuc_numbers = [int(x.strip()) for x in lines[0].split(",") if x.strip()]
    scalar_keys = [int(x.strip()) for x in lines[1].split(",") if x.strip()]

    if not radionuc_numbers:
        raise ValueError("No radionuc numbers found")
    if not scalar_keys:
        raise ValueError("No scalar keys found")

    return radionuc_numbers, scalar_keys


class NewFileHandler(FileSystemEventHandler):
    def on_created(self, event):
        if event.is_directory:
            return
        if not event.src_path.endswith(".txt"):
            return

        file_path = Path(event.src_path)
        try:
            numbers, keys = parse_input_file(file_path)
            harmonics = quantum_harmonic_sim(numbers, keys)
            prediction = str(predict_future(harmonics))

            print(f"\nFile: {file_path}")
            print("Radionuc Numbers:", numbers)
            print("Scalar Keys:", keys)
            print("Harmonics:", harmonics)
            print("Predicted Outcome:", prediction)

            saved_plot = plot_harmonics(harmonics, file_path.stem)
            print("Saved plot:", saved_plot)
            log_to_blockchain(prediction)
        except Exception as exc:
            print("Error processing file:", exc)


def start_file_watcher():
    observer = Observer()
    observer.schedule(NewFileHandler(), path=str(WATCH_DIR), recursive=False)
    observer.start()
    print(f"Watching folder: {WATCH_DIR} for new .txt files...")

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()


app = Flask(__name__)
data_buffer = []


@app.route("/health", methods=["GET"])
def health():
    return {"status": "ok"}


@app.route("/data", methods=["POST"])
def receive_data():
    global data_buffer

    body = request.get_json(silent=True) or {}
    if "voltage" not in body:
        return {"error": "missing 'voltage'"}, 400

    try:
        voltage = float(body["voltage"])
    except (TypeError, ValueError):
        return {"error": "'voltage' must be numeric"}, 400

    data_buffer.append(voltage)

    if len(data_buffer) >= BATCH_SIZE:
        numbers = np.array(data_buffer, dtype=float)
        harmonics = quantum_harmonic_sim(numbers, numbers)
        prediction = str(predict_future(harmonics))

        print("\nESP32 Live Data Prediction:", prediction)
        saved_plot = plot_harmonics(harmonics, "esp32-live")
        print("Saved plot:", saved_plot)
        log_to_blockchain(prediction)

        data_buffer = []

    return {"status": "ok", "buffer_size": len(data_buffer)}


def start_flask_server():
    print(f"Starting Flask server on http://{FLASK_HOST}:{FLASK_PORT}")
    app.run(host=FLASK_HOST, port=FLASK_PORT, debug=False, use_reloader=False)


def main():
    if not ETH_RPC_URL:
        print("Warning: ETH_RPC_URL not set. Blockchain logging will fail.")
    if not ETH_PRIVATE_KEY:
        print("Warning: ETH_PRIVATE_KEY not set. Blockchain logging will fail.")

    watcher_thread = threading.Thread(target=start_file_watcher, daemon=True)
    watcher_thread.start()

    start_flask_server()


if __name__ == "__main__":
    main()
