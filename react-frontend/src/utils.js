

export const fetcher = ({ url, method = 'GET', body = null }) => async () => {
    const options = { method };
  
    if (body) {
      options.body = JSON.stringify(body);
      options.header = { 'Content-Type': 'application/json' }
    }
  
    const response = await fetch(url, options);
  
    if (!response.ok) {
      const errorData = await response.json();
      const error = new Error('An error occurred while fetching the data.');
      error.info = errorData;
      error.status = response.status;
      throw error;
    }
  
    return response.json();
  };