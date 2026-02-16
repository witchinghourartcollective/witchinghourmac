# Looking Glass Inputs (Testnet)

This subproject watches `.txt` files, accepts ESP32 voltage samples over HTTP, computes harmonic predictions, saves plots, and logs predictions to Ethereum **testnet**.

## Folder Structure

```text
code/witching-hour/looking-glass-inputs/
  main.py
  generate_testnet_wallet.py
  create_testnet_wallet.py
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

## 2. Testnet Wallet

A wallet has already been generated and written to `.env`.

To generate a fresh one:

```bash
python3 generate_testnet_wallet.py
```

Or print one (without editing `.env`):

```bash
python3 create_testnet_wallet.py
```

## 3. Configure RPC

Edit `.env` and set your Infura key:

```env
ETH_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
```

Note: Sepolia is the default testnet. If you use Goerli, replace `ETH_RPC_URL` and `CHAIN_ID` accordingly.

## 4. Fund Wallet

1. Import `ETH_PRIVATE_KEY` into MetaMask (testnet account only).
2. Switch to Sepolia.
3. Get faucet ETH for gas.

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
