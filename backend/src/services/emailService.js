import { createTransporter, defaultFrom } from '../config/smtp.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Servicio para el envío de correos electrónicos
 */
class EmailService {
  constructor() {
    this.transporter = createTransporter();
  }

  /**
   * Obtener saludo según la hora de Bogotá
   * @returns {string} - Saludo apropiado según la hora
   */
  obtenerSaludoSegunHora() {
    // Obtener hora de Bogotá (UTC-5)
    const ahora = new Date();
    const opciones = { timeZone: 'America/Bogota', hour: 'numeric', hour12: false };
    const horaBogota = parseInt(new Intl.DateTimeFormat('es-CO', opciones).format(ahora));

    if (horaBogota < 12) {
      return 'Buenos días';
    } else if (horaBogota < 19) {
      return 'Buenas tardes';
    } else {
      return 'Buenas noches';
    }
  }

  /**
   * Enviar un correo electrónico
   * @param {Object} options - Opciones del correo
   * @param {string|string[]} options.to - Destinatario(s)
   * @param {string} options.subject - Asunto del correo
   * @param {string} options.html - Contenido HTML del correo
   * @param {string} options.text - Contenido de texto plano (opcional)
   * @param {string} options.from - Remitente personalizado (opcional)
   * @param {Array} options.attachments - Archivos adjuntos (opcional)
   * @returns {Promise<Object>} - Información del correo enviado
   */
  async enviarCorreo({ to, subject, html, text, from, attachments }) {
    try {
      const mailOptions = {
        from: from || `"${defaultFrom.name}" <${defaultFrom.email}>`,
        to: Array.isArray(to) ? to.join(', ') : to,
        subject,
        html,
        text: text || undefined,
        attachments: attachments || []
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log('✓ Correo enviado:', info.messageId);
      return {
        success: true,
        messageId: info.messageId,
        response: info.response
      };
    } catch (error) {
      console.error('✗ Error al enviar correo:', error);
      throw new Error(`Error al enviar correo: ${error.message}`);
    }
  }

  /**
   * Enviar correo con adjunto de factura
   * @param {Object} options - Opciones del correo
   * @param {string} options.to - Destinatario
   * @param {string} options.numeroControl - Número de control de la factura
   * @param {string} options.numeroFactura - Número de factura
   * @param {string} options.proveedor - Nombre del proveedor
   * @param {Object} options.archivo - Archivo adjunto {filename, buffer, mimetype}
   * @returns {Promise<Object>} - Información del correo enviado
   */
  async enviarCorreoFactura({ to, numeroControl, numeroFactura, proveedor, archivo }) {
    try {
      // Asunto: Factura - Proveedor - #NumeroFactura
      const subject = `Factura - ${proveedor} - #${numeroFactura}`;

      // Obtener saludo según la hora
      const saludo = this.obtenerSaludoSegunHora();

      // Construir HTML con el nuevo formato
      const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <p>${saludo},</p>

          <p>Adjunto factura de <strong>${proveedor}</strong> para su respectiva gestión.</p>

          <p style="margin-top: 20px;">
            <strong>Consecutivo:</strong> ${numeroControl}<br>
            <strong>Número Factura:</strong> ${numeroFactura}<br>
            <strong>Proveedor:</strong> ${proveedor}
          </p>

          <p style="margin-top: 30px;">Saludos,</p>

          <div style="margin-top: 20px;">
            <img src="cid:firma" alt="Firma" width="450" style="height: auto; display: block;" />
          </div>
        </div>
      `;

      const text = `
        ${saludo},

        Adjunto factura de ${proveedor} para su respectiva gestión.

        Consecutivo: ${numeroControl}
        Número Factura: ${numeroFactura}
        Proveedor: ${proveedor}

        Saludos,
      `;

      // Preparar attachments
      const attachments = [];

      // Agregar archivo de factura si existe
      if (archivo) {
        attachments.push({
          filename: archivo.filename,
          content: archivo.buffer,
          contentType: archivo.mimetype
        });
      }

      // Agregar imagen de firma
      try {
        // Intentar rutas posibles según el entorno
        let firmaPath;

        // Ruta local en el backend (preferida)
        const rutaLocal = path.join(__dirname, '../assets/Juliet Acevedo.gif');

        // Ruta en desarrollo (desde backend hacia frontend)
        const rutaDesarrollo = path.join(__dirname, '../../../frontend/src/assets/Juliet Acevedo.gif');

        // Ruta en Docker
        const rutaDocker = '/app/backend/src/assets/Juliet Acevedo.gif';

        if (fs.existsSync(rutaLocal)) {
          firmaPath = rutaLocal;
        } else if (fs.existsSync(rutaDesarrollo)) {
          firmaPath = rutaDesarrollo;
        } else if (fs.existsSync(rutaDocker)) {
          firmaPath = rutaDocker;
        } else {
          throw new Error('No se encontró la imagen de firma en ninguna ruta conocida');
        }

        console.log('📎 Cargando firma desde:', firmaPath);
        const firmaBuffer = fs.readFileSync(firmaPath);
        attachments.push({
          filename: 'Juliet Acevedo.gif',
          content: firmaBuffer,
          contentType: 'image/gif',
          cid: 'firma' // Content ID para referenciar en el HTML
        });
      } catch (error) {
        console.warn('⚠ No se pudo cargar la imagen de firma:', error.message);
        console.warn('⚠ Intentó buscar en las siguientes rutas:', {
          local: path.join(__dirname, '../assets/Juliet Acevedo.gif'),
          desarrollo: path.join(__dirname, '../../../frontend/src/assets/Juliet Acevedo.gif'),
          docker: '/app/backend/src/assets/Juliet Acevedo.gif'
        });
      }

      return await this.enviarCorreo({
        to,
        subject,
        html,
        text,
        attachments
      });
    } catch (error) {
      console.error('✗ Error al enviar correo de factura:', error);
      throw error;
    }
  }

  /**
   * Enviar correos en lote
   * @param {Array<Object>} emails - Array de opciones de correo
   * @returns {Promise<Array>} - Resultados de los envíos
   */
  async enviarCorreosEnLote(emails) {
    try {
      const resultados = await Promise.allSettled(
        emails.map(emailOptions => this.enviarCorreo(emailOptions))
      );

      return resultados.map((resultado, index) => ({
        email: emails[index].to,
        success: resultado.status === 'fulfilled',
        data: resultado.status === 'fulfilled' ? resultado.value : null,
        error: resultado.status === 'rejected' ? resultado.reason.message : null
      }));
    } catch (error) {
      console.error('✗ Error al enviar correos en lote:', error);
      throw error;
    }
  }

  /**
   * Verificar la conexión SMTP
   * @returns {Promise<boolean>}
   */
  async verificarConexion() {
    try {
      await this.transporter.verify();
      console.log('✓ Conexión SMTP verificada correctamente');
      return true;
    } catch (error) {
      console.error('✗ Error al verificar conexión SMTP:', error);
      return false;
    }
  }
}

export default new EmailService();
