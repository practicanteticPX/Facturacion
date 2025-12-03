import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { GET_FACTURAS, GET_COMPANIAS } from '../apollo/queries';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { Label } from './ui/label';
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
      <div className="lista-header">
        <h2 className="lista-title">Lista de Facturas</h2>
        <p className="lista-subtitle">Gestiona y consulta las facturas registradas en el sistema</p>
      </div>

      <div className="lista-filters-card">
        <div className="lista-filters-header">
          <h3 className="lista-section-title">Filtros de búsqueda</h3>
        </div>

        <div className="lista-form-grid">
          <div className="lista-form-group">
            <Label>Compañía</Label>
            <Select
              value={filtros.cia || "all"}
              onValueChange={(value) => setFiltros(prev => ({ ...prev, cia: value === "all" ? "" : value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Todas las compañías" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                {companiasData?.companias?.map(cia => (
                  <SelectItem key={cia} value={cia}>{cia}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="lista-form-group">
            <Label>NIT del proveedor</Label>
            <input
              type="text"
              name="nit"
              value={filtros.nit}
              onChange={handleFiltroChange}
              className="lista-input"
              placeholder="Ej: 900123456-1"
            />
          </div>

          <div className="lista-form-group">
            <Label>Número de control</Label>
            <input
              type="text"
              name="numeroControl"
              value={filtros.numeroControl}
              onChange={handleFiltroChange}
              className="lista-input"
              placeholder="Ej: 2024001"
            />
          </div>
        </div>

        <div className="lista-button-group">
          <Button onClick={aplicarFiltros} variant="default">
            Aplicar Filtros
          </Button>
          <Button onClick={limpiarFiltros} variant="outline">
            Limpiar
          </Button>
        </div>
      </div>

      <div className="lista-table-section">
        <div className="lista-table-header">
          <p className="lista-info-text">
            {data?.facturas?.length || 0} {data?.facturas?.length === 1 ? 'factura encontrada' : 'facturas encontradas'}
          </p>
        </div>
        <div className="lista-table-container">
          <table className="lista-table">
          <thead>
            <tr>
              <th>Nº Control</th>
              <th>Cia</th>
              <th>Proveedor</th>
              <th>No. Factura</th>
              <th>Entregada a</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data?.facturas?.length === 0 ? (
              <tr>
                <td colSpan="6" className="lista-table-empty">
                  No se encontraron facturas
                </td>
              </tr>
            ) : (
              data?.facturas?.map(factura => (
                <tr key={factura.id}>
                  <td>{factura.numeroControl}</td>
                  <td>{factura.cia}</td>
                  <td>{factura.proveedor}</td>
                  <td>{factura.numeroFactura}</td>
                  <td>{factura.entregadaA || '-'}</td>
                  <td>
                    <div className="lista-table-actions">
                      <Button
                        onClick={() => navigate(`/facturas/${factura.id}`)}
                        variant="ghost"
                        size="sm"
                      >
                        Editar
                      </Button>
                      <Button
                        onClick={() => navigate(`/facturas/${factura.id}/causacion`)}
                        variant="outline"
                        size="sm"
                      >
                        Causar
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}

export default ListaFacturas;
