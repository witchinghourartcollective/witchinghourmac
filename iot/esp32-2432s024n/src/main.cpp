#include <Arduino.h>
#include <driver/i2s.h>
#include <WiFi.h>
#include <WebServer.h>
#include <FastLED.h>
#include <TFT_eSPI.h>
#include <NimBLEDevice.h>
#include "config.h"

WebServer server(80);
NimBLECharacteristic *statusChar = nullptr;
CRGB leds[WHM_LED_COUNT];
TFT_eSPI tft = TFT_eSPI();

struct WhmState {
  bool lightsOn = false;
  uint8_t r = 0;
  uint8_t g = 0;
  uint8_t b = 0;
  uint8_t brightness = 120;
  String scene = "foyer";
  String nowPlaying = "";
  String animation = "steady";
} state;

uint32_t lastFrame = 0;
uint16_t hueBase = 0;

void drawSigilPlaceholder() {
  tft.fillScreen(TFT_BLACK);
  tft.setTextColor(TFT_YELLOW, TFT_BLACK);
  tft.setTextDatum(MC_DATUM);
  tft.setFreeFont(&FreeSerifBold24pt7b);
  tft.drawString("WITCHING", tft.width() / 2, 56);
  tft.drawString("HOUR", tft.width() / 2, 92);

  int cx = tft.width() / 2;
  int cy = tft.height() / 2 + 30;
  int r = 72;
  tft.drawCircle(cx, cy, r, TFT_DARKGREY);
  tft.drawCircle(cx, cy, r - 6, TFT_DARKGREY);
  tft.drawLine(cx - r, cy, cx + r, cy, TFT_DARKGREY);
  tft.drawLine(cx, cy - r, cx, cy + r, TFT_DARKGREY);
  tft.fillCircle(cx, cy, 4, TFT_YELLOW);

  tft.setTextColor(TFT_DARKGREY, TFT_BLACK);
  tft.setFreeFont(&FreeSerif9pt7b);
  tft.drawString("SIGIL PLACEHOLDER", tft.width() / 2, tft.height() - 24);
}

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

void renderAnimation() {
  if (!state.lightsOn) {
    applyLight();
    return;
  }

  if (state.animation == "pulse") {
    uint8_t wave = sin8(hueBase);
    FastLED.setBrightness(map(wave, 0, 255, 30, state.brightness));
    fill_solid(leds, WHM_LED_COUNT, CRGB(state.r, state.g, state.b));
  } else if (state.animation == "swirl") {
    for (int i = 0; i < WHM_LED_COUNT; i++) {
      uint8_t hue = (hueBase + (i * 12)) & 0xFF;
      leds[i] = CHSV(hue, 200, state.brightness);
    }
  } else if (state.animation == "sparkle") {
    fadeToBlackBy(leds, WHM_LED_COUNT, 30);
    int pos = random(0, WHM_LED_COUNT);
    leds[pos] = CRGB(state.r, state.g, state.b);
  } else {
    fill_solid(leds, WHM_LED_COUNT, CRGB(state.r, state.g, state.b));
  }

  FastLED.show();
  hueBase += 3;
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

void playSynthPad(uint16_t durationMs, float freqA, float freqB) {
  const int sampleRate = 22050;
  const int samples = (sampleRate * durationMs) / 1000;
  const float stepA = 2.0f * PI * freqA / sampleRate;
  const float stepB = 2.0f * PI * freqB / sampleRate;
  const int chunk = 256;
  int16_t buffer[chunk];
  int remaining = samples;

  while (remaining > 0) {
    int count = remaining > chunk ? chunk : remaining;
    for (int i = 0; i < count; i++) {
      int index = samples - remaining + i;
      float env = 1.0f;
      if (index < sampleRate * 0.1f) {
        env = index / (sampleRate * 0.1f);
      } else if (index > samples - sampleRate * 0.2f) {
        env = (samples - index) / (sampleRate * 0.2f);
      }
      float sample = (sinf(stepA * index) + 0.7f * sinf(stepB * index)) * 0.5f;
      int16_t value = (int16_t)(sample * 22000 * env);
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
  json += "\"nowPlaying\":\"" + state.nowPlaying + "\",";
  json += "\"animation\":\"" + state.animation + "\"";
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
  if (state.scene == "gallery") {
    state.animation = "swirl";
  } else if (state.scene == "vault") {
    state.animation = "sparkle";
  } else if (state.scene == "studio") {
    state.animation = "pulse";
  } else {
    state.animation = "steady";
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
  playSynthPad(1200, 196.0f, 246.9f);
  if (statusChar) {
    statusChar->setValue(stateJson().c_str());
    statusChar->notify();
  }
  server.send(200, "application/json", stateJson());
}

void handleAudioStream() {
  int length = server.hasHeader("Content-Length") ? server.header("Content-Length").toInt() : 0;
  if (length <= 0) {
    server.send(400, "application/json", "{\"error\":\"missing_audio\"}");
    return;
  }

  WiFiClient client = server.client();
  const int chunkSize = 512;
  uint8_t buffer[chunkSize];
  int remaining = length;
  while (remaining > 0) {
    int toRead = remaining > chunkSize ? chunkSize : remaining;
    int readBytes = client.readBytes(reinterpret_cast<char *>(buffer), toRead);
    if (readBytes <= 0) {
      break;
    }
    size_t bytesWritten = 0;
    i2s_write(I2S_NUM_0, buffer, readBytes, &bytesWritten, portMAX_DELAY);
    remaining -= readBytes;
  }

  server.send(200, "application/json", "{\"status\":\"played\"}");
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
      if (state.scene == "gallery") {
        state.animation = "swirl";
      } else if (state.scene == "vault") {
        state.animation = "sparkle";
      } else if (state.scene == "studio") {
        state.animation = "pulse";
      } else {
        state.animation = "steady";
      }
    } else if (payload.startsWith("AUDIO")) {
      // Format: AUDIO title
      state.nowPlaying = payload.substring(6);
      playSynthPad(1200, 220.0f, 277.2f);
    } else if (payload.startsWith("ANIM")) {
      // Format: ANIM name
      state.animation = payload.substring(5);
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
  server.on("/audio-stream", HTTP_POST, handleAudioStream);
  server.begin();
}

void setup() {
  Serial.begin(115200);
  delay(200);

  FastLED.addLeds<NEOPIXEL, WHM_LED_PIN>(leds, WHM_LED_COUNT);
  FastLED.setBrightness(state.brightness);
  applyLight();

  pinMode(WHM_TFT_BL, OUTPUT);
  digitalWrite(WHM_TFT_BL, HIGH);
  tft.init();
  tft.setRotation(1);
  drawSigilPlaceholder();

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
  uint32_t now = millis();
  if (now - lastFrame > 40) {
    lastFrame = now;
    renderAnimation();
  }

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
      if (state.scene == "gallery") {
        state.animation = "swirl";
      } else if (state.scene == "vault") {
        state.animation = "sparkle";
      } else if (state.scene == "studio") {
        state.animation = "pulse";
      } else {
        state.animation = "steady";
      }
    } else if (line.startsWith("AUDIO")) {
      state.nowPlaying = line.substring(6);
      playSynthPad(1200, 174.6f, 233.1f);
    } else if (line.startsWith("ANIM")) {
      state.animation = line.substring(5);
    }
  }
}
