export const fetcher = async ({ url, method = 'GET', body = null, headers = {} }) => {
  const options = { method, headers: { 'Content-Type': 'application/json', ...headers } };

  if (body) {
    options.body = JSON.stringify(body);
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
