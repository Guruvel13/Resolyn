const BASE_URL = 'http://localhost:5000/api';

const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
};

export const api = {
  get: async (endpoint: string) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: getHeaders()
    });
    return response.json();
  },
  
  post: async (endpoint: string, data: any) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data)
    });
    return response.json();
  },
  
  put: async (endpoint: string, data: any) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data)
    });
    return response.json();
  },
  
  delete: async (endpoint: string) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    return response.json();
  }
};
