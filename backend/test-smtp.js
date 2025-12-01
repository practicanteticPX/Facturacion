import dotenv from 'dotenv';
import emailService from './src/services/emailService.js';

dotenv.config();

/**
 * Script de prueba para verificar la conexión SMTP
 * Ejecutar con: node test-smtp.js
 */
async function testSMTP() {
  console.log('=== Prueba de Conexión SMTP ===\n');

  // 1. Verificar conexión
  console.log('1. Verificando conexión SMTP...');
  const isConnected = await emailService.verificarConexion();

  if (!isConnected) {
    console.error('❌ No se pudo verificar la conexión SMTP');
    console.log('\nRevisa la configuración en el archivo .env:');
    console.log('- SMTP_HOST:', process.env.SMTP_HOST);
    console.log('- SMTP_PORT:', process.env.SMTP_PORT);
    console.log('- SMTP_USER:', process.env.SMTP_USER);
    console.log('- SMTP_SECURE:', process.env.SMTP_SECURE);
    process.exit(1);
  }

  console.log('✅ Conexión SMTP verificada correctamente\n');

  // 2. Enviar correo de prueba
  console.log('2. Enviando correo de prueba...');
  try {
    const resultado = await emailService.enviarCorreo({
      to: 'e.zuluaga@prexxa.com.co',
      subject: 'Prueba de Conexión SMTP - Sistema Recepción Facturación',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #364156;">Prueba de Conexión SMTP</h2>
          <p>Este es un correo de prueba para verificar la configuración SMTP del sistema de Recepción Facturación.</p>
          <hr style="border: 1px solid #e0e0e0; margin: 20px 0;">
          <p><strong>Fecha y hora:</strong> ${new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' })}</p>
          <p><strong>Servidor SMTP:</strong> ${process.env.SMTP_HOST}</p>
          <p><strong>Puerto:</strong> ${process.env.SMTP_PORT}</p>
          <p><strong>Remitente:</strong> ${process.env.SMTP_FROM_NAME} &lt;${process.env.SMTP_FROM_EMAIL}&gt;</p>
          <hr style="border: 1px solid #e0e0e0; margin: 20px 0;">
          <p style="color: #28a745; font-weight: bold;">✓ La configuración SMTP está funcionando correctamente</p>
          <p style="color: #666; font-size: 12px; margin-top: 30px;">
            Este es un correo automático generado por el sistema de Recepción Facturación de Prexxa.
          </p>
        </div>
      `,
      text: `Prueba de Conexión SMTP

Este es un correo de prueba para verificar la configuración SMTP del sistema de Recepción Facturación.

Fecha y hora: ${new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' })}
Servidor SMTP: ${process.env.SMTP_HOST}
Puerto: ${process.env.SMTP_PORT}
Remitente: ${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>

✓ La configuración SMTP está funcionando correctamente

Este es un correo automático generado por el sistema de Recepción Facturación de Prexxa.`
    });

    console.log('✅ Correo enviado correctamente');
    console.log('   Message ID:', resultado.messageId);
    console.log('   Destinatario:', 'e.zuluaga@prexxa.com.co');
  } catch (error) {
    console.error('❌ Error al enviar correo:', error.message);
  }

  console.log('\n=== Prueba completada ===');
  process.exit(0);
}

testSMTP();
