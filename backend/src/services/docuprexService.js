class DocuprexService {
  constructor() {
    this.baseUrl = process.env.DOCUPREX_API_URL || 'http://localhost:5001';
    this.ingestToken = process.env.DOCUPREX_INGEST_TOKEN || '';
  }

  async enviarFacturaADocuprex({ factura, correoDestinatario, archivo }) {
    if (!archivo || !archivo.buffer) {
      throw new Error('No hay archivo PDF disponible para enviar a DocuPrex');
    }

    if (!correoDestinatario) {
      throw new Error('No se encontró correo destino para ingresar la factura en DocuPrex');
    }

    if (!this.ingestToken) {
      throw new Error('DOCUPREX_INGEST_TOKEN no está configurado');
    }

    const response = await fetch(`${this.baseUrl}/api/facturas/ingest-from-facturacion`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-docuprex-ingest-token': this.ingestToken
      },
      body: JSON.stringify({
        numeroControl: factura.numeroControl,
        cia: factura.cia,
        proveedor: factura.proveedor,
        numeroFactura: factura.numeroFactura,
        fechaFactura: factura.fechaFactura,
        fechaEntrega: factura.fechaEntrega,
        entregadaA: factura.entregadaA,
        entregadaAEmail: correoDestinatario,
        originalFileName: archivo.filename,
        mimeType: archivo.mimetype,
        pdfBase64: archivo.buffer.toString('base64')
      })
    });

    const payload = await response.json().catch(() => ({}));

    if (!response.ok || !payload.success) {
      throw new Error(payload.message || `Error HTTP ${response.status} enviando factura a DocuPrex`);
    }

    return payload;
  }
}

export default new DocuprexService();
