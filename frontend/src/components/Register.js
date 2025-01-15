import React, { useState } from 'react';
import authService from '../services/authService';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.register(formData);
      alert('User registered successfully!');
    } catch (error) {
      alert('Registration failed');
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h2 className="mt-4">Register</h2>
        <form onSubmit={handleSubmit} className="mt-3">
          <div className="mb-3">
            <label className="form-label">Username:</label>
            <input 
              className="form-control"
              name="username"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">First Name:</label>
            <input 
              className="form-control"
              name="firstName"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Last Name:</label>
            <input 
              className="form-control"
              name="lastName"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input 
              className="form-control"
              name="email"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password:</label>
            <input 
              className="form-control"
              name="password"
              type="password"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Phone:</label>
            <input 
              className="form-control"
              name="phone"
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
