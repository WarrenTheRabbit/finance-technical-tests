import random
import pytz
import pickle
from faker import Faker
from pathlib import Path
import pprint

fake = Faker()

def generate_transaction(fake):
    created_utc = fake.date_time_between(start_date="-30d", end_date="now", tzinfo=pytz.UTC)
    aest_timezone = pytz.timezone('Australia/Sydney')
    created_aest = created_utc.astimezone(aest_timezone)

    parent_category_choices = {
        "Good Life": [
            "Apps, Games & Software", "Booze", "Events & Gigs", "Hobbies",
            "Holidays & Travel", "Lottery & Gambling", "Pubs & Bars", "Restaurants & Cafes",
            "Takeaway", "Tobacco & Vaping", "TV, Music & Streaming", "Adult"
        ],
        "Transport": [
            "Car Insurance, Rego & Maintenance", "Cycling", "Fuel", "Parking",
            "Public Transport", "Car Repayments", "Taxis & Share Cars", "Tolls"
        ],
        "Personal": [
            "Children & Family", "Clothing & Accessories", "Education & Student Loans",
            "Fitness & Wellbeing", "Gifts & Charity", "Hair & Beauty", "Health & Medical",
            "Investments", "Life Admin", "Mobile Phone", "News, Magazines & Books", "Technology"
        ],
        "Home": [
            "Groceries", "Homeware & Appliances", "Internet", "Maintenance & Improvements",
            "Pets", "Rates & Insurance", "Rent & Mortgage", "Utilities"
        ]
    }

    parent_category = fake.random_element(elements=parent_category_choices.keys())
    child_category_options = parent_category_choices[parent_category]
    child_category = fake.random_element(elements=child_category_options)

    return {
        "transaction_id": fake.uuid4(),
        "user_id": fake.random_element(elements=("Daniel", "Eche", "Tingru", "Warren")),
        "created": created_aest,
        "parent_category": parent_category,
        "child_category": child_category,
        "amount": - round(random.uniform(0.01, 500), 2),
        "raw_text": fake.sentence(),
        "description": fake.bs(),
        "payment_method": fake.random_element(elements=("MethodA", "MethodB", "MethodC"))
    }

def generate_transactions():
    num_transactions = 1000
    transactions = [generate_transaction(fake) for _ in range(num_transactions)]

    file_path = Path("data/transactions.pickle")
    with file_path.open("wb") as file:
        pickle.dump(transactions, file)

    file_path = Path("data/transactions.plaintext")
    with file_path.open("w") as file:
        pprint.pprint(transactions, file)
