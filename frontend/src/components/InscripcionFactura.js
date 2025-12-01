import React, { useState, useEffect } from 'react';
import { useMutation, useQuery, useLazyQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import {
  CREAR_FACTURA,
  GET_PERSONAS,
  GET_COMPANIAS,
  GET_PROVEEDOR,
  GET_FACTURAS,
  GET_PROXIMO_NUMERO_CONTROL
} from '../apollo/queries';
import './InscripcionFactura.css';

/**
 * InscripcionFactura Component
 * Formulario para crear nuevas facturas en el sistema
 */
function InscripcionFactura() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    cia: '',
    nit: '',
    numeroFactura: '',
    fechaRadicado: '',
    fechaFactura: '',
    facturaCredito: false,
    acuseReciboSCI: false,
    legalizaAnticipo: false,
    entregadaA: '',
    fechaEntrega: ''
  });

  const [proveedorNombre, setProveedorNombre] = useState('');
  const [ciaNit, setCiaNit] = useState('');
  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });
  const [mostrarSugerencias, setMostrarSugerencias] = useState(false);
  const [personasFiltradas, setPersonasFiltradas] = useState([]);

  const { data: personasData } = useQuery(GET_PERSONAS);
  const { data: companiasData } = useQuery(GET_COMPANIAS);
  const { data: numeroControlData } = useQuery(GET_PROXIMO_NUMERO_CONTROL);

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

    // Convertir valores Si/No a boolean para los campos específicos
    const booleanFields = ['facturaCredito', 'acuseReciboSCI', 'legalizaAnticipo'];
    let finalValue = value;

    if (booleanFields.includes(name)) {
      finalValue = value === 'Si';
    } else if (type === 'checkbox') {
      finalValue = checked;
    }

    setFormData(prev => ({
      ...prev,
      [name]: finalValue
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
        cia: formData.cia,
        nit: formData.nit,
        numeroFactura: formData.numeroFactura,
        fechaRadicado: formData.fechaRadicado,
        fechaFactura: formData.fechaFactura,
        facturaCredito: formData.facturaCredito,
        acuseReciboSCI: formData.acuseReciboSCI,
        legalizaAnticipo: formData.legalizaAnticipo,
      };

      if (formData.entregadaA) input.entregadaA = formData.entregadaA;
      if (formData.fechaEntrega) input.fechaEntrega = formData.fechaEntrega;

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
            <label className="inscripcion-label">No. de Control</label>
            <input
              type="text"
              value={numeroControlData?.proximoNumeroControl || 'Cargando...'}
              className="inscripcion-input"
              disabled
            />
            <p className="inscripcion-info-text">Se asigna automáticamente</p>
          </div>

          <div className="inscripcion-form-group">
            <label className="inscripcion-label inscripcion-label-required">Cia</label>
            <select
              name="cia"
              value={formData.cia}
              onChange={handleChange}
              className="inscripcion-select"
              required
            >
              <option value="">Seleccione</option>
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
            <label className="inscripcion-label">Factura a Crédito</label>
            <select
              name="facturaCredito"
              value={formData.facturaCredito ? 'Si' : 'No'}
              onChange={handleChange}
              className="inscripcion-select"
            >
              <option value="No">No</option>
              <option value="Si">Si</option>
            </select>
          </div>

          <div className="inscripcion-form-group">
            <label className="inscripcion-label">Acuse Recibo SCI</label>
            <select
              name="acuseReciboSCI"
              value={formData.acuseReciboSCI ? 'Si' : 'No'}
              onChange={handleChange}
              className="inscripcion-select"
            >
              <option value="No">No</option>
              <option value="Si">Si</option>
            </select>
            <p className="inscripcion-info-text">Aplica desde el 13 de julio de 2022</p>
          </div>

          <div className="inscripcion-form-group">
            <label className="inscripcion-label">¿Legaliza anticipo?</label>
            <select
              name="legalizaAnticipo"
              value={formData.legalizaAnticipo ? 'Si' : 'No'}
              onChange={handleChange}
              className="inscripcion-select"
            >
              <option value="No">No</option>
              <option value="Si">Si</option>
            </select>
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
