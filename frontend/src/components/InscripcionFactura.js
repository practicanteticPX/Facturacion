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
import './InscripcionFactura.css';

/**
 * InscripcionFactura Component
 * Formulario para crear nuevas facturas en el sistema
 */
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
    <div className="inscripcion-card">
      <h2 className="inscripcion-title">Inscripción de Nueva Factura</h2>

      {mensaje.texto && (
        <div className={`inscripcion-alert inscripcion-alert-${mensaje.tipo}`}>
          {mensaje.texto}
        </div>
      )}

      <form onSubmit={handleSubmit} className="inscripcion-form">
        <div className="inscripcion-form-grid">
          <div className="inscripcion-form-group">
            <label className="inscripcion-label inscripcion-label-required">Nº. Control</label>
            <input
              type="text"
              name="numeroControl"
              value={formData.numeroControl}
              onChange={handleChange}
              className="inscripcion-input"
              required
            />
            <p className="inscripcion-info-text">Consecutivo asignado por el auxiliar administrativo</p>
          </div>

          <div className="inscripcion-form-group">
            <label className="inscripcion-label inscripcion-label-required">Compañía</label>
            <select
              name="cia"
              value={formData.cia}
              onChange={handleChange}
              className="inscripcion-select"
              required
            >
              <option value="">Seleccione una compañía</option>
              {companiasData?.companias?.map(cia => (
                <option key={cia} value={cia}>{cia}</option>
              ))}
            </select>
          </div>

          <div className="inscripcion-form-group">
            <label className="inscripcion-label">Compañía + NIT</label>
            <input
              type="text"
              value={ciaNit}
              className="inscripcion-input"
              disabled
            />
            <p className="inscripcion-info-text">Se genera automáticamente</p>
          </div>

          <div className="inscripcion-form-group">
            <label className="inscripcion-label inscripcion-label-required">NIT</label>
            <input
              type="text"
              name="nit"
              value={formData.nit}
              onChange={handleChange}
              className="inscripcion-input"
              required
            />
            <p className="inscripcion-info-text">Código del proveedor</p>
          </div>

          <div className="inscripcion-form-group">
            <label className="inscripcion-label">Proveedor</label>
            <input
              type="text"
              value={loadingProveedor ? 'Buscando...' : proveedorNombre}
              className="inscripcion-input"
              disabled
            />
            <p className="inscripcion-info-text">Se busca automáticamente según el NIT</p>
          </div>

          <div className="inscripcion-form-group">
            <label className="inscripcion-label inscripcion-label-required">No. Factura</label>
            <input
              type="text"
              name="numeroFactura"
              value={formData.numeroFactura}
              onChange={handleChange}
              className="inscripcion-input"
              required
            />
          </div>

          <div className="inscripcion-form-group">
            <label className="inscripcion-label inscripcion-label-required">Fecha Radicado</label>
            <input
              type="date"
              name="fechaRadicado"
              value={formData.fechaRadicado}
              onChange={handleChange}
              className="inscripcion-input"
              required
            />
            <p className="inscripcion-info-text">Fecha en que se realiza el radicado</p>
          </div>

          <div className="inscripcion-form-group">
            <label className="inscripcion-label inscripcion-label-required">Fecha Factura</label>
            <input
              type="date"
              name="fechaFactura"
              value={formData.fechaFactura}
              onChange={handleChange}
              className="inscripcion-input"
              required
            />
            <p className="inscripcion-info-text">Fecha de emisión de la factura</p>
          </div>

          <div className="inscripcion-form-group">
            <label className="inscripcion-label inscripcion-checkbox-wrapper">
              <input
                type="checkbox"
                name="facturaCredito"
                checked={formData.facturaCredito}
                onChange={handleChange}
                className="inscripcion-checkbox"
              />
              Factura a Crédito
            </label>
          </div>

          <div className="inscripcion-form-group">
            <label className="inscripcion-label inscripcion-checkbox-wrapper">
              <input
                type="checkbox"
                name="acuseReciboSCI"
                checked={formData.acuseReciboSCI}
                onChange={handleChange}
                className="inscripcion-checkbox"
              />
              Acuse Recibo SCI
            </label>
            <p className="inscripcion-info-text">Aplica desde el 13 de julio de 2022</p>
          </div>

          <div className="inscripcion-form-group">
            <label className="inscripcion-label">Entregada a</label>
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
              className="inscripcion-input"
              placeholder="Escriba para buscar..."
              autoComplete="off"
            />
            {mostrarSugerencias && personasFiltradas.length > 0 && (
              <div className="inscripcion-suggestions">
                {personasFiltradas.map(persona => (
                  <div
                    key={persona.id}
                    onClick={() => seleccionarPersona(persona.nombre)}
                    className="inscripcion-suggestion-item"
                  >
                    {persona.nombre}
                  </div>
                ))}
              </div>
            )}
            <p className="inscripcion-info-text">Busque por nombre o apellido en cualquier orden (ej: "Lopez Esteban" encuentra "Zuluaga Lopez Esteban")</p>
          </div>

          <div className="inscripcion-form-group">
            <label className="inscripcion-label">Fecha de Entrega</label>
            <input
              type="date"
              name="fechaEntrega"
              value={formData.fechaEntrega}
              onChange={handleChange}
              className="inscripcion-input"
            />
          </div>

          <div className="inscripcion-form-group">
            <label className="inscripcion-label">Elaboró Plantilla</label>
            <select
              name="elaboroPlantilla"
              value={formData.elaboroPlantilla}
              onChange={handleChange}
              className="inscripcion-select"
            >
              {opcionesPlantillaData?.opcionesPlantilla?.map((opcion, idx) => (
                <option key={idx} value={opcion}>
                  {opcion || '(Vacío)'}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="inscripcion-button-group">
          <button
            type="submit"
            className="inscripcion-btn inscripcion-btn-primary"
            disabled={loadingCrear}
          >
            {loadingCrear ? 'Creando...' : 'Crear Factura'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/facturas')}
            className="inscripcion-btn inscripcion-btn-secondary"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default InscripcionFactura;
