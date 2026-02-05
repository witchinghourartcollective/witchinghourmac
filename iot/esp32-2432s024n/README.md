# ESP32-2432S024N Controller

PlatformIO project for the Sunton ESP32-2432S024N board.

## Features
- Wi-Fi HTTP API for lighting, scenes, and audio metadata.
- BLE GATT commands for low-latency control.
- Serial commands over USB for direct control.
- Addressable LED output via FastLED.
- I2S audio output (synth pad + optional audio stream).

## Setup
1) Open in VS Code + PlatformIO.
2) Update Wi-Fi credentials in `include/config.h`.
3) Update LED and I2S pins in `include/config.h` to match your wiring.
   - Default LED pin moved to `27` to avoid conflict with TFT `DC` on pin `2`.
4) If the display is black, switch the driver in `include/config.h`:
   - `WHM_TFT_DRIVER_ILI9341` or `WHM_TFT_DRIVER_ST7789`
5) Build + upload.

## HTTP API
- `GET /status`
- `POST /light?on=1&brightness=120&r=120&g=40&b=10`
- `POST /scene?name=gallery`
- `POST /audio?title=Witching%20Hour%20Session%2001`
- `POST /audio-stream` (raw 16-bit mono PCM, 22.05kHz)

## BLE Commands
Write to characteristic `WHM_BLE_COMMAND_CHAR_UUID`:
- `LIGHT 1 120 120 40 10`
- `SCENE gallery`
- `AUDIO Witching Hour Session 01`
- `ANIM pulse`

Status is notified on `WHM_BLE_STATUS_CHAR_UUID` as JSON.

## Serial Commands
- `LIGHT 1 120 120 40 10`
- `SCENE gallery`
- `AUDIO Witching Hour Session 01`
- `ANIM swirl`

## Display
We draw a simple sigil placeholder on boot. If you want the real WHM sigil,
export a 240x240 monochrome PNG and I can embed it as a bitmap.
