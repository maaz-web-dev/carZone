const API_BASE_URL = 'http://localhost:5000/api';

async function performFetch(url, options = {}, requireAuth = true) {
  const storedUserData = JSON.parse(localStorage.getItem("userData"));

  if (requireAuth) {
    if (!storedUserData || !storedUserData.token) {
      throw new Error("Authentication token not found");
    }

    try {
      const tokenPayload = JSON.parse(atob(storedUserData.token.split(".")[1])); 
      const tokenExpiration = tokenPayload.exp * 1000; 

      if (Date.now() >= tokenExpiration) {
        localStorage.removeItem("userData"); 
        throw new Error("Authentication token expired. Please log in again.");
      }
    } catch (err) {
      console.error("Invalid or expired token:", err);
      localStorage.removeItem("userData"); 
      throw new Error("Authentication error. Please log in again.");
    }
  }

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(requireAuth && storedUserData?.token
        ? { Authorization: `Bearer ${storedUserData.token}` }
        : {}),
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(errorBody.message || "An error occurred");
  }

  return response.json();
}

export default performFetch;
