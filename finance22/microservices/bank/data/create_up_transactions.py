import json
import random
import pytz
import sys
import random 
from faker import Faker
from pathlib import Path

fake = Faker()
fake.seed_instance(42)
random.seed(42)

def generate_fake_up_transaction(fake):
    """Generates a transaction dictionary in the Up API format."""
    created_utc = fake.date_time_between(start_date=f"{-356*10}d", end_date="now", tzinfo=pytz.UTC)
    aest_timezone = pytz.timezone('Australia/Sydney')
    created_aest = created_utc.astimezone(aest_timezone)

    parent_category_choices = {
        "good-life": [
            "apps, games-and-software", "booze", "events-and-gigs", "hobbies",
            "holidays-and-travel", "lottery-and-gambling", "pubs-and-bars", "restaurants-and-cafes",
            "takeaway", "tobacco-and-vaping", "tv, music-and-streaming", "adult"
        ],
        "transport": [
            "car-insurance, rego-and-maintenance", "cycling", "fuel", "parking",
            "public-transport", "car-repayments", "taxis-and-share-cars", "tolls"
        ],
        "personal": [
            "children-and-family", "clothing-and-accessories", "education-and-student-loans",
            "fitness-and-wellbeing", "gifts-and-charity", "hair-and-beauty", "health-and-medical",
            "investments", "life-admin", "mobile-phone", "news, magazines-and-books", "technology"
        ],
        "home": [
            "groceries", "homeware-and-appliances", "internet", "maintenance-and-improvements",
            "pets", "rates-and-insurance", "rent-and-mortgage", "utilities"
        ]
    }

    parent_category = fake.random_element(elements=parent_category_choices.keys())
    child_category_options = parent_category_choices[parent_category]
    child_category = fake.random_element(elements=child_category_options)
    value = round(random.uniform(0.01, 500), 2)
    
    return {
        "type": "transactions",
        "id": str(fake.uuid4()), 
        "attributes": {
            "status": "SETTLED",
            "rawText": fake.sentence(),
            "description": fake.bs(),  
            "message": None,
            "isCategorizable": True,
            "holdInfo": None,
            "roundUp": None,
            "cashback": None,
            "amount": {
                "currencyCode": "AUD",
                "value": f"{-value:.2f}",
                "valueInBaseUnits": value * 100,
            },
            "foreignAmount": None,
            "cardPurchaseMethod": None,  
            "settledAt": created_aest.isoformat(),
            "createdAt": created_aest.isoformat(),
        },
        "relationships": {
            "account": {
                "data": {
                    "type": "accounts",
                    "id": "2de2a86f-236a-4826-980e-12469fc67894"  
                },
                "links": {
                    "related": "https://api.up.com.au/api/v1/accounts/2de2a86f-236a-4826-980e-12469fc67894"
                }
            },
            "transferAccount": {"data": None},
            "category": {
                "data": {
                    "type": "categories",
                    "id": child_category
                },
                "links": {
                    "self": f"https://api.up.com.au/api/v1/transactions/{str(fake.uuid4())}/relationships/category"
                }
            },
            "parentCategory": 
                {
                    "data": {
                        "type": "categories",
                        "id": parent_category
                    },
                },
            "tags": {
                "data": [],
                "links": {
                    "self": f"https://api.up.com.au/api/v1/transactions/{str(fake.uuid4())}/relationships/tags"
                }
            }
        },
        "links": {
            "self": f"https://api.up.com.au/api/v1/transactions/{str(fake.uuid4())}"
        }
    }

def generate_transactions(number):
    transactions = [generate_fake_up_transaction(fake) for _ in range(number)]

    file_path = Path("fake_up_transactions.json")
    with file_path.open("w") as file:
        json.dump(transactions, file)
        
if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python factory_script.py <number_of_transactions>")
        sys.exit(1)

    number_of_transactions = int(sys.argv[1])
    generate_transactions(number_of_transactions)