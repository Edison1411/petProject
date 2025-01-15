const API_URL = 'http://localhost:3001/api';

const register = async (userData) => {
  const response = await fetch(`${API_URL}/user`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });

  if (!response.ok) {
    throw new Error('Registration failed');
  }
  return await response.json();
};

const authService = {
  register
};

export default authService;
