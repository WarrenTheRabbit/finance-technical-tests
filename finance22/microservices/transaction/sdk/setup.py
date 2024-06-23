from setuptools import setup, find_packages

setup(
    # ... (other metadata like name, version, etc.) ...
    name="transactions_client",
    package_dir={"": "src"},   
    packages=find_packages(where="src"),  # Finds packages in the 'src' directory
    # ... (other options) ...
)