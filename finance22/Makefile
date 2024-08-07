build: package
	@echo "##################################################"
	@echo "Building containers..."
	docker-compose up --build
	@echo "Completed building containers."

build_tests:
	@echo "##################################################"
	@echo "Building microservices tests..."
	docker-compose build sync
	@echo "Completed building microservice tests."

test_views:
	@echo "##################################################"
	@echo "Running expense views tests..."
	cd microservices/expense && pytest tests/test_views.py -s -vvv

down:
	docker-compose down

up: 
	docker-compose up

data:
	@echo "##################################################"
	@echo "Creating $(n) fake Up transactions..."
	@cd microservices/bank/data && .venv-faker/bin/python -m create_up_transactions $(n)
	@echo "Completed creating fake Up transactions."
	

package: transaction token bank expense sync

expense:
	@echo "##################################################"
	@echo "Packaging expense SDK..."
	@cd microservices/expense/src/sdk && python3 -m build;
	@echo "Completed packaging expenses SDK."
	@echo "##################################################"
	@echo "Copying SDK to dependent services..."
	@cp microservices/expense/src/sdk/dist/expense_client-0.0.0-py3-none-any.whl microservices/synchronisation/dependencies/
	@cp microservices/expense/src/sdk/dist/expense_client-0.0.0-py3-none-any.whl microservices/backend-for-frontend/dependencies/
	@echo "Completed copying expenses SDK to dependent services."

transaction:
	@echo "##################################################"
	@echo "Packaging transaction SDK..."
	@cd microservices/transaction/src/sdk && python3 -m build;
	@echo "##################################################"
	@echo "Copying SDK to dependent services..."
	@cp microservices/transaction/src/sdk/dist/transaction_client-0.0.0-py3-none-any.whl microservices/synchronisation/dependencies/
	@cp microservices/transaction/src/sdk/dist/transaction_client-0.0.0-py3-none-any.whl microservices/backend-for-frontend/dependencies/
	@echo "Completed copying transaction SDK files to dependent services."

token:
	@echo "##################################################"
	@echo "Packaging token SDK....."
	@cd microservices/token/src/sdk && python3 -m build;
	@echo "##################################################"
	@echo "Copying SDK to dependent services..."
	@cp microservices/token/src/sdk/dist/token_client-0.0.0-py3-none-any.whl microservices/synchronisation/dependencies/
	@cp microservices/token/src/sdk/dist/token_client-0.0.0-py3-none-any.whl microservices/backend-for-frontend/dependencies/
	@echo "Completed copying token SDK files to dependent services."
 
bank:
	@echo "##################################################"
	@echo "Packaging bank SDK..."
	@cd microservices/bank/src/sdk && python3 -m build;
	@echo "##################################################"
	@echo "Copying SDK to dependent services..."
	@cp microservices/bank/src/sdk/dist/bank_client-0.0.0-py3-none-any.whl microservices/synchronisation/dependencies/
	@cp microservices/bank/src/sdk/dist/bank_client-0.0.0-py3-none-any.whl microservices/backend-for-frontend/dependencies/
	@echo "Completed copying bank SDK files to dependent services."

sync:
	@echo "##################################################"
	@echo "Packaging sync SDK..."
	@cd microservices/synchronisation && python3 -m build;
	@echo "Completed packaging sync SDK."
	@echo "##################################################"
	@echo "Copying SDK files to dependent services..."
	@cp microservices/synchronisation/dist/sync-0.0.0-py3-none-any.whl microservices/synchronisation/dependencies/
	@cp microservices/synchronisation/dist/sync-0.0.0-py3-none-any.whl microservices/backend-for-frontend/dependencies/
	@echo "Completed copying SDK files to dependent services."
	
sdks: transaction bank expense

run_tests: reset_transaction reset_expense reset_bank data
	@echo "##################################################"
	@echo "Running microservices tests..."
	docker-compose run --rm --no-deps --entrypoint pytest sync tests -s -vvv
	
reset_bank:
	@echo "##################################################"
	@echo "Resetting BANK db..."
	@docker-compose exec mongodb mongosh mongodb://mongodb:27017/bank_history --eval 'db.transactions.drop()'
	@echo "Completed BANK db reset."

reset_transaction:
	@echo "##################################################"
	@echo "Resetting TRANSACTION db..."
	@docker-compose exec transaction rm transactions.db
	@docker-compose exec transaction alembic upgrade head
	@echo "Completed TRANSACTION db reset."

reset_expense:
	@echo "##################################################"
	@echo "Resetting EXPENSE db..."
	@docker-compose exec expense rm expense.db
	@docker-compose exec expense alembic upgrade head
	@echo "Completed EXPENSE db reset."

.PHONY: db run_factory_script

db:
	@echo "##################################################"
	@echo "Copying TRANSACTION db from container to local..."
	@docker cp finance22-transaction-1:/app/transactions.db db/transactions_copy.db
	@docker cp finance22-transaction-1:/app/transactions.db microservices/transaction/transactions.db
	@echo "##################################################"
	@echo "Copying EXPENSE db from container to local..."
	@docker cp finance22-expense-1:/app/expense.db microservices/expense/expense.db
	@docker cp finance22-expense-1:/app/expense.db db/expense_copy.db
