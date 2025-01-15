import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import orderService from '../services/orderService';

/**
 * Muestra un formulario para crear una orden (comprar mascota).
 * Lee "?petId=X" y lo pone en el form. Al finalizar, muestra un
 * mensaje de éxito en la misma pantalla.
 */
function OrderForm() {
  const location = useLocation();

  const [orderData, setOrderData] = useState({
    petId: '',
    quantity: 1,
    shipDate: '',
    status: 'placed',
    complete: false
  });

  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const petIdFromUrl = params.get('petId'); // e.g. "1"
    if (petIdFromUrl) {
      setOrderData((prev) => ({ ...prev, petId: petIdFromUrl }));
    }
  }, [location.search]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setOrderData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await orderService.createOrder(orderData);
      setSuccessMessage(`Order placed successfully for pet ID ${orderData.petId}!`);
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Place an Order</h2>

      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Pet ID:</label>
          <input
            className="form-control"
            name="petId"
            value={orderData.petId}
            onChange={handleChange}
            readOnly
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Quantity:</label>
          <input
            className="form-control"
            type="number"
            name="quantity"
            value={orderData.quantity}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Ship Date:</label>
          <input
            className="form-control"
            type="datetime-local"
            name="shipDate"
            value={orderData.shipDate}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Status:</label>
          <select
            className="form-select"
            name="status"
            value={orderData.status}
            onChange={handleChange}
          >
            <option value="placed">placed</option>
            <option value="approved">approved</option>
            <option value="delivered">delivered</option>
          </select>
        </div>
        <div className="mb-3 form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name="complete"
            checked={orderData.complete}
            onChange={handleChange}
          />
          <label className="form-check-label">Complete</label>
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Place Order
        </button>
      </form>
    </div>
  );
}

export default OrderForm;
