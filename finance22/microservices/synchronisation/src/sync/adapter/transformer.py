def fromUp_to_expensesDB(data):
    try:
        attributes = data["attributes"]
        relationships = data["relationships"]

        parent_category = relationships["parentCategory"]["data"]["id"] if relationships["parentCategory"]["data"] else None
        child_category = relationships["category"]["data"]["id"] if relationships["category"]["data"] else None
        amount = float(attributes["amount"]["value"])

        return {
            "transaction_id": data["_id"],
            "user_id": data["user"],
            "created": data["createdAt"],
            "parent_category": parent_category,
            "child_category": child_category,
            "amount": amount,
        }

    except KeyError as e:
        raise ValueError(f"Missing key in Up Bank data: {e}")
    except ValueError as e:
        raise ValueError(f"Invalid value in Up Bank data: {e}")
    except Exception as e:
        raise ValueError(f"Unexpected error in transformation to Expense format: {e}")


def fromUp_to_transactionDB(data):
    """
    Transforms Up Bank transaction data to format used by Transaction
    endpoint.
    """
    try:
        attributes = data["attributes"]
        relationships = data["relationships"]

        parent_category = relationships["parentCategory"]["data"]["id"] if relationships["parentCategory"]["data"] else None
        child_category = relationships["category"]["data"]["id"] if relationships["category"]["data"] else None
        amount = float(attributes["amount"]["value"])

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
    except Exception as e:
        raise ValueError(f"Unexpected error in transformation to Transaction format: {e}")