import { createTransporter, defaultFrom } from '../config/smtp.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const FIRMA_CID = 'firma@facturacion';

/**
 * Servicio para el envio de correos electronicos
 */
class EmailService {
  constructor() {
    this.transporter = createTransporter();
  }

  obtenerFirmaCorreo() {
    const candidatos = [
      {
        path: path.join(__dirname, '../assets/Juliet Acevedo Medina.png'),
        filename: 'Juliet Acevedo Medina.png',
        contentType: 'image/png'
      },
      {
        path: path.join(__dirname, '../../../frontend/src/assets/Juliet Acevedo Medina.png'),
        filename: 'Juliet Acevedo Medina.png',
        contentType: 'image/png'
      },
      {
        path: '/app/backend/src/assets/Juliet Acevedo Medina.png',
        filename: 'Juliet Acevedo Medina.png',
        contentType: 'image/png'
      }
    ];

    return candidatos.find((firma) => fs.existsSync(firma.path)) || null;
  }

  /**
   * Obtener saludo segun la hora de Bogota
   * @returns {string} - Saludo apropiado segun la hora
   */
  obtenerSaludoSegunHora() {
    const ahora = new Date();
    const opciones = { timeZone: 'America/Bogota', hour: 'numeric', hour12: false };
    const horaBogota = parseInt(new Intl.DateTimeFormat('es-CO', opciones).format(ahora), 10);

    if (horaBogota < 12) {
      return 'Buenos dias';
    } else if (horaBogota < 19) {
      return 'Buenas tardes';
    } else {
      return 'Buenas noches';
    }
  }

  /**
   * Enviar un correo electronico
   * @param {Object} options - Opciones del correo
   * @param {string|string[]} options.to - Destinatario(s)
   * @param {string} options.subject - Asunto del correo
   * @param {string} options.html - Contenido HTML del correo
   * @param {string} options.text - Contenido de texto plano (opcional)
   * @param {string} options.from - Remitente personalizado (opcional)
   * @param {Array} options.attachments - Archivos adjuntos (opcional)
   * @returns {Promise<Object>} - Informacion del correo enviado
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
      console.log('Correo enviado:', info.messageId);
      return {
        success: true,
        messageId: info.messageId,
        response: info.response
      };
    } catch (error) {
      console.error('Error al enviar correo:', error);
      throw new Error(`Error al enviar correo: ${error.message}`);
    }
  }

  /**
   * Enviar correo con adjunto de factura
   * @param {Object} options - Opciones del correo
   * @param {string} options.to - Destinatario
   * @param {string} options.numeroControl - Numero de control de la factura
   * @param {string} options.numeroFactura - Numero de factura
   * @param {string} options.proveedor - Nombre del proveedor
   * @param {Object} options.archivo - Archivo adjunto {filename, buffer, mimetype}
   * @returns {Promise<Object>} - Informacion del correo enviado
   */
  async enviarCorreoFactura({ to, numeroControl, numeroFactura, proveedor, archivo }) {
    try {
      const subject = `Factura - ${proveedor} - #${numeroFactura}`;
      const saludo = this.obtenerSaludoSegunHora();

      const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <p>${saludo},</p>

          <p>Adjunto factura de <strong>${proveedor}</strong> para su respectiva gestion.</p>

          <p style="margin-top: 30px;">Saludos,</p>

          <div style="margin-top: 20px;">
            <img src="cid:${FIRMA_CID}" alt="Firma" width="450" style="height: auto; display: block; border: 0;" />
          </div>
        </div>
      `;

      const text = `
        ${saludo},

        Adjunto factura de ${proveedor} para su respectiva gestion.

        Consecutivo: ${numeroControl}
        Numero Factura: ${numeroFactura}
        Proveedor: ${proveedor}

        Saludos,
      `;

      const attachments = [];

      if (archivo) {
        attachments.push({
          filename: archivo.filename,
          content: archivo.buffer,
          contentType: archivo.mimetype
        });
      }

      try {
        const firma = this.obtenerFirmaCorreo();

        if (!firma) {
          throw new Error('No se encontro la imagen de firma en ninguna ruta conocida');
        }

        console.log('Cargando firma desde:', firma.path);
        const firmaBuffer = fs.readFileSync(firma.path);

        attachments.push({
          filename: firma.filename,
          content: firmaBuffer,
          contentType: firma.contentType,
          cid: FIRMA_CID,
          contentDisposition: 'inline'
        });
      } catch (error) {
        console.warn('No se pudo cargar la imagen de firma:', error.message);
        console.warn('Intento buscar en las siguientes rutas:', {
          backendPng: path.join(__dirname, '../assets/Juliet Acevedo Medina.png'),
          desarrolloPng: path.join(__dirname, '../../../frontend/src/assets/Juliet Acevedo Medina.png'),
          dockerPng: '/app/backend/src/assets/Juliet Acevedo Medina.png'
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
      console.error('Error al enviar correo de factura:', error);
      throw error;
    }
  }

  /**
   * Enviar correos en lote
   * @param {Array<Object>} emails - Array de opciones de correo
   * @returns {Promise<Array>} - Resultados de los envios
   */
  async enviarCorreosEnLote(emails) {
    try {
      const resultados = await Promise.allSettled(
        emails.map((emailOptions) => this.enviarCorreo(emailOptions))
      );

      return resultados.map((resultado, index) => ({
        email: emails[index].to,
        success: resultado.status === 'fulfilled',
        data: resultado.status === 'fulfilled' ? resultado.value : null,
        error: resultado.status === 'rejected' ? resultado.reason.message : null
      }));
    } catch (error) {
      console.error('Error al enviar correos en lote:', error);
      throw error;
    }
  }

  /**
   * Verificar la conexion SMTP
   * @returns {Promise<boolean>}
   */
  async verificarConexion() {
    try {
      await this.transporter.verify();
      console.log('Conexion SMTP verificada correctamente');
      return true;
    } catch (error) {
      console.error('Error al verificar conexion SMTP:', error);
      return false;
    }
  }
}

export default new EmailService();
