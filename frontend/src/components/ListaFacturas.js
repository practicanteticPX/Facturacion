import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { GET_FACTURAS, GET_COMPANIAS } from '../apollo/queries';

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

  if (loading) return <div className="loading">Cargando facturas...</div>;
  if (error) return <div className="alert alert-error">Error: {error.message}</div>;

  return (
    <div className="card">
      <h2 className="card-title">Lista de Facturas</h2>

      <div className="section">
        <h3 className="section-title">Filtros</h3>
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">Compañía</label>
            <select
              name="cia"
              value={filtros.cia}
              onChange={handleFiltroChange}
              className="form-select"
            >
              <option value="">Todas</option>
              {companiasData?.companias?.map(cia => (
                <option key={cia} value={cia}>{cia}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">NIT</label>
            <input
              type="text"
              name="nit"
              value={filtros.nit}
              onChange={handleFiltroChange}
              className="form-input"
              placeholder="Buscar por NIT"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Nº. Control</label>
            <input
              type="text"
              name="numeroControl"
              value={filtros.numeroControl}
              onChange={handleFiltroChange}
              className="form-input"
              placeholder="Buscar por número de control"
            />
          </div>
        </div>

        <div className="button-group">
          <button onClick={aplicarFiltros} className="btn btn-primary btn-small">
            Aplicar Filtros
          </button>
          <button onClick={limpiarFiltros} className="btn btn-secondary btn-small">
            Limpiar Filtros
          </button>
        </div>
      </div>

      <div className="table-container">
        <p className="info-text">Total de facturas: {data?.facturas?.length || 0}</p>
        <table className="table">
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
                <td colSpan="11" style={{ textAlign: 'center', padding: '2rem' }}>
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
                    <div className="table-actions">
                      <button
                        onClick={() => navigate(`/facturas/${factura.id}`)}
                        className="btn btn-primary btn-small"
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
