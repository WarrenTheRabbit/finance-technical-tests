def get_sqlite_uri():
    return f"sqlite:///pats.db"


# def get_api_url():
#     host = os.environ.get("API_HOST", "localhost")
#     port = 5005 if host == "localhost" else 80
#     return f"http://{host}:{port}"