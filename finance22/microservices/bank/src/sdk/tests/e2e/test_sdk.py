from bank_client import BankClient


def test_load_history():
    bank = BankClient(user="Warren")
    print(bank.load_history())
    assert False