class Transaction:
    def __init__(
        self,
        transaction_id,
        user_id,
        created,
        parent_category,
        child_category,
        amount,
        raw_text,
        description,
        payment_method
    ):
        self.transaction_id = transaction_id
        self.user_id = user_id
        self.created = created
        self.parent_category = parent_category
        self.child_category = child_category
        self.amount = amount
        self.raw_text = raw_text
        self.description = description
        self.payment_method = payment_method


    def dict(self):
        return {
            "transaction_id": self.transaction_id,
            "user_id": self.user_id,
            "created": self.created,
            "parent_category": self.parent_category,
            "child_category": self.child_category,   
            "amount": self.amount,
            "raw_text": self.raw_text,
            "description": self.description,
            "payment_method": self.payment_method
        }