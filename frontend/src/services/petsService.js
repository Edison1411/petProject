const API_URL = 'http://localhost:3001/api';
let token = null;

// If you are storing the token in localStorage, retrieve it here
const setToken = (newToken) => {
  token = newToken;
};

const createPet = async (petData) => {
  const response = await fetch(`${API_URL}/pet`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(petData)
  });
  if (!response.ok) throw new Error('Failed to create pet');
  return await response.json();
};

const updatePet = async (petData) => {
  const response = await fetch(`${API_URL}/pet`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(petData)
  });
  if (!response.ok) throw new Error('Failed to update pet');
  return await response.json();
};

const getPetById = async (id) => {
  const response = await fetch(`${API_URL}/pet/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!response.ok) throw new Error('Failed to fetch pet');
  return await response.json();
};

const findPetsByStatus = async (status) => {
  const response = await fetch(`${API_URL}/pet/findByStatus?status=${status}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!response.ok) throw new Error('Failed to fetch pets by status');
  return await response.json();
};

const petsService = {
  setToken,
  createPet,
  updatePet,
  getPetById,
  findPetsByStatus
};

export default petsService;
