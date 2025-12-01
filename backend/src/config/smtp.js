import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Configuración del transporter de Nodemailer para SMTP
 */
export const smtpConfig = {
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
};

/**
 * Información del remitente predeterminado
 */
export const defaultFrom = {
  name: process.env.SMTP_FROM_NAME,
  email: process.env.SMTP_FROM_EMAIL
};

/**
 * Crear instancia del transporter
 */
export const createTransporter = () => {
  return nodemailer.createTransport(smtpConfig);
};

/**
 * Verificar conexión SMTP
 */
export const verifyConnection = async () => {
  const transporter = createTransporter();
  try {
    await transporter.verify();
    console.log('✓ Conexión SMTP verificada correctamente');
    return true;
  } catch (error) {
    console.error('✗ Error al verificar conexión SMTP:', error);
    return false;
  }
};
