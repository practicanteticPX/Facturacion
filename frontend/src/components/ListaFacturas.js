import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { GET_FACTURAS, GET_COMPANIAS } from '../apollo/queries';
import { Button } from './ui/button';
import { Label } from './ui/label';
import './ListaFacturas.css';

/**
 * ListaFacturas Component
 * Muestra una tabla con todas las facturas y permite filtrarlas.
 */
function ListaFacturas() {
  const navigate = useNavigate();
  const [filtrosInputs, setFiltrosInputs] = useState({
    cia: '',
    nit: '',
    numeroControl: ''
  });
  const [filtrosAplicados, setFiltrosAplicados] = useState({
    cia: '',
    nit: '',
    numeroControl: ''
  });
  const [page, setPage] = useState(1);
  const [ciaSelectOpen, setCiaSelectOpen] = useState(false);
  const [ciaActiveIndex, setCiaActiveIndex] = useState(0);
  const ciaSelectRef = useRef(null);
  const ciaOptionsListRef = useRef(null);
  const ciaOptionRefs = useRef([]);
  const pageSize = 100;

  const { data: companiasData } = useQuery(GET_COMPANIAS);
  const { data, loading, error } = useQuery(GET_FACTURAS, {
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

  const totalFacturas = data?.facturas?.total || 0;
  const companiaOptions = [
    { value: '', label: 'Todas las compañías' },
    ...(companiasData?.companias || []).map(cia => ({ value: cia, label: cia }))
  ];
  const selectedCiaIndex = Math.max(
    0,
    companiaOptions.findIndex(option => option.value === filtrosInputs.cia)
  );
  const selectedCiaLabel = companiaOptions[selectedCiaIndex]?.label || 'Todas las compañías';

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ciaSelectRef.current && !ciaSelectRef.current.contains(event.target)) {
        setCiaSelectOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (ciaSelectOpen) {
      setCiaActiveIndex(selectedCiaIndex);
      setTimeout(() => scrollCiaOptionIntoView(selectedCiaIndex), 0);
    }
  }, [ciaSelectOpen, selectedCiaIndex]);

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
    setFiltrosAplicados(filtrosInputs);
    setPage(1);
  };

  const limpiarFiltros = () => {
    const filtrosVacios = { cia: '', nit: '', numeroControl: '' };
    setFiltrosInputs(filtrosVacios);
    setFiltrosAplicados(filtrosVacios);
    setCiaActiveIndex(0);
    setCiaSelectOpen(false);
    setPage(1);
  };

  const irAPagina = (nuevaPagina) => {
    setPage(nuevaPagina);
  };

  const seleccionarCompania = (option) => {
    setFiltrosInputs(prev => ({ ...prev, cia: option.value }));
    setCiaSelectOpen(false);
  };

  const scrollCiaOptionIntoView = (index) => {
    const container = ciaOptionsListRef.current;
    const activeItem = ciaOptionRefs.current[index];

    if (!container || !activeItem) return;

    const itemTop = activeItem.offsetTop;
    const itemBottom = itemTop + activeItem.offsetHeight;
    const visibleTop = container.scrollTop;
    const visibleBottom = visibleTop + container.clientHeight;

    if (itemTop < visibleTop) {
      container.scrollTop = itemTop;
    } else if (itemBottom > visibleBottom) {
      container.scrollTop = itemBottom - container.clientHeight;
    }
  };

  const moverCompaniaActiva = (direction) => {
    const totalOptions = companiaOptions.length;
    if (totalOptions === 0) return;

    const nextIndex = (ciaActiveIndex + direction + totalOptions) % totalOptions;
    setCiaActiveIndex(nextIndex);
    setTimeout(() => scrollCiaOptionIntoView(nextIndex), 0);
  };

  const handleCiaSelectKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!ciaSelectOpen) {
        setCiaSelectOpen(true);
        return;
      }
      moverCompaniaActiva(1);
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!ciaSelectOpen) {
        setCiaSelectOpen(true);
        return;
      }
      moverCompaniaActiva(-1);
      return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      if (!ciaSelectOpen) {
        setCiaSelectOpen(true);
        return;
      }
      seleccionarCompania(companiaOptions[ciaActiveIndex]);
      return;
    }

    if (e.key === ' ' || e.key === 'Spacebar') {
      e.preventDefault();
      setCiaSelectOpen(prev => !prev);
      return;
    }

    if (e.key === 'Escape') {
      e.preventDefault();
      setCiaSelectOpen(false);
    }
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
          <h3 className="lista-section-title">Filtros</h3>
        </div>

        <div className="lista-form-grid">
          <div className="lista-form-group">
            <Label>Compañía</Label>
            <div className="lista-keyboard-select" ref={ciaSelectRef}>
              <button
                type="button"
                className="lista-keyboard-select-trigger"
                onClick={() => setCiaSelectOpen(prev => !prev)}
                onKeyDown={handleCiaSelectKeyDown}
                aria-haspopup="listbox"
                aria-expanded={ciaSelectOpen}
              >
                <span>{selectedCiaLabel}</span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="lista-keyboard-select-icon"
                >
                  <path
                    d="M2.5 4.5L6 8L9.5 4.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              {ciaSelectOpen && (
                <div
                  className="lista-keyboard-select-content"
                  role="listbox"
                  ref={ciaOptionsListRef}
                >
                  {companiaOptions.map((option, index) => (
                    <button
                      type="button"
                      key={option.value || 'all'}
                      ref={(element) => { ciaOptionRefs.current[index] = element; }}
                      className={`lista-keyboard-select-item ${index === ciaActiveIndex ? 'active' : ''} ${option.value === filtrosInputs.cia ? 'selected' : ''}`}
                      onMouseEnter={() => setCiaActiveIndex(index)}
                      onClick={() => seleccionarCompania(option)}
                      role="option"
                      aria-selected={option.value === filtrosInputs.cia}
                    >
                      <span className="lista-keyboard-select-check">
                        {option.value === filtrosInputs.cia ? '✓' : ''}
                      </span>
                      <span>{option.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
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
              placeholder="Ej: 26415"
            />
          </div>
        </div>

        <div className="lista-filters-footer">
          <p className="lista-info-text">
            <span>{totalFacturas}</span> {totalFacturas === 1 ? 'factura encontrada' : 'facturas encontradas'}
          </p>
          <div className="lista-button-group">
            <Button onClick={limpiarFiltros} variant="outline">
              Limpiar
            </Button>
            <Button onClick={aplicarFiltros} variant="default">
              Aplicar filtros
            </Button>
          </div>
        </div>
      </div>

      <div className="lista-table-section">
        <div className="lista-table-container">
          <table className="lista-table">
            <thead>
              <tr>
                <th>No. Control</th>
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

        {totalFacturas > pageSize && (
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
              Página {page} de {Math.ceil(totalFacturas / pageSize)}
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
