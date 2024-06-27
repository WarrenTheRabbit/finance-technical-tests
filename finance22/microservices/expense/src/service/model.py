class Expense:
    def __init__(self, transaction_id, user_id, 
                 created, parent_category, child_category, amount):
        self.transaction_id = transaction_id
        self.user_id = user_id
        self.created = created
        self.parent_category = parent_category
        self.child_category = child_category
        self.amount = amount

    def dict(self):
        return {
            "transaction_id": self.transaction_id,
            "user_id": self.user_id,
            "created": self.created,
            "parent_category": self.parent_category,
            "child_category": self.child_category,
            "amount": self.amount,
        }