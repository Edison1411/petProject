const API_URL = 'http://localhost:3001/api';
let token = null;

const setToken = (newToken) => {
  token = newToken;
};

const createOrder = async (orderData) => {
  const response = await fetch(`${API_URL}/store/order`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(orderData)
  });
  if (!response.ok) throw new Error('Failed to create order');
  return await response.json();
};

const orderService = {
  setToken,
  createOrder
};

export default orderService;
