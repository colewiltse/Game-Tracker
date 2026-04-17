const API_BASE = process.env.REACT_APP_BASE_URL;

export const fetchWithAuth = async (url, options = {}) => {
  let accessToken = localStorage.getItem("access");

  const makeRequest = async (token) => {
    return fetch(`${API_BASE}${url}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  let response = await makeRequest(accessToken);

  if (response.status === 401) {
    const refresh = localStorage.getItem("refresh");

    if (!refresh) {
      throw new Error("No refresh token");
    }

    const refreshResponse = await fetch(`${API_BASE}/api/token/refresh/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh }),
    });

    const data = await refreshResponse.json();

    if (!data.access) {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      window.location.href = "/login"; 
      throw new Error("Session expired");
    }

    localStorage.setItem("access", data.access);

    response = await makeRequest(data.access);
  }

  return response;
};