import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Importar componentes
import Login from './components/Login';
import Register from './components/Register';
import Inventory from './components/Inventory';
import CreatePet from './components/CreatePet';
import UpdatePet from './components/UpdatePet';
import OrderForm from './components/OrderForm';
import OrderSuccess from './components/OrderSuccess';

import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        {/* Barra de navegación con Bootstrap */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <Link className="navbar-brand" to="/">Pet Store</Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon">≡</span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/inventory">Inventory</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/create-pet">Create Pet</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Rutas */}
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<h2>Welcome to Pet Store!</h2>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/create-pet" element={<CreatePet />} />
            <Route path="/update-pet" element={<UpdatePet />} />
            <Route path="/order-form" element={<OrderForm />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="*" element={<h2>404 Not Found</h2>} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
