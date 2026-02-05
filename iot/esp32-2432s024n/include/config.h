#pragma once

// Update these for your network.
#define WHM_WIFI_SSID "YOUR_WIFI_SSID"
#define WHM_WIFI_PASS "YOUR_WIFI_PASS"

// Addressable LEDs (adjust to your hardware).
#define WHM_LED_PIN 2
#define WHM_LED_COUNT 30

// I2S audio (adjust to your hardware).
// Common defaults: BCLK=26, LRCK=25, DOUT=22
#define WHM_I2S_BCLK 26
#define WHM_I2S_LRCK 25
#define WHM_I2S_DOUT 22

// BLE service + characteristic UUIDs (keep stable for the app).
#define WHM_BLE_SERVICE_UUID        "9a1f44b0-2ed1-4d29-9c4c-4f0b7bdf0a01"
#define WHM_BLE_COMMAND_CHAR_UUID   "9a1f44b0-2ed1-4d29-9c4c-4f0b7bdf0a02"
#define WHM_BLE_STATUS_CHAR_UUID    "9a1f44b0-2ed1-4d29-9c4c-4f0b7bdf0a03"
