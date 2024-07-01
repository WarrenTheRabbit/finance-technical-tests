from src.repository.sql.views import (
    get_breakdown_of_expenses_by_parent_categories,
    get_breakdown_of_parent_category_by_subcategories
)

def test_that_expense_data_can_be_grouped_by_parent_categories():
    result = get_breakdown_of_expenses_by_parent_categories()
    assert result == [
        {'category': 'Good Life', 'amount': -6752.869999999999, 'count': 26}, 
        {'category': 'Home', 'amount': -4832.52, 'count': 22}, 
        {'category': 'Personal', 'amount': -6270.78, 'count': 27}, 
        {'category': 'Transport', 'amount': -6122.85, 'count': 25}
    ]
    
def test_that_goodlife_data_can_be_grouped_by_subcategories():
    result = get_breakdown_of_parent_category_by_subcategories('Good Life')
    assert result == [
        {'category': 'Adult', 'amount': -791.1800000000001, 'count': 2}, 
        {'category': 'Apps, Games & Software', 'amount': -523.1800000000001, 'count': 2},
        {'category': 'Booze', 'amount': -472.19000000000005, 'count': 2},
        {'category': 'Events & Gigs', 'amount': -522.86, 'count': 3},
        {'category': 'Hobbies', 'amount': -309.26, 'count': 1},
        {'category': 'Holidays & Travel', 'amount': -920.04, 'count': 3},
        {'category': 'Lottery & Gambling', 'amount': -16.06, 'count': 1},
        {'category': 'Restaurants & Cafes', 'amount': -656.86, 'count': 2},
        {'category': 'Tobacco & Vaping', 'amount': -1151.49, 'count': 4},
        {'category': 'Tv, Music & Streaming', 'amount': -1389.75, 'count': 6}
    ]
    
def test_that_home_data_can_be_grouped_by_subcategories():
    result = get_breakdown_of_parent_category_by_subcategories('Home')
    assert result == [
        {'category': 'Groceries', 'amount': -550.14, 'count': 3},
        {'category': 'Homeware & Appliances', 'amount': -930.05, 'count': 3},
        {'category': 'Internet', 'amount': -828.3000000000001, 'count': 5},
        {'category': 'Maintenance & Improvements', 'amount': -184.92000000000002, 'count': 3},
        {'category': 'Pets', 'amount': -278.34000000000003, 'count': 2},
        {'category': 'Rates & Insurance', 'amount': -611.16, 'count': 2},
        {'category': 'Rent & Mortgage', 'amount': -168.3, 'count': 1},
        {'category': 'Utilities', 'amount': -1281.31, 'count': 3}
        ]

def test_that_transport_data_can_be_grouped_by_subcategories():
    result = get_breakdown_of_parent_category_by_subcategories('Transport')
    assert result == [
        {'category': 'Car Insurance, Rego & Maintenance', 'amount': -1393.52, 'count': 3},
        {'category': 'Car Repayments', 'amount': -1033.06, 'count': 3},
        {'category': 'Cycling', 'amount': -856.97, 'count': 4},
        {'category': 'Fuel', 'amount': -281.74, 'count': 2},
        {'category': 'Parking', 'amount': -1118.5900000000001, 'count': 4},
        {'category': 'Public Transport', 'amount': -580.43, 'count': 3},
        {'category': 'Taxis & Share Cars', 'amount': -146.78, 'count': 2},
        {'category': 'Tolls', 'amount': -711.76, 'count': 4}
        ]
    
def test_that_personal_data_can_be_grouped_by_subcategories():
    result = get_breakdown_of_parent_category_by_subcategories('Personal')
    assert result == [
        {'category': 'Children & Family', 'amount': -606.91, 'count': 3},
        {'category': 'Clothing & Accessories', 'amount': -580.35, 'count': 2},
        {'category': 'Education & Student Loans', 'amount': -160.98999999999998, 'count': 2},
        {'category': 'Gifts & Charity', 'amount': -264.56, 'count': 1},
        {'category': 'Hair & Beauty', 'amount': -1044.08, 'count': 5},
        {'category': 'Health & Medical', 'amount': -972.1, 'count': 2},
        {'category': 'Investments', 'amount': -430.85, 'count': 1},
        {'category': 'Life Admin', 'amount': -1042.08, 'count': 4},
        {'category': 'Mobile Phone', 'amount': -773.6400000000001, 'count': 5},
        {'category': 'Technology', 'amount': -395.22, 'count': 2}
    ]