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
   * @returns {Promise<Object>} - Información del correo enviado
   */
  async enviarCorreo({ to, subject, html, text, from }) {
    try {
      const mailOptions = {
        from: from || `"${defaultFrom.name}" <${defaultFrom.email}>`,
        to: Array.isArray(to) ? to.join(', ') : to,
        subject,
        html,
        text: text || undefined
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
