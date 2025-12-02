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
    // Validar tipo de archivo
    const fileExtension = file.name.split('.').pop().toLowerCase();
    if (acceptedTypes !== '*' && !file.type.includes('pdf') && fileExtension !== 'pdf') {
      return `Solo se permiten archivos PDF`;
    }

    // Validar tamaño
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

        <div className="file-upload-icon">📄</div>
        <div className="file-upload-text">
          <span className="file-upload-title">Adjuntar Factura</span>
          <span className="file-upload-subtitle">PDF (Máx. 10MB)</span>
        </div>
      </div>

      {error && (
        <div className="file-upload-error">
          <span>⚠️ {error}</span>
        </div>
      )}

      {files.length > 0 && (
        <div className="file-upload-list-wrapper">
          <h4 className="file-upload-list-title">Archivos ({files.length})</h4>
          <div className="file-upload-list">
            {files.map((file, index) => (
              <div key={index} className="file-upload-item">
                <div className="file-upload-item-info">
                  <span className="file-upload-item-name">{file.name}</span>
                  <span className="file-upload-item-size">{formatFileSize(file.size)}</span>
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
        </div>
      )}
    </div>
  );
}

export default FileUpload;
