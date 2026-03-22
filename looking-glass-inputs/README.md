# Looking Glass Inputs (Ethereum Mainnet)

This subproject watches `.txt` files, accepts ESP32 voltage samples over HTTP, computes harmonic predictions, saves plots, and logs predictions to Ethereum **mainnet**.

## Folder Structure

```text
code/witching-hour/looking-glass-inputs/
  main.py
  generate_wallet.py
  create_wallet.py
  requirements.txt
  .env.example
  .env                       # created locally
  looking_glass_inputs/
    example_numbers.txt
  plots/
  esp32/
    esp32_sender.ino
```

## 1. Python Environment (fixes PEP 668 issue)

```bash
cd /home/fletchervaughn/code/witching-hour/looking-glass-inputs
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## 2. Ethereum Wallet

A wallet has already been generated and written to `.env`.

The included wallet-generation scripts create a standard Ethereum wallet. The wallet itself is not testnet-only; the network you use depends on `ETH_RPC_URL` and `CHAIN_ID`.

Mainnet transaction logging is disabled unless you explicitly set `ENABLE_MAINNET_TRANSACTIONS=1`.

To generate a fresh wallet and write it to `.env`:

```bash
python3 generate_wallet.py
```

Or print a wallet without editing `.env`:

```bash
python3 create_wallet.py
```

## 3. Configure RPC

Edit `.env` and set your Ethereum mainnet RPC:

```env
ETH_RPC_URL=https://mainnet.infura.io/v3/YOUR_INFURA_KEY
CHAIN_ID=1
ENABLE_MAINNET_TRANSACTIONS=0
```

If you use another mainnet provider, replace `ETH_RPC_URL` accordingly. Keep `CHAIN_ID=1` for Ethereum mainnet.

When you are ready to send real mainnet transactions, change:

```env
ENABLE_MAINNET_TRANSACTIONS=1
```

## 4. Fund Wallet

1. Import `ETH_PRIVATE_KEY` into MetaMask or another Ethereum wallet.
2. Switch to Ethereum Mainnet.
3. Fund the wallet with a small amount of ETH for gas.
4. Treat this as a real wallet. Back up the private key offline before sending funds.
5. Do not enable `ENABLE_MAINNET_TRANSACTIONS=1` until the wallet and RPC are verified.

## 5. Run Service

```bash
python3 main.py
```

What runs:
- File watcher on `looking_glass_inputs/*.txt`
- Flask server on `http://0.0.0.0:5000`
- Endpoint: `POST /data` with JSON `{ "voltage": 1.23 }`

## 6. ESP32 Input

Wire sensor:
- Sensor output -> ESP32 ADC pin (`GPIO34` / `VP`)
- GND -> GND
- VCC -> 3.3V

Flash `esp32/esp32_sender.ino`, set:
- `YOUR_WIFI`
- `YOUR_PASSWORD`
- `server_url` to your PC IP, e.g. `http://192.168.1.25:5000/data`

## Input File Format

`looking_glass_inputs/*.txt`

- Line 1: comma-separated radionuc numbers
- Line 2: comma-separated scalar keys

Example:

```text
12,45,87,132,199,233,377,610
3,5,8,13,21,34
```
