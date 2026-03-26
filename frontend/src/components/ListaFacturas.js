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
  // Filtros que el usuario está escribiendo (no aplicados aún)
  const [filtrosInputs, setFiltrosInputs] = useState({
    cia: '',
    nit: '',
    numeroControl: ''
  });
  // Filtros realmente aplicados en la búsqueda
  const [filtrosAplicados, setFiltrosAplicados] = useState({
    cia: '',
    nit: '',
    numeroControl: ''
  });
  const [page, setPage] = useState(1);
  const pageSize = 100;

  const { data: companiasData } = useQuery(GET_COMPANIAS);
  const { data, loading, error, refetch } = useQuery(GET_FACTURAS, {
    variables: {
      filtros: {
        ...(filtrosAplicados.cia && { cia: filtrosAplicados.cia }),
        ...(filtrosAplicados.nit && { nit: filtrosAplicados.nit }),
        ...(filtrosAplicados.numeroControl && { numeroControl: filtrosAplicados.numeroControl }),
        page,
        pageSize
      }
    }
  });

  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltrosInputs(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      aplicarFiltros();
    }
  };

  const aplicarFiltros = () => {
    // Aplicar los filtros escritos por el usuario
    setFiltrosAplicados(filtrosInputs);
    setPage(1); // Resetear a la primera página al aplicar filtros
  };

  const limpiarFiltros = () => {
    const filtrosVacios = { cia: '', nit: '', numeroControl: '' };
    setFiltrosInputs(filtrosVacios);
    setFiltrosAplicados(filtrosVacios);
    setPage(1);
  };

  const irAPagina = (nuevaPagina) => {
    setPage(nuevaPagina);
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
              value={filtrosInputs.cia || "all"}
              onValueChange={(value) => setFiltrosInputs(prev => ({ ...prev, cia: value === "all" ? "" : value }))}
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
              value={filtrosInputs.nit}
              onChange={handleFiltroChange}
              onKeyPress={handleKeyPress}
              className="lista-input"
              placeholder="Ej: 900123456-1"
            />
          </div>

          <div className="lista-form-group">
            <Label>Número de control</Label>
            <input
              type="text"
              name="numeroControl"
              value={filtrosInputs.numeroControl}
              onChange={handleFiltroChange}
              onKeyPress={handleKeyPress}
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
            {data?.facturas?.total || 0} {data?.facturas?.total === 1 ? 'factura encontrada' : 'facturas encontradas'}
            {data?.facturas?.total > 0 && ` (Mostrando ${((data?.facturas?.page - 1) * data?.facturas?.pageSize) + 1}-${Math.min(data?.facturas?.page * data?.facturas?.pageSize, data?.facturas?.total)})`}
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
            {data?.facturas?.facturas?.length === 0 ? (
              <tr>
                <td colSpan="6" className="lista-table-empty">
                  No se encontraron facturas
                </td>
              </tr>
            ) : (
              data?.facturas?.facturas?.map(factura => (
                <tr key={factura.numeroControl}>
                  <td>{factura.numeroControl}</td>
                  <td>{factura.cia}</td>
                  <td>{factura.proveedor}</td>
                  <td>{factura.numeroFactura}</td>
                  <td>{factura.entregadaA || '-'}</td>
                  <td>
                    <div className="lista-table-actions">
                      <Button
                        onClick={() => navigate(`/facturas/${factura.numeroControl}`)}
                        variant="ghost"
                        size="sm"
                        title={factura.enProceso ? 'Ver factura (solo lectura)' : 'Editar factura'}
                      >
                        {factura.enProceso ? 'Ver' : 'Editar'}
                      </Button>
                      <Button
                        onClick={() => navigate(`/facturas/${factura.numeroControl}/causacion`)}
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

        {/* Controles de Paginación */}
        {data?.facturas?.total > pageSize && (
          <div className="lista-pagination">
            <Button
              onClick={() => irAPagina(page - 1)}
              disabled={page === 1}
              variant="outline"
              size="sm"
            >
              Anterior
            </Button>
            <span className="lista-pagination-info">
              Página {page} de {Math.ceil(data?.facturas?.total / pageSize)}
            </span>
            <Button
              onClick={() => irAPagina(page + 1)}
              disabled={!data?.facturas?.hasMore}
              variant="outline"
              size="sm"
            >
              Siguiente
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ListaFacturas;
