import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function Login() {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      alert('Logged in successfully!');
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h2 className="mt-4">Login</h2>
        <form onSubmit={handleSubmit} className="mt-3">
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              className="form-control"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
