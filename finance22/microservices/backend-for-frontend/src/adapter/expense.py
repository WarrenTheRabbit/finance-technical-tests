def represent_child_category_data_as_donut(data):
    total = 0
    result = []
    for category in data:
        total += category['amount']
    for category in data:
        entry = {
            "subcategory": category['category'],
            "amount": f"{category['amount'] * -1:.2f}",
            "percentage": (category['amount'] / total) * 100
        }
        result.append(entry)
    return result
        
def represent_parent_category_data_as_donut(data):
    total = 0
    result = []
    for category in data:
        total += category['amount']
    for category in data:
        entry = {
            "category": category['category'],
            "amount": float(f"{category['amount'] * -1:.2f}"),
            "percentage": (category['amount'] / total) * 100
        }
        result.append(entry)
    return result