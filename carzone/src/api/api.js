const API_BASE_URL = 'http://localhost:5000/api';

async function performFetch(url, options = {}, requireAuth = true) {
  const storedUserData = JSON.parse(localStorage.getItem('userData'));

  if (requireAuth && (!storedUserData || !storedUserData.token)) {
    throw new Error('Authentication token not found');
  }

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(requireAuth && storedUserData?.token
        ? { Authorization: `Bearer ${storedUserData.token}` }
        : {}),
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(errorBody.message || 'An error occurred');
  }

  return response.json();
}

export default performFetch;
