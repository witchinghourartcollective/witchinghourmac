#include <Arduino.h>
#include <driver/i2s.h>
#include <WiFi.h>
#include <WebServer.h>
#include <FastLED.h>
#include <NimBLEDevice.h>
#include "config.h"

WebServer server(80);
NimBLECharacteristic *statusChar = nullptr;
CRGB leds[WHM_LED_COUNT];

struct WhmState {
  bool lightsOn = false;
  uint8_t r = 0;
  uint8_t g = 0;
  uint8_t b = 0;
  uint8_t brightness = 120;
  String scene = "foyer";
  String nowPlaying = "";
} state;

void applyLight() {
  uint8_t level = state.lightsOn ? state.brightness : 0;
  CRGB color = CRGB(state.r, state.g, state.b);
  if (!state.lightsOn) {
    color = CRGB::Black;
  }
  for (int i = 0; i < WHM_LED_COUNT; i++) {
    leds[i] = color;
  }
  FastLED.setBrightness(level);
  FastLED.show();
}

void playTone(uint16_t frequencyHz, uint16_t durationMs) {
  const int sampleRate = 22050;
  const int samples = (sampleRate * durationMs) / 1000;
  const float step = 2.0f * PI * frequencyHz / sampleRate;
  const int chunk = 256;
  int16_t buffer[chunk];
  int remaining = samples;

  while (remaining > 0) {
    int count = remaining > chunk ? chunk : remaining;
    for (int i = 0; i < count; i++) {
      float sample = sinf(step * (samples - remaining + i));
      int16_t value = (int16_t)(sample * 22000);
      buffer[i] = value;
    }
    size_t bytesWritten = 0;
    i2s_write(I2S_NUM_0, buffer, count * sizeof(int16_t), &bytesWritten, portMAX_DELAY);
    remaining -= count;
  }
}

String stateJson() {
  String json = "{";
  json += "\"lightsOn\":" + String(state.lightsOn ? "true" : "false") + ",";
  json += "\"brightness\":" + String(state.brightness) + ",";
  json += "\"rgb\":[" + String(state.r) + "," + String(state.g) + "," + String(state.b) + "],";
  json += "\"scene\":\"" + state.scene + "\",";
  json += "\"nowPlaying\":\"" + state.nowPlaying + "\"";
  json += "}";
  return json;
}

void handleStatus() {
  server.send(200, "application/json", stateJson());
}

void handleLight() {
  if (server.hasArg("on")) {
    state.lightsOn = server.arg("on") == "1";
  }
  if (server.hasArg("brightness")) {
    state.brightness = (uint8_t)server.arg("brightness").toInt();
  }
  if (server.hasArg("r")) state.r = (uint8_t)server.arg("r").toInt();
  if (server.hasArg("g")) state.g = (uint8_t)server.arg("g").toInt();
  if (server.hasArg("b")) state.b = (uint8_t)server.arg("b").toInt();

  applyLight();
  if (statusChar) {
    statusChar->setValue(stateJson().c_str());
    statusChar->notify();
  }
  server.send(200, "application/json", stateJson());
}

void handleScene() {
  if (server.hasArg("name")) {
    state.scene = server.arg("name");
  }
  if (statusChar) {
    statusChar->setValue(stateJson().c_str());
    statusChar->notify();
  }
  server.send(200, "application/json", stateJson());
}

void handleAudio() {
  if (server.hasArg("title")) {
    state.nowPlaying = server.arg("title");
  }
  playTone(440, 120);
  if (statusChar) {
    statusChar->setValue(stateJson().c_str());
    statusChar->notify();
  }
  server.send(200, "application/json", stateJson());
}

class CommandCallbacks : public NimBLECharacteristicCallbacks {
  void onWrite(NimBLECharacteristic *characteristic) override {
    std::string value = characteristic->getValue();
    String payload(value.c_str());
    payload.trim();

    if (payload.startsWith("LIGHT")) {
      // Format: LIGHT on brightness r g b
      int on = 0, brightness = 120, r = 0, g = 0, b = 0;
      sscanf(payload.c_str(), "LIGHT %d %d %d %d %d", &on, &brightness, &r, &g, &b);
      state.lightsOn = on == 1;
      state.brightness = (uint8_t)brightness;
      state.r = (uint8_t)r;
      state.g = (uint8_t)g;
      state.b = (uint8_t)b;
      applyLight();
    } else if (payload.startsWith("SCENE")) {
      // Format: SCENE name
      state.scene = payload.substring(6);
    } else if (payload.startsWith("AUDIO")) {
      // Format: AUDIO title
      state.nowPlaying = payload.substring(6);
      playTone(523, 120);
    }

    if (statusChar) {
      statusChar->setValue(stateJson().c_str());
      statusChar->notify();
    }
  }
};

