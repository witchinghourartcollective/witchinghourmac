export default function Esp32Page() {
  return (
    <main style={{ padding: 48, maxWidth: 900, margin: "0 auto" }}>
      <h1>ESP32 + Pi Hub</h1>
      <p>
        Field notes and commands for the ESP32-2432S024N Witching Hour
        control stack (Wi-Fi, BLE, USB, addressable LEDs, I2S audio, and Pi hub).
      </p>

      <hr />

      <h2>ESP32 Flash + Monitor</h2>
      <pre>
        <code>{`cd /home/fletchervaughn/code/witching-hour/iot/esp32-2432s024n
pio run -t upload
pio device monitor -b 115200`}</code>
      </pre>
      <p>You should see:</p>
      <pre>
        <code>{`IP: 192.168.x.x`}</code>
      </pre>

      <h2>Wi-Fi HTTP Control</h2>
      <p>Replace `ESP_IP` with the IP from serial.</p>
      <pre>
        <code>{`curl -X POST "http://ESP_IP/light?on=1&brightness=140&r=80&g=30&b=10"
curl -X POST "http://ESP_IP/scene?name=gallery"
curl -X POST "http://ESP_IP/audio?title=Witching%20Hour%20Session%2001"`}</code>
      </pre>
      <p>Animations map to scenes:</p>
      <pre>
        <code>{`gallery -> swirl
vault -> sparkle
studio -> pulse
anything else -> steady`}</code>
      </pre>

      <h2>Pi Hub Control Panel</h2>
      <p>Edit the device list:</p>
      <pre>
        <code>{`/home/fletchervaughn/code/witching-hour/iot/pi-hub/devices.json`}</code>
      </pre>
      <p>Run the hub:</p>
      <pre>
        <code>{`cd /home/fletchervaughn/code/witching-hour/iot/pi-hub
. .venv/bin/activate
python server.py`}</code>
      </pre>
      <p>Open:</p>
      <pre>
        <code>{`http://PI_IP:8088/`}</code>
      </pre>
      <p>BLE scan (Pi only):</p>
      <pre>
        <code>{`pip install bleak
curl http://PI_IP:8088/ble/scan`}</code>
      </pre>

      <h2>BLE Commands</h2>
      <pre>
        <code>{`LIGHT 1 120 120 40 10
SCENE gallery
AUDIO Witching Hour Session 01
ANIM swirl`}</code>
      </pre>

      <h2>USB Serial Commands</h2>
      <pre>
        <code>{`LIGHT 1 120 120 40 10
SCENE gallery
AUDIO Witching Hour Session 01
ANIM pulse`}</code>
      </pre>

      <h2>Audio Stream</h2>
      <p>
        The ESP32 accepts raw 16-bit mono PCM at 22.05kHz on `/audio-stream`.
      </p>

      <h2>Why The Screen Is Black</h2>
      <p>
        The display is not initialized yet. We need the driver chip used by your
        board (often ILI9341 or ST7789). We added a driver toggle in
        `include/config.h`. Flip between `WHM_TFT_DRIVER_ILI9341` and
        `WHM_TFT_DRIVER_ST7789` until the screen lights up.
      </p>
      <p>
        We draw a simple sigil placeholder right now. If you want the real WHM
        sigil on the ESP32 screen, export a 240x240 monochrome PNG and I will
        embed it as a bitmap.
      </p>

      <h2>Notes</h2>
      <p>
        Hardware reference from you: "sparkle iot xh 32s wifi bt n4xx".
        We are assuming the ESP32-2432S024N board for now.
      </p>
    </main>
  );
}
