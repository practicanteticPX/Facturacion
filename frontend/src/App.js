import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { FileText, List, LogOut } from 'lucide-react';
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
          <div className="navbar-container">
            <div className="navbar-brand">
              <div className="navbar-brand-icon" aria-hidden="true">
                <FileText size={16} strokeWidth={2} />
              </div>
              <h1 className="navbar-title">Facturación</h1>
            </div>

            <div className="navbar-links">
              <NavLink
                to="/"
                end
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                <FileText size={15} strokeWidth={1.9} />
                <span>Nueva Factura</span>
              </NavLink>
              <NavLink
                to="/facturas"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                <List size={17} strokeWidth={1.9} />
                <span>Ver Facturas</span>
              </NavLink>
            </div>

            <div className="user-info">
              <span className="user-name">{currentUser?.displayName || currentUser?.username}</span>
              <button onClick={handleLogout} className="logout-button" aria-label="Cerrar sesión" title="Cerrar sesión">
                <LogOut size={18} strokeWidth={2} />
              </button>
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
