import os
from pathlib import Path

from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import ec

# Rotation offsets
_R = [
    [0, 36, 3, 41, 18],
    [1, 44, 10, 45, 2],
    [62, 6, 43, 15, 61],
    [28, 55, 25, 21, 56],
    [27, 20, 39, 8, 14],
]

# Round constants
_RC = [
    0x0000000000000001,
    0x0000000000008082,
    0x800000000000808A,
    0x8000000080008000,
    0x000000000000808B,
    0x0000000080000001,
    0x8000000080008081,
    0x8000000000008009,
    0x000000000000008A,
    0x0000000000000088,
    0x0000000080008009,
    0x000000008000000A,
    0x000000008000808B,
    0x800000000000008B,
    0x8000000000008089,
    0x8000000000008003,
    0x8000000000008002,
    0x8000000000000080,
    0x000000000000800A,
    0x800000008000000A,
    0x8000000080008081,
    0x8000000000008080,
    0x0000000080000001,
    0x8000000080008008,
]


def _rol64(x: int, shift: int) -> int:
    shift %= 64
    return ((x << shift) | (x >> (64 - shift))) & 0xFFFFFFFFFFFFFFFF


def _keccak_f1600(state):
    for rc in _RC:
        # Theta
        c = [
            state[x] ^ state[x + 5] ^ state[x + 10] ^ state[x + 15] ^ state[x + 20]
            for x in range(5)
        ]
        d = [c[(x - 1) % 5] ^ _rol64(c[(x + 1) % 5], 1) for x in range(5)]
        for y in range(5):
            for x in range(5):
                state[x + 5 * y] ^= d[x]

        # Rho + Pi
        b = [0] * 25
        for y in range(5):
            for x in range(5):
                b[y + 5 * ((2 * x + 3 * y) % 5)] = _rol64(state[x + 5 * y], _R[x][y])

        # Chi
        for y in range(5):
            for x in range(5):
                state[x + 5 * y] = b[x + 5 * y] ^ ((~b[((x + 1) % 5) + 5 * y]) & b[((x + 2) % 5) + 5 * y])

        # Iota
        state[0] ^= rc


def keccak256(data: bytes) -> bytes:
    # Keccak-256 (Ethereum): rate=1088 bits, capacity=512 bits
    rate_bytes = 136
    state = [0] * 25

    offset = 0
    while offset + rate_bytes <= len(data):
        block = data[offset : offset + rate_bytes]
        for i in range(rate_bytes // 8):
            lane = int.from_bytes(block[i * 8 : (i + 1) * 8], "little")
            state[i] ^= lane
        _keccak_f1600(state)
        offset += rate_bytes

    rem = data[offset:]
    padded = bytearray(rem)
    # Keccak padding (not SHA3): 0x01 ... 0x80
    padded.append(0x01)
    while len(padded) < rate_bytes:
        padded.append(0x00)
    padded[-1] ^= 0x80

    for i in range(rate_bytes // 8):
        lane = int.from_bytes(padded[i * 8 : (i + 1) * 8], "little")
        state[i] ^= lane
    _keccak_f1600(state)

    out = bytearray()
    while len(out) < 32:
        for i in range(rate_bytes // 8):
            out.extend(state[i].to_bytes(8, "little"))
            if len(out) >= 32:
                break
        if len(out) < 32:
            _keccak_f1600(state)

    return bytes(out[:32])


def checksum_address(addr_hex_no_prefix: str) -> str:
    lower_addr = addr_hex_no_prefix.lower()
    hashed = keccak256(lower_addr.encode("ascii")).hex()
    out = []
    for i, ch in enumerate(lower_addr):
        if ch.isdigit():
            out.append(ch)
        else:
            out.append(ch.upper() if int(hashed[i], 16) >= 8 else ch.lower())
    return "0x" + "".join(out)


def generate_wallet():
    key = ec.generate_private_key(ec.SECP256K1())

    private_int = key.private_numbers().private_value
    private_key_hex = f"0x{private_int:064x}"

    pubkey = key.public_key().public_bytes(
        encoding=serialization.Encoding.X962,
        format=serialization.PublicFormat.UncompressedPoint,
    )
    # pubkey[0] is 0x04 prefix. Ethereum hashes x||y (64 bytes)
    addr = keccak256(pubkey[1:])[-20:].hex()
    address = checksum_address(addr)

    return private_key_hex, address


def main():
    # quick self-check against known Keccak-256("") vector
    expected = "c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470"
    got = keccak256(b"").hex()
    if got != expected:
        raise RuntimeError(f"keccak self-check failed: {got}")

    private_key_hex, address = generate_wallet()

    print("Generated testnet wallet")
    print("address:", address)
    print("private_key:", private_key_hex)

    base = Path(__file__).resolve().parent
    env_path = base / ".env"
    lines = []
    if env_path.exists():
        lines = env_path.read_text(encoding="utf-8").splitlines()

    kv = {
        "ETH_RPC_URL": "https://sepolia.infura.io/v3/YOUR_INFURA_KEY",
        "ETH_PRIVATE_KEY": private_key_hex,
        "CHAIN_ID": "11155111",
        "TO_ADDRESS": address,
        "GAS_PRICE_GWEI": "5",
        "FLASK_HOST": "0.0.0.0",
        "FLASK_PORT": "5000",
        "WATCH_DIR": "./looking_glass_inputs",
        "PLOT_DIR": "./plots",
        "BATCH_SIZE": "50",
    }

    existing = {}
    for line in lines:
        if "=" in line and not line.strip().startswith("#"):
            k, v = line.split("=", 1)
            existing[k] = v

    existing.update(kv)
    ordered_keys = [
        "ETH_RPC_URL",
        "ETH_PRIVATE_KEY",
        "CHAIN_ID",
        "TO_ADDRESS",
        "GAS_PRICE_GWEI",
        "FLASK_HOST",
        "FLASK_PORT",
        "WATCH_DIR",
        "PLOT_DIR",
        "BATCH_SIZE",
    ]

    content = "\n".join(f"{k}={existing[k]}" for k in ordered_keys) + "\n"
    env_path.write_text(content, encoding="utf-8")
    print("Wrote:", env_path)


if __name__ == "__main__":
    main()
