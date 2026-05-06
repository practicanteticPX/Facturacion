import React, { useState, useEffect, useRef } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import {
  CREAR_FACTURA,
  GET_PERSONAS,
  GET_COMPANIAS,
  GET_PROVEEDOR
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

const LABELS_ERRORES = {
  cia: 'Cia',
  nit: 'NIT',
  numeroFactura: 'No. Factura',
  fechaRadicado: 'Fecha Radicado',
  fechaFactura: 'Fecha Factura',
  facturaCredito: 'Factura a Crédito',
  acuseReciboSCI: 'Acuse Recibo SCI',
  entregadaA: 'Entregada a',
  fechaEntrega: 'Fecha de Entrega',
  archivo: 'PDF de la factura'
};

const formatearMensajeError = (mensajeOriginal = '') => {
  if (!mensajeOriginal) {
    return 'Ocurrió un error al inscribir la factura';
  }

  const mensaje = mensajeOriginal.replace(/^Error:\s*/i, '').trim();

  const matchCampoObligatorio = mensaje.match(/^El campo ([A-Za-z0-9_]+) es (requerido|obligatorio)$/i);
  if (matchCampoObligatorio) {
    const campo = matchCampoObligatorio[1];
    return `El campo ${LABELS_ERRORES[campo] || campo} es obligatorio`;
  }

  return mensaje;
};

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
    fechaRadicado: obtenerFechaActual(),
    fechaFactura: '',
    facturaCredito: false,
    acuseReciboSCI: false,
    entregadaA: '',
    fechaEntrega: obtenerFechaActual()
  });

  const [proveedorNombre, setProveedorNombre] = useState('');
  const [ciaNit, setCiaNit] = useState('');
  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });
  const [mostrarSugerencias, setMostrarSugerencias] = useState(false);
  const [personasFiltradas, setPersonasFiltradas] = useState([]);
  const [personaActivaIndex, setPersonaActivaIndex] = useState(-1);
  const personaSuggestionRefs = useRef([]);
  const personaSuggestionsListRef = useRef(null);
  const [archivosAdjuntos, setArchivosAdjuntos] = useState([]);

  const { data: personasData } = useQuery(GET_PERSONAS);
  const { data: companiasData } = useQuery(GET_COMPANIAS);

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
    const booleanFields = ['facturaCredito', 'acuseReciboSCI'];
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
      setPersonaActivaIndex(filtradas.length > 0 ? 0 : -1);
    } else {
      setPersonasFiltradas([]);
      setMostrarSugerencias(false);
      setPersonaActivaIndex(-1);
    }
  };

  const seleccionarPersona = (nombre) => {
    setFormData(prev => ({ ...prev, entregadaA: nombre }));
    setMostrarSugerencias(false);
    setPersonasFiltradas([]);
    setPersonaActivaIndex(-1);
  };

  const scrollPersonaActiva = (index) => {
    const container = personaSuggestionsListRef.current;
    const activeItem = personaSuggestionRefs.current[index];

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

  const handleEntregadaAKeyDown = (e) => {
    if (!mostrarSugerencias || personasFiltradas.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (personaActivaIndex + 1) % personasFiltradas.length;
      setPersonaActivaIndex(nextIndex);
      setTimeout(() => scrollPersonaActiva(nextIndex), 0);
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const nextIndex = personaActivaIndex <= 0 ? personasFiltradas.length - 1 : personaActivaIndex - 1;
      setPersonaActivaIndex(nextIndex);
      setTimeout(() => scrollPersonaActiva(nextIndex), 0);
      return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      const personaSeleccionada = personasFiltradas[personaActivaIndex >= 0 ? personaActivaIndex : 0];
      if (personaSeleccionada) {
        seleccionarPersona(personaSeleccionada.nombre);
      }
      return;
    }

    if (e.key === 'Escape') {
      e.preventDefault();
      setMostrarSugerencias(false);
      setPersonaActivaIndex(-1);
    }
  };

  const handleFilesChange = (files) => {
    setArchivosAdjuntos(files);
    if (files.length > 0) {
      setMensaje(prev => (
        prev.tipo === 'error' && prev.texto.includes('PDF')
          ? { tipo: '', texto: '' }
          : prev
      ));
    }
    console.log('Archivos adjuntos:', files);
  };

  const limpiarFormulario = () => {
    setFormData({
      numeroControl: '',
      cia: '',
      nit: '',
      numeroFactura: '',
      fechaRadicado: obtenerFechaActual(),
      fechaFactura: '',
      facturaCredito: false,
      acuseReciboSCI: false,
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

    if (!archivosAdjuntos || archivosAdjuntos.length === 0) {
      setMensaje({ tipo: 'error', texto: 'Debe adjuntar el PDF de la factura para poder inscribirla' });
      return;
    }

    setLoadingCrear(true);

    try {
      const input = {
        numeroControl: parseInt(formData.numeroControl, 10),
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

      const variables = {
        input,
        archivo: archivosAdjuntos[0]
      };

      await executeMutationWithFile(CREAR_FACTURA, variables);

      setMensaje({ tipo: 'success', texto: 'Factura creada exitosamente' });
      setTimeout(() => {
        navigate('/facturas');
      }, 1500);
    } catch (error) {
      console.error('Error creando factura:', error);
      setMensaje({ tipo: 'error', texto: formatearMensajeError(error.message) });
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
        <div className="inscripcion-form-container">
          <div className="inscripcion-form-grid">
          {/* Fila 1 */}
          <div className="inscripcion-form-group">
            <label className="inscripcion-label inscripcion-label-required">No. de Control</label>
            <input
              type="number"
              name="numeroControl"
              value={formData.numeroControl}
              onChange={handleChange}
              className="inscripcion-input"
              min="1"
              step="1"
              required
            />
            <p className="inscripcion-info-text">Digita el consecutivo oficial del Excel</p>
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
              allowManualInput
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
              onKeyDown={handleEntregadaAKeyDown}
              onFocus={() => {
                if (formData.entregadaA && personasData?.personas) {
                  const filtradas = personasData.personas.filter(persona =>
                    buscarPorPalabras(persona.nombre, formData.entregadaA)
                  );
                  setPersonasFiltradas(filtradas);
      setMostrarSugerencias(filtradas.length > 0);
      setPersonaActivaIndex(filtradas.length > 0 ? 0 : -1);
                }
              }}
              onBlur={() => setTimeout(() => { setMostrarSugerencias(false); setPersonaActivaIndex(-1); }, 200)}
              className="inscripcion-input"
              placeholder="Escriba para buscar..."
              autoComplete="off"
            />
            {mostrarSugerencias && personasFiltradas.length > 0 && (
              <div className="inscripcion-suggestions" ref={personaSuggestionsListRef}>
                {personasFiltradas.map((persona, index) => (
                  <div
                    key={persona.id}
                    ref={(element) => { personaSuggestionRefs.current[index] = element; }}
                    onMouseEnter={() => setPersonaActivaIndex(index)}
                    onClick={() => seleccionarPersona(persona.nombre)}
                    className={`inscripcion-suggestion-item ${index === personaActivaIndex ? 'active' : ''}`}
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
            <label className="inscripcion-label inscripcion-label-required">Adjuntar Factura</label>
            <FileUpload
              onFilesChange={handleFilesChange}
              acceptedTypes=".pdf"
              maxSizeMB={10}
              multiple={false}
            />
          </div>
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




