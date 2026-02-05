#!/usr/bin/env python3
import json
import urllib.parse
import urllib.request
from http.server import BaseHTTPRequestHandler, HTTPServer
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
DEVICES_PATH = BASE_DIR / "devices.json"
UI_PATH = BASE_DIR / "ui.html"

try:
  from bleak import BleakScanner  # type: ignore
except Exception:
  BleakScanner = None


def load_devices():
  data = json.loads(DEVICES_PATH.read_text())
  return {device["id"]: device for device in data.get("devices", [])}


def proxy_request(device, path, params=None):
  if params is None:
    params = {}
  query = urllib.parse.urlencode(params)
  url = f"http://{device['ip']}{path}"
  if query:
    url = f"{url}?{query}"
  req = urllib.request.Request(url, method="POST")
  with urllib.request.urlopen(req, timeout=3) as resp:
    return resp.read().decode("utf-8")


class HubHandler(BaseHTTPRequestHandler):
  def _send(self, code, payload):
    body = payload.encode("utf-8")
    self.send_response(code)
    self.send_header("Content-Type", "application/json")
    self.send_header("Content-Length", str(len(body)))
    self.end_headers()
    self.wfile.write(body)

  def do_GET(self):
    if self.path == "/" and UI_PATH.exists():
      html = UI_PATH.read_text().encode("utf-8")
      self.send_response(200)
      self.send_header("Content-Type", "text/html")
      self.send_header("Content-Length", str(len(html)))
      self.end_headers()
      self.wfile.write(html)
      return

    if self.path.startswith("/devices"):
      devices = load_devices()
      payload = {
        "devices": list(devices.values())
      }
      self._send(200, json.dumps(payload))
      return

    if self.path.startswith("/ble/scan"):
      if BleakScanner is None:
        self._send(500, json.dumps({ "error": "bleak_not_installed" }))
        return
      devices = []
      try:
        found = BleakScanner.discover(timeout=5.0)
        for entry in found:
          devices.append({
            "name": entry.name,
            "address": entry.address,
            "rssi": entry.rssi
          })
        self._send(200, json.dumps({ "devices": devices }))
      except Exception as exc:
        self._send(500, json.dumps({ "error": "ble_scan_failed", "detail": str(exc) }))
      return

    self._send(404, json.dumps({"error": "not_found"}))

  def do_POST(self):
    parsed = urllib.parse.urlparse(self.path)
    params = dict(urllib.parse.parse_qsl(parsed.query))
    devices = load_devices()
    device_id = params.pop("device", None)

    if not device_id or device_id not in devices:
      self._send(400, json.dumps({"error": "invalid_device"}))
      return

    device = devices[device_id]
    try:
      if parsed.path == "/light":
        response = proxy_request(device, "/light", params)
      elif parsed.path == "/scene":
        response = proxy_request(device, "/scene", params)
      elif parsed.path == "/audio":
        response = proxy_request(device, "/audio", params)
      else:
        self._send(404, json.dumps({"error": "not_found"}))
        return
      self._send(200, response)
    except Exception as exc:
      self._send(500, json.dumps({"error": "device_unreachable", "detail": str(exc)}))


if __name__ == "__main__":
  server = HTTPServer(("0.0.0.0", 8088), HubHandler)
  print("Witching Hour Pi Hub listening on :8088")
  server.serve_forever()
