# ESP32 + Pi Hub

Field notes and commands for the ESP32-2432S024N Witching Hour control stack (Wi-Fi, BLE, USB, addressable LEDs, I2S audio, and Pi hub).

## ESP32 Flash + Monitor

```bash
cd /home/fletchervaughn/code/witching-hour/iot/esp32-2432s024n
pio run -t upload
pio device monitor -b 115200
```

You should see an IP line on serial output:

```text
IP: 192.168.x.x
```

## Wi-Fi HTTP Control (ESP Direct)

Replace `ESP_IP` with the IP from serial.

```bash
curl -X POST "http://ESP_IP/light?on=1&brightness=140&r=80&g=30&b=10"
curl -X POST "http://ESP_IP/scene?name=gallery"
curl -X POST "http://ESP_IP/audio?title=Witching%20Hour%20Session%2001"
```

### Scene -> Animation Map

- `gallery` -> `swirl`
- `vault` -> `sparkle`
- `studio` -> `pulse`
- anything else -> `steady`

## Pi Hub Control Panel

Edit device list:

`/home/fletchervaughn/code/witching-hour/iot/pi-hub/devices.json`

Run hub:

```bash
cd /home/fletchervaughn/code/witching-hour/iot/pi-hub
/home/fletchervaughn/code/witching-hour/iot/esp32-2432s024n/.venv/bin/python server.py
```

If port `8088` is already in use:

```bash
fuser -n tcp 8088
pkill -f 'iot/pi-hub/server.py'
```

Open UI:

```text
http://PI_IP:8088/
```

## BLE Scan (Pi Hub)

Install bleak in the same Python environment used to run `server.py`:

```bash
pip install bleak
```

Scan:

```bash
curl http://PI_IP:8088/ble/scan
```

## BLE Commands

```text
LIGHT 1 120 120 40 10
SCENE gallery
AUDIO Witching Hour Session 01
ANIM swirl
```

## USB Serial Commands

```text
LIGHT 1 120 120 40 10
SCENE gallery
AUDIO Witching Hour Session 01
ANIM pulse
```

## Audio Stream

ESP32 endpoint accepts raw 16-bit mono PCM at 22.05kHz:

```text
/audio-stream
```

## Why The Screen Is Black

The display driver may not match your panel. Toggle in:

`/home/fletchervaughn/code/witching-hour/iot/esp32-2432s024n/include/config.h`

Switch between:

- `WHM_TFT_DRIVER_ILI9341`
- `WHM_TFT_DRIVER_ST7789`

until the screen lights up.

Current firmware draws a placeholder sigil at boot. For the final WHM sigil, export a 240x240 monochrome PNG and embed it as a bitmap.

## Current BLE Labeling Notes

Pi hub supports address and name-based labels:

- Address labels: `iot/pi-hub/ble_labels.json`
- Name labels: `iot/pi-hub/ble_name_labels.json`

Current address labels:

- `BE:67:00:86:EB:15` -> `bed`
- `2F:BF:7F:2F:19:92` -> `circle_light`
- `3A:82:DB:E2:1E:A9` -> `circle_light`
- `1A:52:4B:20:B9:F1` -> `string_lights`
- `52:0B:AB:EE:8F:14` -> `speakers`
- `56:DB:06:4F:76:4E` -> `led_strip`
- `01:14:7D:DD:0E:CA` -> `mouse`
- `30:E7:6E:64:E3:77` -> `keyboard`

Current projector name mappings:

- `HY300PRO` -> `projector`
- `Q352020` -> `projector`

## Hardware Assumption

Hardware reference from notes: `"sparkle iot xh 32s wifi bt n4xx"`.

Current assumption in this stack is `ESP32-2432S024N`.
