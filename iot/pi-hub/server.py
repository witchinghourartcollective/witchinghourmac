#!/usr/bin/env python3
import asyncio
import json
import urllib.parse
import urllib.request
from http.server import BaseHTTPRequestHandler, HTTPServer
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
DEVICES_PATH = BASE_DIR / "devices.json"
UI_PATH = BASE_DIR / "ui.html"
BLE_LABELS_PATH = BASE_DIR / "ble_labels.json"
BLE_NAME_LABELS_PATH = BASE_DIR / "ble_name_labels.json"

try:
  from bleak import BleakScanner  # type: ignore
  from bleak import BleakClient  # type: ignore
except Exception:
  BleakScanner = None
  BleakClient = None


def load_devices():
  data = json.loads(DEVICES_PATH.read_text())
  return {device["id"]: device for device in data.get("devices", [])}


def load_ble_labels():
  if not BLE_LABELS_PATH.exists():
    return {}
  data = json.loads(BLE_LABELS_PATH.read_text())
  labels = data.get("labels", {})
  return {address.upper(): label for address, label in labels.items()}


def load_ble_name_labels():
  if not BLE_NAME_LABELS_PATH.exists():
    return {}
  data = json.loads(BLE_NAME_LABELS_PATH.read_text())
  labels = data.get("labels", {})
  return {name.upper(): label for name, label in labels.items()}


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
      labels = load_ble_labels()
      name_labels = load_ble_name_labels()
      try:
        found = asyncio.run(BleakScanner.discover(timeout=5.0, return_adv=True))
        for _, (entry, adv_data) in found.items():
          address = entry.address.upper()
          device_name = entry.name or ""
          label = labels.get(address)
          if label is None and device_name:
            label = name_labels.get(device_name.upper())
          devices.append({
            "name": entry.name,
            "address": address,
            "rssi": adv_data.rssi,
            "label": label
          })
        self._send(200, json.dumps({ "devices": devices }))
      except Exception as exc:
        self._send(500, json.dumps({ "error": "ble_scan_failed", "detail": str(exc) }))
      return

    self._send(404, json.dumps({"error": "not_found"}))

  def do_POST(self):
    parsed = urllib.parse.urlparse(self.path)
    params = dict(urllib.parse.parse_qsl(parsed.query))

    if parsed.path == "/ble/test":
      if BleakClient is None:
        self._send(500, json.dumps({ "error": "bleak_not_installed" }))
        return

      address = params.get("address", "").strip()
      if not address:
        self._send(400, json.dumps({ "error": "missing_address" }))
        return

      async def _test_connection():
        client = BleakClient(address, timeout=6.0)
        try:
          await client.connect()
          return client.is_connected
        finally:
          if client.is_connected:
            await client.disconnect()

      try:
        connected = asyncio.run(_test_connection())
        self._send(200, json.dumps({
          "ok": bool(connected),
          "address": address
        }))
      except Exception as exc:
        self._send(500, json.dumps({
          "error": "ble_test_failed",
          "address": address,
          "detail": str(exc)
        }))
      return

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
