import React, { useState, useEffect } from 'react';
import { useMutation, useQuery, useLazyQuery } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom';
import {
  GET_FACTURA,
  ACTUALIZAR_FACTURA,
  GET_PERSONAS,
  GET_COMPANIAS,
  GET_OPCIONES_PLANTILLA,
  GET_OPCIONES_OBSERVACIONES,
  GET_PROVEEDOR,
  GET_FACTURAS
} from '../apollo/queries';
import './EditarFactura.css';

/**
 * EditarFactura Component
 * Formulario para editar facturas existentes en el sistema
 */
function EditarFactura() {
  const { id } = useParams();
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
    elaboroPlantilla: '',
    fechaRecepcionCausacion: '',
    recibidaPor: '',
    fechaRevisionCausacion: '',
    numeroCausacion: '',
    fechaCausacion: '',
    observaciones: ''
  });

  const [proveedorNombre, setProveedorNombre] = useState('');
  const [ciaNit, setCiaNit] = useState('');
  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });

  const { data: personasData } = useQuery(GET_PERSONAS);
  const { data: companiasData } = useQuery(GET_COMPANIAS);
  const { data: opcionesPlantillaData } = useQuery(GET_OPCIONES_PLANTILLA);
  const { data: opcionesObservacionesData } = useQuery(GET_OPCIONES_OBSERVACIONES);

  const { data: facturaData, loading: loadingFactura } = useQuery(GET_FACTURA, {
    variables: { id: parseInt(id) },
    onCompleted: (data) => {
      if (data?.factura) {
        const factura = data.factura;
        setFormData({
          numeroControl: factura.numeroControl || '',
          cia: factura.cia || '',
          nit: factura.nit || '',
          numeroFactura: factura.numeroFactura || '',
          fechaRadicado: factura.fechaRadicado ? factura.fechaRadicado.split('T')[0] : '',
          fechaFactura: factura.fechaFactura ? factura.fechaFactura.split('T')[0] : '',
          facturaCredito: factura.facturaCredito || false,
          acuseReciboSCI: factura.acuseReciboSCI || false,
          entregadaA: factura.entregadaA || '',
          fechaEntrega: factura.fechaEntrega ? factura.fechaEntrega.split('T')[0] : '',
          elaboroPlantilla: factura.elaboroPlantilla || '',
          fechaRecepcionCausacion: factura.fechaRecepcionCausacion ? factura.fechaRecepcionCausacion.split('T')[0] : '',
          recibidaPor: factura.recibidaPor || '',
          fechaRevisionCausacion: factura.fechaRevisionCausacion ? factura.fechaRevisionCausacion.split('T')[0] : '',
          numeroCausacion: factura.numeroCausacion || '',
          fechaCausacion: factura.fechaCausacion ? factura.fechaCausacion.split('T')[0] : '',
          observaciones: factura.observaciones || ''
        });
        setProveedorNombre(factura.proveedor);
        setCiaNit(factura.ciaNit);
      }
    }
  });

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

  const [actualizarFactura, { loading: loadingActualizar }] = useMutation(ACTUALIZAR_FACTURA, {
    refetchQueries: [{ query: GET_FACTURAS }, { query: GET_FACTURA, variables: { id: parseInt(id) } }],
    onCompleted: () => {
      setMensaje({ tipo: 'success', texto: 'Factura actualizada exitosamente' });
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
    if (formData.nit && formData.nit.length > 0 && formData.nit !== facturaData?.factura?.nit) {
      const timer = setTimeout(() => {
        buscarProveedor({ variables: { nit: formData.nit } });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [formData.nit, buscarProveedor, facturaData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje({ tipo: '', texto: '' });

    try {
      const input = {};

      Object.keys(formData).forEach(key => {
        if (formData[key] !== '' && formData[key] !== null && formData[key] !== undefined) {
          input[key] = formData[key];
        }
      });

      await actualizarFactura({
        variables: {
          id: parseInt(id),
          input
        }
      });
    } catch (error) {
      console.error('Error actualizando factura:', error);
    }
  };

  if (loadingFactura) return <div className="editar-loading">Cargando factura...</div>;

  return (
    <div className="editar-card">
      <h2 className="editar-title">Editar Factura #{id}</h2>

      {mensaje.texto && (
        <div className={`editar-alert editar-alert-${mensaje.tipo}`}>
          {mensaje.texto}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="editar-section">
          <h3 className="editar-section-title">Información Básica</h3>
          <div className="editar-form-grid">
            <div className="editar-form-group">
              <label className="editar-label editar-label-required">Nº. Control</label>
              <input
                type="text"
                name="numeroControl"
                value={formData.numeroControl}
                onChange={handleChange}
                className="editar-input"
                required
              />
            </div>

            <div className="editar-form-group">
              <label className="editar-label editar-label-required">Compañía</label>
              <select
                name="cia"
                value={formData.cia}
                onChange={handleChange}
                className="editar-select"
                required
              >
                <option value="">Seleccione una compañía</option>
                {companiasData?.companias?.map(cia => (
                  <option key={cia} value={cia}>{cia}</option>
                ))}
              </select>
            </div>

            <div className="editar-form-group">
              <label className="editar-label">Compañía + NIT</label>
              <input
                type="text"
                value={ciaNit}
                className="editar-input"
                disabled
              />
            </div>

            <div className="editar-form-group">
              <label className="editar-label editar-label-required">NIT</label>
              <input
                type="text"
                name="nit"
                value={formData.nit}
                onChange={handleChange}
                className="editar-input"
                required
              />
            </div>

            <div className="editar-form-group">
              <label className="editar-label">Proveedor</label>
              <input
                type="text"
                value={loadingProveedor ? 'Buscando...' : proveedorNombre}
                className="editar-input"
                disabled
              />
            </div>

            <div className="editar-form-group">
              <label className="editar-label editar-label-required">No. Factura</label>
              <input
                type="text"
                name="numeroFactura"
                value={formData.numeroFactura}
                onChange={handleChange}
                className="editar-input"
                required
              />
            </div>

            <div className="editar-form-group">
              <label className="editar-label editar-label-required">Fecha Radicado</label>
              <input
                type="date"
                name="fechaRadicado"
                value={formData.fechaRadicado}
                onChange={handleChange}
                className="editar-input"
                required
              />
            </div>

            <div className="editar-form-group">
              <label className="editar-label editar-label-required">Fecha Factura</label>
              <input
                type="date"
                name="fechaFactura"
                value={formData.fechaFactura}
                onChange={handleChange}
                className="editar-input"
                required
              />
            </div>

            <div className="editar-form-group">
              <label className="editar-label">
                <input
                  type="checkbox"
                  name="facturaCredito"
                  checked={formData.facturaCredito}
                  onChange={handleChange}
                  className="editar-checkbox"
                />
                Factura a Crédito
              </label>
            </div>

            <div className="editar-form-group">
              <label className="editar-label">
                <input
                  type="checkbox"
                  name="acuseReciboSCI"
                  checked={formData.acuseReciboSCI}
                  onChange={handleChange}
                  className="editar-checkbox"
                />
                Acuse Recibo SCI
              </label>
            </div>

            <div className="editar-form-group">
              <label className="editar-label">Entregada a</label>
              <select
                name="entregadaA"
                value={formData.entregadaA}
                onChange={handleChange}
                className="editar-select"
              >
                <option value="">Seleccione una persona</option>
                {personasData?.personas?.map(persona => (
                  <option key={persona.id} value={persona.nombre}>
                    {persona.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className="editar-form-group">
              <label className="editar-label">Fecha de Entrega</label>
              <input
                type="date"
                name="fechaEntrega"
                value={formData.fechaEntrega}
                onChange={handleChange}
                className="editar-input"
              />
            </div>

            <div className="editar-form-group">
              <label className="editar-label">Elaboró Plantilla</label>
              <select
                name="elaboroPlantilla"
                value={formData.elaboroPlantilla}
                onChange={handleChange}
                className="editar-select"
              >
                {opcionesPlantillaData?.opcionesPlantilla?.map((opcion, idx) => (
                  <option key={idx} value={opcion}>
                    {opcion || '(Vacío)'}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="editar-section">
          <h3 className="editar-section-title">Información de Causación</h3>
          <p className="editar-info-text" style={{ marginBottom: '1rem' }}>
            Estos campos se completan después de la creación inicial
          </p>
          <div className="editar-form-grid">
            <div className="editar-form-group">
              <label className="editar-label">Fecha Recepción Causación</label>
              <input
                type="date"
                name="fechaRecepcionCausacion"
                value={formData.fechaRecepcionCausacion}
                onChange={handleChange}
                className="editar-input"
              />
            </div>

            <div className="editar-form-group">
              <label className="editar-label">Recibida por</label>
              <select
                name="recibidaPor"
                value={formData.recibidaPor}
                onChange={handleChange}
                className="editar-select"
              >
                <option value="">Seleccione una persona</option>
                {personasData?.personas?.map(persona => (
                  <option key={persona.id} value={persona.nombre}>
                    {persona.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className="editar-form-group">
              <label className="editar-label">Fecha Revisión Causación</label>
              <input
                type="date"
                name="fechaRevisionCausacion"
                value={formData.fechaRevisionCausacion}
                onChange={handleChange}
                className="editar-input"
              />
            </div>

            <div className="editar-form-group">
              <label className="editar-label">No. Causación</label>
              <input
                type="text"
                name="numeroCausacion"
                value={formData.numeroCausacion}
                onChange={handleChange}
                className="editar-input"
              />
            </div>

            <div className="editar-form-group">
              <label className="editar-label">Fecha Causación</label>
              <input
                type="date"
                name="fechaCausacion"
                value={formData.fechaCausacion}
                onChange={handleChange}
                className="editar-input"
              />
            </div>

            <div className="editar-form-group">
              <label className="editar-label">Observaciones</label>
              <select
                name="observaciones"
                value={formData.observaciones}
                onChange={handleChange}
                className="editar-select"
              >
                <option value="">Seleccione una observación</option>
                {opcionesObservacionesData?.opcionesObservaciones?.map((obs, idx) => (
                  <option key={idx} value={obs}>
                    {obs}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="editar-button-group">
          <button
            type="submit"
            className="editar-btn editar-btn-success"
            disabled={loadingActualizar}
          >
            {loadingActualizar ? 'Guardando...' : 'Guardar Cambios'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/facturas')}
            className="editar-btn editar-btn-secondary"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditarFactura;
