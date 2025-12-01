import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { GET_FACTURAS, GET_COMPANIAS } from '../apollo/queries';
import './ListaFacturas.css';

/**
 * ListaFacturas Component
 * Muestra una tabla con todas las facturas y permite filtrarlas
 */
function ListaFacturas() {
  const navigate = useNavigate();
  const [filtros, setFiltros] = useState({
    cia: '',
    nit: '',
    numeroControl: ''
  });

  const { data: companiasData } = useQuery(GET_COMPANIAS);
  const { data, loading, error, refetch } = useQuery(GET_FACTURAS, {
    variables: { filtros: filtros.cia || filtros.nit || filtros.numeroControl ? filtros : undefined }
  });

  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltros(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const aplicarFiltros = () => {
    refetch({ filtros: filtros.cia || filtros.nit || filtros.numeroControl ? filtros : undefined });
  };

  const limpiarFiltros = () => {
    setFiltros({ cia: '', nit: '', numeroControl: '' });
    refetch({ filtros: undefined });
  };

  const formatearFecha = (fecha) => {
    if (!fecha) return '-';
    return new Date(fecha).toLocaleDateString('es-CO');
  };

  if (loading) return <div className="lista-loading">Cargando facturas...</div>;
  if (error) return <div className="lista-alert lista-alert-error">Error: {error.message}</div>;

  return (
    <div className="lista-card">
      <h2 className="lista-title">Lista de Facturas</h2>

      <div className="lista-section">
        <h3 className="lista-section-title">Filtros</h3>
        <div className="lista-form-grid">
          <div className="lista-form-group">
            <label className="lista-label">Compañía</label>
            <select
              name="cia"
              value={filtros.cia}
              onChange={handleFiltroChange}
              className="lista-select"
            >
              <option value="">Todas</option>
              {companiasData?.companias?.map(cia => (
                <option key={cia} value={cia}>{cia}</option>
              ))}
            </select>
          </div>

          <div className="lista-form-group">
            <label className="lista-label">NIT</label>
            <input
              type="text"
              name="nit"
              value={filtros.nit}
              onChange={handleFiltroChange}
              className="lista-input"
              placeholder="Buscar por NIT"
            />
          </div>

          <div className="lista-form-group">
            <label className="lista-label">Nº. Control</label>
            <input
              type="text"
              name="numeroControl"
              value={filtros.numeroControl}
              onChange={handleFiltroChange}
              className="lista-input"
              placeholder="Buscar por número de control"
            />
          </div>
        </div>

        <div className="lista-button-group">
          <button onClick={aplicarFiltros} className="lista-btn lista-btn-primary">
            Aplicar Filtros
          </button>
          <button onClick={limpiarFiltros} className="lista-btn lista-btn-secondary">
            Limpiar Filtros
          </button>
        </div>
      </div>

      <div className="lista-table-container">
        <p className="lista-info-text">Total de facturas: {data?.facturas?.length || 0}</p>
        <table className="lista-table">
          <thead>
            <tr>
              <th>Nº Control</th>
              <th>Compañía</th>
              <th>Compañía + NIT</th>
              <th>Proveedor</th>
              <th>No. Factura</th>
              <th>Fecha Radicado</th>
              <th>Fecha Factura</th>
              <th>Crédito</th>
              <th>Entregada a</th>
              <th>Observaciones</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data?.facturas?.length === 0 ? (
              <tr>
                <td colSpan="11" className="lista-table-empty">
                  No se encontraron facturas
                </td>
              </tr>
            ) : (
              data?.facturas?.map(factura => (
                <tr key={factura.id}>
                  <td>{factura.numeroControl}</td>
                  <td>{factura.cia}</td>
                  <td>{factura.ciaNit}</td>
                  <td>{factura.proveedor}</td>
                  <td>{factura.numeroFactura}</td>
                  <td>{formatearFecha(factura.fechaRadicado)}</td>
                  <td>{formatearFecha(factura.fechaFactura)}</td>
                  <td>{factura.facturaCredito ? 'Sí' : 'No'}</td>
                  <td>{factura.entregadaA || '-'}</td>
                  <td>{factura.observaciones || '-'}</td>
                  <td>
                    <div className="lista-table-actions">
                      <button
                        onClick={() => navigate(`/facturas/${factura.id}`)}
                        className="lista-btn lista-btn-primary"
                      >
                        Editar
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListaFacturas;
