build:
	cd microservices/bank/src/sdk && python3 setup.py bdist_wheel
	cp microservices/bank/src/sdk/dist/bank_client-0.0.0-py3-none-any.whl microservices/backend-for-frontend/dependencies/bank_client-0.0.0-py3-none-any.whl
	docker-compose up --build


