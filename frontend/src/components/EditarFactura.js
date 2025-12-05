import React, { useState, useEffect } from 'react';
import { useMutation, useQuery, useLazyQuery } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom';
import {
  GET_FACTURA,
  ACTUALIZAR_FACTURA,
  GET_COMPANIAS,
  GET_PERSONAS,
  GET_PROVEEDOR,
  GET_FACTURAS
} from '../apollo/queries';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './ui/select';
import { DatePicker } from './ui/DatePicker';
import { Button } from './ui/button';
import './EditarFactura.css';

/**
 * Helper function para formatear fechas al formato YYYY-MM-DD
 * Maneja diferentes formatos de fecha que pueden venir del backend
 */
const formatearFechaParaInput = (fecha) => {
  if (!fecha) return '';

  try {
    // Crear objeto Date y validar
    const fechaObj = new Date(fecha);

    // Verificar si la fecha es válida
    if (isNaN(fechaObj.getTime())) {
      return '';
    }

    // Obtener componentes de la fecha en UTC para evitar problemas de timezone
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
    legalizaAnticipo: false,
    entregadaA: '',
    fechaEntrega: ''
  });

  const [proveedorNombre, setProveedorNombre] = useState('');
  const [ciaNit, setCiaNit] = useState('');
  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });

  const { data: companiasData } = useQuery(GET_COMPANIAS);
  const { data: personasData } = useQuery(GET_PERSONAS);

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
          fechaRadicado: formatearFechaParaInput(factura.fechaRadicado),
          fechaFactura: formatearFechaParaInput(factura.fechaFactura),
          facturaCredito: factura.facturaCredito || false,
          acuseReciboSCI: factura.acuseReciboSCI || false,
          legalizaAnticipo: factura.legalizaAnticipo || false,
          entregadaA: factura.entregadaA || '',
          fechaEntrega: formatearFechaParaInput(factura.fechaEntrega)
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
          <div className="editar-form-container">
            <div className="editar-form-grid">
            {/* Fila 1: No. de Control | Cia | Compañía + NIT | (vacío) */}
            <div className="editar-form-group">
              <label className="editar-label">No. de Control</label>
              <input
                type="text"
                name="numeroControl"
                value={formData.numeroControl}
                className="editar-input"
                disabled
              />
            </div>

            <div className="editar-form-group">
              <label className="editar-label editar-label-required">Cia</label>
              <Select
                value={formData.cia}
                onValueChange={(value) => handleChange({ target: { name: 'cia', value } })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione" />
                </SelectTrigger>
                <SelectContent>
                  {companiasData?.companias?.map(cia => (
                    <SelectItem key={cia} value={cia}>{cia}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="editar-form-group editar-form-group-span-2">
              <label className="editar-label">Compañía + NIT</label>
              <input
                type="text"
                value={ciaNit}
                className="editar-input"
                disabled
              />
            </div>

            {/* Fila 2: No. Factura | NIT | Proveedor */}
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

            <div className="editar-form-group editar-form-group-span-2">
              <label className="editar-label">Proveedor</label>
              <input
                type="text"
                value={loadingProveedor ? 'Buscando...' : proveedorNombre}
                className="editar-input"
                disabled
              />
            </div>

            {/* Fila 3: Fecha Radicado | Fecha Factura | Fecha de Entrega | Entregada a */}
            <div className="editar-form-group">
              <DatePicker
                label="Fecha Radicado"
                name="fechaRadicado"
                value={formData.fechaRadicado}
                onChange={handleChange}
                required
                id="fechaRadicado"
                disabled
              />
            </div>

            <div className="editar-form-group">
              <DatePicker
                label="Fecha Factura"
                name="fechaFactura"
                value={formData.fechaFactura}
                onChange={handleChange}
                required
                id="fechaFactura"
                disabled
              />
            </div>

            <div className="editar-form-group">
              <DatePicker
                label="Fecha de Entrega"
                name="fechaEntrega"
                value={formData.fechaEntrega}
                onChange={handleChange}
                id="fechaEntrega"
                disabled
              />
            </div>

            <div className="editar-form-group">
              <label className="editar-label">Entregada a</label>
              <Select
                value={formData.entregadaA}
                onValueChange={(value) => handleChange({ target: { name: 'entregadaA', value } })}
                disabled
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

            {/* Fila 4: Factura a Crédito | Acuse Recibo SCI | ¿Legaliza anticipo? | (vacío) */}
            <div className="editar-form-group">
              <label className="editar-label">Factura a Crédito</label>
              <Select
                value={formData.facturaCredito ? 'Si' : 'No'}
                onValueChange={(value) => handleChange({ target: { name: 'facturaCredito', value } })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="No">No</SelectItem>
                  <SelectItem value="Si">Si</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="editar-form-group">
              <label className="editar-label">Acuse Recibo SCI</label>
              <Select
                value={formData.acuseReciboSCI ? 'Si' : 'No'}
                onValueChange={(value) => handleChange({ target: { name: 'acuseReciboSCI', value } })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="No">No</SelectItem>
                  <SelectItem value="Si">Si</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="editar-form-group">
              <label className="editar-label">¿Legaliza anticipo?</label>
              <Select
                value={formData.legalizaAnticipo ? 'Si' : 'No'}
                onValueChange={(value) => handleChange({ target: { name: 'legalizaAnticipo', value } })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="No">No</SelectItem>
                  <SelectItem value="Si">Si</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="editar-form-group editar-empty"></div>
            </div>
          </div>
        </div>

        <div className="editar-button-group">
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
            {loadingActualizar ? 'Guardando...' : 'Guardar Cambios'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default EditarFactura;
