from src.repository.sql.unit_of_work import UnitOfWork
from sqlalchemy import text

def get_breakdown_of_expenses_by_parent_categories():
    with UnitOfWork() as uow:
        result = uow.session.execute(text("""
            SELECT parent_category,  SUM(amount), COUNT(*)
            FROM expense
            GROUP BY parent_category;"""
        )).fetchall()
        result = [
            {"category": category, "amount": amount, "count": count} 
            for category, amount, count 
            in result
        ]
        return result
    
def get_breakdown_of_parent_category_by_subcategories(parent):
    with UnitOfWork() as uow:
        result = uow.session.execute(text(f"""
            SELECT parent_category, child_category, sum(amount), count(*) 
            FROM expense 
            WHERE parent_category = '{parent}' 
            GROUP BY parent_category, child_category 
        """
        )).fetchall()
        result = [
            {"category": child, "amount": amount, "count": count} 
            for parent, child, amount, count 
            in result
        ]
        return result