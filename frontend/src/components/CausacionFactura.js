import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom';
import {
  GET_FACTURA,
  ACTUALIZAR_FACTURA,
  GET_PERSONAS,
  GET_OPCIONES_OBSERVACIONES,
  GET_FACTURAS
} from '../apollo/queries';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './ui/select';
import { DatePicker } from './ui/DatePicker';
import { Button } from './ui/button';
import { Label } from './ui/label';
import './CausacionFactura.css';

/**
 * Helper function para formatear fechas al formato YYYY-MM-DD
 */
const formatearFechaParaInput = (fecha) => {
  if (!fecha) return '';

  try {
    const fechaObj = new Date(fecha);
    if (isNaN(fechaObj.getTime())) return '';

    const year = fechaObj.getUTCFullYear();
    const month = String(fechaObj.getUTCMonth() + 1).padStart(2, '0');
    const day = String(fechaObj.getUTCDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  } catch (error) {
    console.error('Error formateando fecha:', fecha, error);
    return '';
  }
};

/**
 * CausacionFactura Component
 * Formulario para gestionar la información de causación de facturas
 */
function CausacionFactura() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fechaRecepcionCausacion: '',
    recibidaPor: '',
    fechaRevisionCausacion: '',
    numeroCausacion: '',
    fechaCausacion: '',
    observaciones: ''
  });

  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });

  const { data: personasData } = useQuery(GET_PERSONAS);
  const { data: opcionesObservacionesData } = useQuery(GET_OPCIONES_OBSERVACIONES);

  const { data: facturaData, loading: loadingFactura } = useQuery(GET_FACTURA, {
    variables: { numeroControl: parseInt(id) },
    onCompleted: (data) => {
      if (data?.factura) {
        const factura = data.factura;
        setFormData({
          fechaRecepcionCausacion: formatearFechaParaInput(factura.fechaRecepcionCausacion),
          recibidaPor: factura.recibidaPor || '',
          fechaRevisionCausacion: formatearFechaParaInput(factura.fechaRevisionCausacion),
          numeroCausacion: factura.numeroCausacion || '',
          fechaCausacion: formatearFechaParaInput(factura.fechaCausacion),
          observaciones: factura.observaciones || ''
        });
      }
    }
  });

  const [actualizarFactura, { loading: loadingActualizar }] = useMutation(ACTUALIZAR_FACTURA, {
    refetchQueries: [{ query: GET_FACTURAS }, { query: GET_FACTURA, variables: { numeroControl: parseInt(id) } }],
    onCompleted: () => {
      setMensaje({ tipo: 'success', texto: 'Causación actualizada exitosamente' });
      setTimeout(() => {
        navigate('/facturas');
      }, 1500);
    },
    onError: (error) => {
      setMensaje({ tipo: 'error', texto: error.message });
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
          numeroControl: parseInt(id),
          input
        }
      });
    } catch (error) {
      console.error('Error actualizando causación:', error);
    }
  };

  if (loadingFactura) return <div className="causacion-loading">Cargando información...</div>;

  return (
    <div className="causacion-card">
      <div className="causacion-header">
        <h2 className="causacion-title">Causación de Factura #{id}</h2>
        <p className="causacion-subtitle">
          {facturaData?.factura?.numeroFactura} - {facturaData?.factura?.proveedor}
        </p>
      </div>

      {mensaje.texto && (
        <div className={`causacion-alert causacion-alert-${mensaje.tipo}`}>
          {mensaje.texto}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="causacion-section">
          <h3 className="causacion-section-title">Información de Causación</h3>
          <div className="causacion-form-grid">
            <div className="causacion-form-group">
              <DatePicker
                label="Fecha Recepción Causación"
                name="fechaRecepcionCausacion"
                value={formData.fechaRecepcionCausacion}
                onChange={handleChange}
                id="fechaRecepcionCausacion"
              />
            </div>

            <div className="causacion-form-group">
              <Label>Recibida por</Label>
              <Select
                value={formData.recibidaPor}
                onValueChange={(value) => handleChange({ target: { name: 'recibidaPor', value } })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione una persona" />
                </SelectTrigger>
                <SelectContent>
                  {personasData?.personas?.map(persona => (
                    <SelectItem key={persona.id} value={persona.nombre}>
                      {persona.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="causacion-form-group">
              <DatePicker
                label="Fecha Revisión Causación"
                name="fechaRevisionCausacion"
                value={formData.fechaRevisionCausacion}
                onChange={handleChange}
                id="fechaRevisionCausacion"
              />
            </div>

            <div className="causacion-form-group">
              <Label>No. Causación</Label>
              <input
                type="text"
                name="numeroCausacion"
                value={formData.numeroCausacion}
                onChange={handleChange}
                className="causacion-input"
              />
            </div>

            <div className="causacion-form-group">
              <DatePicker
                label="Fecha Causación"
                name="fechaCausacion"
                value={formData.fechaCausacion}
                onChange={handleChange}
                id="fechaCausacion"
              />
            </div>

            <div className="causacion-form-group">
              <Label>Observaciones</Label>
              <Select
                value={formData.observaciones}
                onValueChange={(value) => handleChange({ target: { name: 'observaciones', value } })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione una observación" />
                </SelectTrigger>
                <SelectContent>
                  {opcionesObservacionesData?.opcionesObservaciones?.map((obs, idx) => (
                    <SelectItem key={idx} value={obs}>
                      {obs}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="causacion-button-group">
          <Button
            type="button"
            onClick={() => navigate('/facturas')}
            variant="outline"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="default"
            disabled={loadingActualizar}
          >
            {loadingActualizar ? 'Guardando...' : 'Guardar Causación'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CausacionFactura;
