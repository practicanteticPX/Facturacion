import { createTransporter, defaultFrom } from '../config/smtp.js';

/**
 * Servicio para el envío de correos electrónicos
 */
class EmailService {
  constructor() {
    this.transporter = createTransporter();
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
      const subject = `${numeroControl} - ${numeroFactura} - ${proveedor}`;

      const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #374050;">Nueva Factura Registrada</h2>
          <p>Se ha registrado una nueva factura con los siguientes datos:</p>
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr style="background-color: #f8f9fa;">
              <td style="padding: 10px; border: 1px solid #dee2e6; font-weight: bold;">Consecutivo:</td>
              <td style="padding: 10px; border: 1px solid #dee2e6;">${numeroControl}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #dee2e6; font-weight: bold;">No. Factura:</td>
              <td style="padding: 10px; border: 1px solid #dee2e6;">${numeroFactura}</td>
            </tr>
            <tr style="background-color: #f8f9fa;">
              <td style="padding: 10px; border: 1px solid #dee2e6; font-weight: bold;">Proveedor:</td>
              <td style="padding: 10px; border: 1px solid #dee2e6;">${proveedor}</td>
            </tr>
          </table>
          <p style="color: #6c757d; font-size: 14px;">
            El archivo de la factura se encuentra adjunto a este correo.
          </p>
        </div>
      `;

      const text = `
        Nueva Factura Registrada

        Consecutivo: ${numeroControl}
        No. Factura: ${numeroFactura}
        Proveedor: ${proveedor}

        El archivo de la factura se encuentra adjunto a este correo.
      `;

      const attachments = archivo ? [{
        filename: archivo.filename,
        content: archivo.buffer,
        contentType: archivo.mimetype
      }] : [];

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
