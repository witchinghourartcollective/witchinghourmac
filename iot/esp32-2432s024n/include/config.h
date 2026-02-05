#pragma once

// Update these for your network.
#define WHM_WIFI_SSID "YOUR_WIFI_SSID"
#define WHM_WIFI_PASS "YOUR_WIFI_PASS"

// Addressable LEDs (adjust to your hardware).
#define WHM_LED_PIN 2
#define WHM_LED_COUNT 30

// TFT display driver selection (set one to 1).
#define WHM_TFT_DRIVER_ILI9341 1
#define WHM_TFT_DRIVER_ST7789 0

// TFT pins (common ESP32-2432S024N defaults; adjust if needed).
#define WHM_TFT_MOSI 13
#define WHM_TFT_MISO 12
#define WHM_TFT_SCLK 14
#define WHM_TFT_CS 15
#define WHM_TFT_DC 2
#define WHM_TFT_RST 4
#define WHM_TFT_BL 21

// I2S audio (adjust to your hardware).
// Common defaults: BCLK=26, LRCK=25, DOUT=22
#define WHM_I2S_BCLK 26
#define WHM_I2S_LRCK 25
#define WHM_I2S_DOUT 22

// BLE service + characteristic UUIDs (keep stable for the app).
#define WHM_BLE_SERVICE_UUID        "9a1f44b0-2ed1-4d29-9c4c-4f0b7bdf0a01"
#define WHM_BLE_COMMAND_CHAR_UUID   "9a1f44b0-2ed1-4d29-9c4c-4f0b7bdf0a02"
#define WHM_BLE_STATUS_CHAR_UUID    "9a1f44b0-2ed1-4d29-9c4c-4f0b7bdf0a03"
