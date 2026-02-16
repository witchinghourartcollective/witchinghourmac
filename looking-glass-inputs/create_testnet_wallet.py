from eth_account import Account


def main():
    acct = Account.create()
    print("address:", acct.address)
    print("private_key:", acct.key.hex())
    print("Store this offline. Never use this key on mainnet.")


if __name__ == "__main__":
    main()
