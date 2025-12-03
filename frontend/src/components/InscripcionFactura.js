import React, { useState, useEffect } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import {
  CREAR_FACTURA,
  GET_PERSONAS,
  GET_COMPANIAS,
  GET_PROVEEDOR,
  GET_FACTURAS,
  GET_PROXIMO_NUMERO_CONTROL
} from '../apollo/queries';
import { executeMutationWithFile } from '../apollo/client';
import FileUpload from './FileUpload';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './ui/select';
import { DatePicker } from './ui/DatePicker';
import { Button } from './ui/button';
import './InscripcionFactura.css';

/**
 * Helper para obtener la fecha actual en formato YYYY-MM-DD
 */
const obtenerFechaActual = () => {
  const hoy = new Date();
  const year = hoy.getFullYear();
  const month = String(hoy.getMonth() + 1).padStart(2, '0');
  const day = String(hoy.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

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
    fechaRadicado: obtenerFechaActual(),
    fechaFactura: '',
    facturaCredito: false,
    acuseReciboSCI: false,
    legalizaAnticipo: false,
    entregadaA: '',
    fechaEntrega: obtenerFechaActual()
  });

  const [proveedorNombre, setProveedorNombre] = useState('');
  const [ciaNit, setCiaNit] = useState('');
  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });
  const [mostrarSugerencias, setMostrarSugerencias] = useState(false);
  const [personasFiltradas, setPersonasFiltradas] = useState([]);
  const [archivosAdjuntos, setArchivosAdjuntos] = useState([]);

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

  const [loadingCrear, setLoadingCrear] = useState(false);

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

  const handleFilesChange = (files) => {
    setArchivosAdjuntos(files);
    console.log('Archivos adjuntos:', files);
  };

  const limpiarFormulario = () => {
    setFormData({
      cia: '',
      nit: '',
      numeroFactura: '',
      fechaRadicado: obtenerFechaActual(),
      fechaFactura: '',
      facturaCredito: false,
      acuseReciboSCI: false,
      legalizaAnticipo: false,
      entregadaA: '',
      fechaEntrega: obtenerFechaActual()
    });
    setProveedorNombre('');
    setCiaNit('');
    setMensaje({ tipo: '', texto: '' });
    setMostrarSugerencias(false);
    setPersonasFiltradas([]);
    setArchivosAdjuntos([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje({ tipo: '', texto: '' });
    setLoadingCrear(true);

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

      // Preparar variables con archivo si existe
      const variables = { input };
      if (archivosAdjuntos && archivosAdjuntos.length > 0) {
        variables.archivo = archivosAdjuntos[0];
      }

      await executeMutationWithFile(CREAR_FACTURA, variables);

      setMensaje({ tipo: 'success', texto: 'Factura creada exitosamente' });
      setTimeout(() => {
        navigate('/facturas');
      }, 1500);
    } catch (error) {
      console.error('Error creando factura:', error);
      setMensaje({ tipo: 'error', texto: error.message });
    } finally {
      setLoadingCrear(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.target.type !== 'submit') {
      e.preventDefault();
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

      <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} className="inscripcion-form">
        <div className="inscripcion-form-grid">
          {/* Fila 1 */}
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

          <div className="inscripcion-form-group inscripcion-form-group-span-2">
            <label className="inscripcion-label">Compañía + NIT</label>
            <input
              type="text"
              value={ciaNit}
              className="inscripcion-input"
              disabled
            />
            <p className="inscripcion-info-text">Se genera automáticamente</p>
          </div>

          {/* Fila 2 */}
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

          <div className="inscripcion-form-group inscripcion-form-group-span-2">
            <label className="inscripcion-label">Proveedor</label>
            <input
              type="text"
              value={loadingProveedor ? 'Buscando...' : proveedorNombre}
              className="inscripcion-input"
              disabled
            />
            <p className="inscripcion-info-text">Se busca automáticamente según el NIT</p>
          </div>

          {/* Fila 3 */}
          <div className="inscripcion-form-group">
            <DatePicker
              label="Fecha Radicado"
              name="fechaRadicado"
              value={formData.fechaRadicado}
              onChange={handleChange}
              required
              id="fechaRadicado"
              disabled={true}
            />
          </div>

          <div className="inscripcion-form-group">
            <DatePicker
              label="Fecha Factura"
              name="fechaFactura"
              value={formData.fechaFactura}
              onChange={handleChange}
              required
              id="fechaFactura"
            />
          </div>

          <div className="inscripcion-form-group">
            <DatePicker
              label="Fecha de Entrega"
              name="fechaEntrega"
              value={formData.fechaEntrega}
              onChange={handleChange}
              id="fechaEntrega"
              disabled={true}
            />
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

          {/* Fila 4 */}
          <div className="inscripcion-form-group">
            <label className="inscripcion-label">Factura a Crédito</label>
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

          <div className="inscripcion-form-group">
            <label className="inscripcion-label">Acuse Recibo SCI</label>
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

          <div className="inscripcion-form-group">
            <label className="inscripcion-label">¿Legaliza anticipo?</label>
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

          <div className="inscripcion-form-group">
            <label className="inscripcion-label">Adjuntar Factura</label>
            <FileUpload
              onFilesChange={handleFilesChange}
              acceptedTypes=".pdf"
              maxSizeMB={10}
              multiple={true}
            />
          </div>
        </div>

        <div className="inscripcion-button-group">
          <Button
            type="button"
            onClick={limpiarFormulario}
            variant="outline"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="default"
            disabled={loadingCrear}
          >
            {loadingCrear ? 'Creando...' : 'Crear Factura'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default InscripcionFactura;
