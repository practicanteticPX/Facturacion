import React, { useState, useRef } from 'react';
import './FileUpload.css';

/**
 * FileUpload Component
 * Componente profesional de drag and drop para subir archivos
 */
function FileUpload({ onFilesChange, acceptedTypes = '*', maxSizeMB = 10, multiple = true }) {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  const validateFile = (file) => {
    if (file.size > maxSizeBytes) {
      return `El archivo ${file.name} excede el tamaño máximo de ${maxSizeMB}MB`;
    }
    return null;
  };

  const handleFiles = (newFiles) => {
    setError('');
    const fileArray = Array.from(newFiles);

    // Validar archivos
    for (const file of fileArray) {
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        return;
      }
    }

    // Agregar archivos
    const updatedFiles = multiple ? [...files, ...fileArray] : fileArray;
    setFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      handleFiles(droppedFiles);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleFileInput = (e) => {
    const selectedFiles = e.target.files;
    if (selectedFiles.length > 0) {
      handleFiles(selectedFiles);
    }
  };

  const removeFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    const iconMap = {
      pdf: '📄',
      doc: '📝',
      docx: '📝',
      xls: '📊',
      xlsx: '📊',
      jpg: '🖼️',
      jpeg: '🖼️',
      png: '🖼️',
      gif: '🖼️',
      zip: '🗜️',
      rar: '🗜️',
    };
    return iconMap[extension] || '📎';
  };

  return (
    <div className="file-upload-container">
      <div
        className={`file-upload-dropzone ${isDragging ? 'dragging' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileInput}
          accept={acceptedTypes}
          multiple={multiple}
          style={{ display: 'none' }}
        />

        <div className="file-upload-icon">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <path
              d="M32 12V40M32 12L22 22M32 12L42 22"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 40V48C12 50.2091 13.7909 52 16 52H48C50.2091 52 52 50.2091 52 48V40"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className="file-upload-text">
          <p className="file-upload-main-text">
            {isDragging ? 'Suelta los archivos aquí' : 'Adjuntar Factura'}
          </p>
          <p className="file-upload-sub-text">
            Arrastra archivos o haz clic (Máx. {maxSizeMB}MB)
          </p>
        </div>
      </div>

      {error && (
        <div className="file-upload-error">
          <span>⚠️ {error}</span>
        </div>
      )}

      {files.length > 0 && (
        <div className="file-upload-list">
          <h4 className="file-upload-list-title">Archivos seleccionados ({files.length})</h4>
          {files.map((file, index) => (
            <div key={index} className="file-upload-item">
              <div className="file-upload-item-info">
                <span className="file-upload-item-icon">{getFileIcon(file.name)}</span>
                <div className="file-upload-item-details">
                  <span className="file-upload-item-name">{file.name}</span>
                  <span className="file-upload-item-size">{formatFileSize(file.size)}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="file-upload-item-remove"
                title="Eliminar archivo"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FileUpload;