void setupBle() {
  NimBLEDevice::init("WitchingHour-ESP32");
  NimBLEServer *server = NimBLEDevice::createServer();
  NimBLEService *service = server->createService(WHM_BLE_SERVICE_UUID);

  NimBLECharacteristic *commandChar = service->createCharacteristic(
    WHM_BLE_COMMAND_CHAR_UUID,
    NIMBLE_PROPERTY::WRITE
  );
  commandChar->setCallbacks(new CommandCallbacks());

  statusChar = service->createCharacteristic(
    WHM_BLE_STATUS_CHAR_UUID,
    NIMBLE_PROPERTY::NOTIFY | NIMBLE_PROPERTY::READ
  );
  statusChar->setValue(stateJson().c_str());

  service->start();
  NimBLEAdvertising *advertising = NimBLEDevice::getAdvertising();
  advertising->addServiceUUID(WHM_BLE_SERVICE_UUID);
  advertising->start();
}

void setupWiFi() {
  WiFi.mode(WIFI_STA);
  WiFi.begin(WHM_WIFI_SSID, WHM_WIFI_PASS);

  Serial.print("WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(350);
    Serial.print(".");
  }
  Serial.println();
  Serial.print("IP: ");
  Serial.println(WiFi.localIP());
}

void setupServer() {
  server.on("/status", HTTP_GET, handleStatus);
  server.on("/light", HTTP_POST, handleLight);
  server.on("/scene", HTTP_POST, handleScene);
  server.on("/audio", HTTP_POST, handleAudio);
  server.begin();
}

void setup() {
  Serial.begin(115200);
  delay(200);

  FastLED.addLeds<NEOPIXEL, WHM_LED_PIN>(leds, WHM_LED_COUNT);
  FastLED.setBrightness(state.brightness);
  applyLight();

  i2s_config_t i2sConfig = {};
  i2sConfig.mode = (i2s_mode_t)(I2S_MODE_MASTER | I2S_MODE_TX);
  i2sConfig.sample_rate = 22050;
  i2sConfig.bits_per_sample = I2S_BITS_PER_SAMPLE_16BIT;
  i2sConfig.channel_format = I2S_CHANNEL_FMT_ONLY_LEFT;
  i2sConfig.communication_format = I2S_COMM_FORMAT_I2S;
  i2sConfig.intr_alloc_flags = 0;
  i2sConfig.dma_buf_count = 6;
  i2sConfig.dma_buf_len = 256;
  i2sConfig.use_apll = false;
  i2sConfig.tx_desc_auto_clear = true;
  i2sConfig.fixed_mclk = 0;

  i2s_pin_config_t pinConfig = {};
  pinConfig.bck_io_num = WHM_I2S_BCLK;
  pinConfig.ws_io_num = WHM_I2S_LRCK;
  pinConfig.data_out_num = WHM_I2S_DOUT;
  pinConfig.data_in_num = I2S_PIN_NO_CHANGE;
  i2s_driver_install(I2S_NUM_0, &i2sConfig, 0, nullptr);
  i2s_set_pin(I2S_NUM_0, &pinConfig);
  i2s_zero_dma_buffer(I2S_NUM_0);

  setupWiFi();
  setupServer();
  setupBle();

  Serial.println("Witching Hour controller ready.");
}

void loop() {
  server.handleClient();

  if (Serial.available()) {
    String line = Serial.readStringUntil('\n');
    line.trim();
    if (line.startsWith("LIGHT")) {
      int on = 0, brightness = 120, r = 0, g = 0, b = 0;
      sscanf(line.c_str(), "LIGHT %d %d %d %d %d", &on, &brightness, &r, &g, &b);
      state.lightsOn = on == 1;
      state.brightness = (uint8_t)brightness;
      state.r = (uint8_t)r;
      state.g = (uint8_t)g;
      state.b = (uint8_t)b;
      applyLight();
    } else if (line.startsWith("SCENE")) {
      state.scene = line.substring(6);
    } else if (line.startsWith("AUDIO")) {
      state.nowPlaying = line.substring(6);
      playTone(659, 120);
    }
  }
}
