import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import InscripcionFactura from './components/InscripcionFactura';
import ListaFacturas from './components/ListaFacturas';
import EditarFactura from './components/EditarFactura';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user) {
      try {
        const userData = JSON.parse(user);
        setCurrentUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error al cargar datos de usuario:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  }, []);

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="container">
            <h1 className="navbar-title">Sistema de Control de Facturas</h1>
            <div className="navbar-links">
              <Link to="/" className="nav-link">Nueva Factura</Link>
              <Link to="/facturas" className="nav-link">Ver Facturas</Link>
              <div className="user-info">
                <span className="user-name">{currentUser?.displayName || currentUser?.username}</span>
                <button onClick={handleLogout} className="logout-button">
                  Cerrar Sesión
                </button>
              </div>
            </div>
          </div>
        </nav>

        <div className="container">
          <Routes>
            <Route path="/" element={<InscripcionFactura />} />
            <Route path="/facturas" element={<ListaFacturas />} />
            <Route path="/facturas/:id" element={<EditarFactura />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
