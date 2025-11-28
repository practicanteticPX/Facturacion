import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import InscripcionFactura from './components/InscripcionFactura';
import ListaFacturas from './components/ListaFacturas';
import EditarFactura from './components/EditarFactura';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="container">
            <h1 className="navbar-title">Sistema de Control de Facturas</h1>
            <div className="navbar-links">
              <Link to="/" className="nav-link">Nueva Factura</Link>
              <Link to="/facturas" className="nav-link">Ver Facturas</Link>
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
