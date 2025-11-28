import React, { useState, useEffect } from 'react';
import { useMutation, useQuery, useLazyQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import {
  CREAR_FACTURA,
  GET_PERSONAS,
  GET_COMPANIAS,
  GET_OPCIONES_PLANTILLA,
  GET_PROVEEDOR,
  GET_FACTURAS
} from '../apollo/queries';

function InscripcionFactura() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    numeroControl: '',
    cia: '',
    nit: '',
    numeroFactura: '',
    fechaRadicado: '',
    fechaFactura: '',
    facturaCredito: false,
    acuseReciboSCI: false,
    entregadaA: '',
    fechaEntrega: '',
    elaboroPlantilla: ''
  });

  const [proveedorNombre, setProveedorNombre] = useState('');
  const [ciaNit, setCiaNit] = useState('');
  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });
  const [mostrarSugerencias, setMostrarSugerencias] = useState(false);
  const [personasFiltradas, setPersonasFiltradas] = useState([]);

  const { data: personasData } = useQuery(GET_PERSONAS);
  const { data: companiasData } = useQuery(GET_COMPANIAS);
  const { data: opcionesPlantillaData } = useQuery(GET_OPCIONES_PLANTILLA);

  const [buscarProveedor, { loading: loadingProveedor }] = useLazyQuery(GET_PROVEEDOR, {
    onCompleted: (data) => {
      if (data?.proveedor) {
        setProveedorNombre(data.proveedor.Nombre);
      }
    },
    onError: (error) => {
      setProveedorNombre('Proveedor no encontrado');
      console.error('Error buscando proveedor:', error);
    }
  });

  const [crearFactura, { loading: loadingCrear }] = useMutation(CREAR_FACTURA, {
    refetchQueries: [{ query: GET_FACTURAS }],
    onCompleted: () => {
      setMensaje({ tipo: 'success', texto: 'Factura creada exitosamente' });
      setTimeout(() => {
        navigate('/facturas');
      }, 1500);
    },
    onError: (error) => {
      setMensaje({ tipo: 'error', texto: error.message });
    }
  });

  useEffect(() => {
    if (formData.cia && formData.nit) {
      setCiaNit(`${formData.cia}${formData.nit}`);
    } else {
      setCiaNit('');
    }
  }, [formData.cia, formData.nit]);

  useEffect(() => {
    if (formData.nit && formData.nit.length > 0) {
      const timer = setTimeout(() => {
        buscarProveedor({ variables: { nit: formData.nit } });
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setProveedorNombre('');
    }
  }, [formData.nit, buscarProveedor]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const buscarPorPalabras = (nombre, textoBusqueda) => {
    const nombreLower = nombre.toLowerCase();
    const palabrasBuscadas = textoBusqueda.toLowerCase().trim().split(/\s+/);

    // Todas las palabras buscadas deben estar contenidas en el nombre (en cualquier orden)
    return palabrasBuscadas.every(palabra => nombreLower.includes(palabra));
  };

  const handleEntregadaAChange = (e) => {
    const valor = e.target.value;
    setFormData(prev => ({ ...prev, entregadaA: valor }));

    if (valor.trim().length > 0 && personasData?.personas) {
      const filtradas = personasData.personas.filter(persona =>
        buscarPorPalabras(persona.nombre, valor)
      );
      setPersonasFiltradas(filtradas);
      setMostrarSugerencias(filtradas.length > 0);
    } else {
      setPersonasFiltradas([]);
      setMostrarSugerencias(false);
    }
  };

  const seleccionarPersona = (nombre) => {
    setFormData(prev => ({ ...prev, entregadaA: nombre }));
    setMostrarSugerencias(false);
    setPersonasFiltradas([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje({ tipo: '', texto: '' });

    try {
      const input = {
        numeroControl: formData.numeroControl,
        cia: formData.cia,
        nit: formData.nit,
        numeroFactura: formData.numeroFactura,
        fechaRadicado: formData.fechaRadicado,
        fechaFactura: formData.fechaFactura,
        facturaCredito: formData.facturaCredito,
        acuseReciboSCI: formData.acuseReciboSCI,
      };

      if (formData.entregadaA) input.entregadaA = formData.entregadaA;
      if (formData.fechaEntrega) input.fechaEntrega = formData.fechaEntrega;
      if (formData.elaboroPlantilla) input.elaboroPlantilla = formData.elaboroPlantilla;

      await crearFactura({ variables: { input } });
    } catch (error) {
      console.error('Error creando factura:', error);
    }
  };

  return (
    <div className="card">
      <h2 className="card-title">Inscripción de Nueva Factura</h2>

      {mensaje.texto && (
        <div className={`alert alert-${mensaje.tipo}`}>
          {mensaje.texto}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label required">Nº. Control</label>
            <input
              type="text"
              name="numeroControl"
              value={formData.numeroControl}
              onChange={handleChange}
              className="form-input"
              required
            />
            <p className="info-text">Consecutivo asignado por el auxiliar administrativo</p>
          </div>

          <div className="form-group">
            <label className="form-label required">Compañía</label>
            <select
              name="cia"
              value={formData.cia}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Seleccione una compañía</option>
              {companiasData?.companias?.map(cia => (
                <option key={cia} value={cia}>{cia}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Compañía + NIT</label>
            <input
              type="text"
              value={ciaNit}
              className="form-input"
              disabled
            />
            <p className="info-text">Se genera automáticamente</p>
          </div>

          <div className="form-group">
            <label className="form-label required">NIT</label>
            <input
              type="text"
              name="nit"
              value={formData.nit}
              onChange={handleChange}
              className="form-input"
              required
            />
            <p className="info-text">Código del proveedor</p>
          </div>

          <div className="form-group">
            <label className="form-label">Proveedor</label>
            <input
              type="text"
              value={loadingProveedor ? 'Buscando...' : proveedorNombre}
              className="form-input"
              disabled
            />
            <p className="info-text">Se busca automáticamente según el NIT</p>
          </div>

          <div className="form-group">
            <label className="form-label required">No. Factura</label>
            <input
              type="text"
              name="numeroFactura"
              value={formData.numeroFactura}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label required">Fecha Radicado</label>
            <input
              type="date"
              name="fechaRadicado"
              value={formData.fechaRadicado}
              onChange={handleChange}
              className="form-input"
              required
            />
            <p className="info-text">Fecha en que se realiza el radicado</p>
          </div>

          <div className="form-group">
            <label className="form-label required">Fecha Factura</label>
            <input
              type="date"
              name="fechaFactura"
              value={formData.fechaFactura}
              onChange={handleChange}
              className="form-input"
              required
            />
            <p className="info-text">Fecha de emisión de la factura</p>
          </div>

          <div className="form-group">
            <label className="form-label">
              <input
                type="checkbox"
                name="facturaCredito"
                checked={formData.facturaCredito}
                onChange={handleChange}
                className="form-checkbox"
              />
              Factura a Crédito
            </label>
          </div>

          <div className="form-group">
            <label className="form-label">
              <input
                type="checkbox"
                name="acuseReciboSCI"
                checked={formData.acuseReciboSCI}
                onChange={handleChange}
                className="form-checkbox"
              />
              Acuse Recibo SCI
            </label>
            <p className="info-text">Aplica desde el 13 de julio de 2022</p>
          </div>

          <div className="form-group" style={{ position: 'relative' }}>
            <label className="form-label">Entregada a</label>
            <input
              type="text"
              name="entregadaA"
              value={formData.entregadaA}
              onChange={handleEntregadaAChange}
              onFocus={() => {
                if (formData.entregadaA && personasData?.personas) {
                  const filtradas = personasData.personas.filter(persona =>
                    buscarPorPalabras(persona.nombre, formData.entregadaA)
                  );
                  setPersonasFiltradas(filtradas);
                  setMostrarSugerencias(filtradas.length > 0);
                }
              }}
              onBlur={() => setTimeout(() => setMostrarSugerencias(false), 200)}
              className="form-input"
              placeholder="Escriba para buscar..."
              autoComplete="off"
            />
            {mostrarSugerencias && personasFiltradas.length > 0 && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                backgroundColor: 'white',
                border: '1px solid #ddd',
                borderRadius: '4px',
                maxHeight: '200px',
                overflowY: 'auto',
                zIndex: 1000,
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}>
                {personasFiltradas.map(persona => (
                  <div
                    key={persona.id}
                    onClick={() => seleccionarPersona(persona.nombre)}
                    style={{
                      padding: '8px 12px',
                      cursor: 'pointer',
                      borderBottom: '1px solid #f0f0f0'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f5f5'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                  >
                    {persona.nombre}
                  </div>
                ))}
              </div>
            )}
            <p className="info-text">Busque por nombre o apellido en cualquier orden (ej: "Lopez Esteban" encuentra "Zuluaga Lopez Esteban")</p>
          </div>

          <div className="form-group">
            <label className="form-label">Fecha de Entrega</label>
            <input
              type="date"
              name="fechaEntrega"
              value={formData.fechaEntrega}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Elaboró Plantilla</label>
            <select
              name="elaboroPlantilla"
              value={formData.elaboroPlantilla}
              onChange={handleChange}
              className="form-select"
            >
              {opcionesPlantillaData?.opcionesPlantilla?.map((opcion, idx) => (
                <option key={idx} value={opcion}>
                  {opcion || '(Vacío)'}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="button-group">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loadingCrear}
          >
            {loadingCrear ? 'Creando...' : 'Crear Factura'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/facturas')}
            className="btn btn-secondary"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default InscripcionFactura;
