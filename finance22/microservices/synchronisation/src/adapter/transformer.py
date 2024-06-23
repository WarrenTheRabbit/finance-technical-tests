from datetime import datetime


def fromUp_to_expensesDB(data):
    pass

def fromUp_to_transactionDB(data):
    """
    Transforms Up Bank transaction data to format used by Transaction
    endpoint.
    """
    try:
        attributes = data["attributes"]
        relationships = data["relationships"]

        # Get parent and child category IDs from relationships
        parent_category = relationships["parentCategory"]["data"]["id"] if relationships["parentCategory"]["data"] else None
        child_category = relationships["category"]["data"]["id"] if relationships["category"]["data"] else None

        # Extract and format the amount
        amount = float(attributes["amount"]["value"])

        # Extract payment method

        return {
            "transaction_id": data["_id"],
            "user_id": data["user"],
            "created": data["createdAt"],
            "parent_category": parent_category,
            "child_category": child_category,
            "amount": amount,
            "raw_text": attributes["rawText"],
            "description": attributes["description"],
        }

    except KeyError as e:
        raise ValueError(f"Missing key in Up Bank data: {e}")
    except ValueError as e:
        raise ValueError(f"Invalid value in Up Bank data: {e}")