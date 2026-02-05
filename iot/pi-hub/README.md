# Witching Hour Pi Hub

A lightweight HTTP hub to control ESP32 room nodes over the local network.

## Setup
```bash
cd /home/fletchervaughn/code/witching-hour/iot/pi-hub
python3 server.py
```

Edit `devices.json` to match ESP32 IPs.
If you want BLE scanning, install bleak:
```bash
pip install bleak
```

## API
- `GET /` (control panel)
- `GET /devices`
- `POST /light?device=whm-foyer&on=1&brightness=120&r=120&g=40&b=10`
- `POST /scene?device=whm-foyer&name=gallery`
- `POST /audio?device=whm-foyer&title=Witching%20Hour%20Session%2001`
- `GET /ble/scan`

## Notes
- This is a simple proxy hub; add auth and TLS before exposing beyond local network.
