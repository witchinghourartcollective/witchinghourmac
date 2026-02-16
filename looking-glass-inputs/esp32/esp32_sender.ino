#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = "YOUR_WIFI";
const char* password = "YOUR_PASSWORD";
const char* server_url = "http://YOUR_PC_IP:5000/data";

const int analogPin = 34;  // ADC input pin (VP)

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nConnected to Wi-Fi");
}

void loop() {
  int analogValue = analogRead(analogPin);
  float voltage = analogValue * (3.3f / 4095.0f);

  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(server_url);
    http.addHeader("Content-Type", "application/json");

    String payload = "{\"voltage\":" + String(voltage, 6) + "}";
    int httpResponseCode = http.POST(payload);

    Serial.print("Voltage: ");
    Serial.print(voltage, 6);
    Serial.print(" V, HTTP: ");
    Serial.println(httpResponseCode);

    http.end();
  }

  delay(100);
}
