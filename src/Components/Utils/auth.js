// src/utils/auth.js

// Check if user is authenticated
export const isAuthenticated = () => {
  const token = localStorage.getItem('accessToken');
  return !!token;
};

// Get user's role
export const getUserRole = () => {
  return localStorage.getItem('userRole');
};

// Get access token
export const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};

// Set auth tokens and user data
export const setAuthData = (tokens, role) => {
  localStorage.setItem('accessToken', tokens.access);
  localStorage.setItem('refreshToken', tokens.refresh);
  localStorage.setItem('userRole', role);
};

// Clear auth data on logout
export const clearAuthData = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('userRole');
};

// API request wrapper with token
export const authFetch = async (url, options = {}) => {
  const token = getAccessToken();
  
  const headers = {
    ...options.headers,
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    // If token is expired, try to refresh it
    if (response.status === 401) {
      const newToken = await refreshToken();
      if (newToken) {
        // Retry the request with new token
        headers.Authorization = `Bearer ${newToken}`;
        return fetch(url, {
          ...options,
          headers,
        });
      }
    }

    return response;
  } catch (error) {
    console.error('Auth fetch error:', error);
    throw error;
  }
};

// Refresh token function
export const refreshToken = async () => {
  const refresh = localStorage.getItem('refreshToken');
  
  try {
    const response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refresh,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('accessToken', data.access);
      return data.access;
    } else {
      // If refresh fails, log out user
      clearAuthData();
      return null;
    }
  } catch (error) {
    console.error('Token refresh error:', error);
    clearAuthData();
    return null;
  }
};