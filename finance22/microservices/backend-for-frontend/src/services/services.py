import httplib2
import json
from fastapi import HTTPException

def ping_up_api(token):
    """Pings the Up Bank API to check its availability.

    Returns:
        dict or None: The JSON response from the API if successful, or None if there's an error.
    """

    url = "https://api.up.com.au/api/v1/util/ping"
    headers = {
        'Authorization': f'Bearer {token}'
    }

    try:
        http = httplib2.Http()
        response, content = http.request(url, 'GET', headers=headers)
        if response.status == 200:
            return json.loads(content)  
        elif response.status == 401:
            raise HTTPException("401 Unauthorized: Invalid or expired token.")
        else:
            raise HTTPException(f"Error pinging Up API: Status {response.status}")
    except HTTPException as e:
        raise  
    except Exception as e:
        raise HTTPException(f"Unexpected error pinging Up API: {e}") 
