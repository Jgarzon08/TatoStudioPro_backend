import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const isMailerConfigured = Boolean(process.env.EMAIL_USER && process.env.EMAIL_PASS);

let transporter = null;

if (isMailerConfigured) {
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // Contraseña de aplicación de Gmail
    },
  });
  console.log('✔ Servicio de correo (Nodemailer) configurado para Gmail');
} else {
  console.log('ℹ EMAIL_USER o EMAIL_PASS no están configurados en .env; los correos se simularán en consola.');
}

/**
 * Envía una notificación por correo electrónico cuando un cliente llena el formulario de contacto.
 * Destinatario principal: carollmolina1993@gmail.com
 * Copia (CC): julian.garzon08@gmail.com
 */
export const sendContactNotification = async ({ fullName, email, phone, eventType, message }) => {
  const recipientTo = 'carollmolina1993@gmail.com';
  const recipientCc = 'julian.garzon08@gmail.com';

  const cleanPhone = phone ? phone.replace(/[^0-9]/g, '') : '';
  const waUrl = cleanPhone.length === 10 ? `https://wa.me/57${cleanPhone}` : `https://wa.me/${cleanPhone}`;

  const htmlContent = `
    <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #faf8f5; border: 1px solid #e2ded7; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #1a1918; color: #ffffff; padding: 24px; text-align: center;">
        <h2 style="margin: 0; font-size: 24px; letter-spacing: 1px; color: #d4af37;">TATO STUDIO</h2>
        <p style="margin: 6px 0 0; font-size: 14px; opacity: 0.85;">Nueva Consulta desde la Página Web</p>
      </div>

      <div style="padding: 28px 24px; color: #2d2b28; line-height: 1.6;">
        <p style="font-size: 16px; margin-top: 0;">¡Hola <strong>Caroll</strong>! Has recibido un nuevo mensaje a través de tu sitio web oficial:</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0; background-color: #ffffff; border-radius: 6px; border: 1px solid #eee;">
          <tr>
            <td style="padding: 12px 16px; font-weight: bold; border-bottom: 1px solid #f0ede8; width: 35%; color: #6b665f;">Nombre del cliente:</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid #f0ede8; font-weight: 600; color: #1a1918;">${fullName}</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; font-weight: bold; border-bottom: 1px solid #f0ede8; color: #6b665f;">Correo electrónico:</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid #f0ede8;">
              <a href="mailto:${email}" style="color: #b38b42; text-decoration: none; font-weight: 600;">${email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; font-weight: bold; border-bottom: 1px solid #f0ede8; color: #6b665f;">Teléfono / WhatsApp:</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid #f0ede8; font-weight: 600; color: #1a1918;">
              ${phone ? `<a href="${waUrl}" target="_blank" style="color: #128c7e; text-decoration: none; font-weight: bold;">💬 ${phone} (Abrir WhatsApp)</a>` : 'No proporcionado'}
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; font-weight: bold; border-bottom: 1px solid #f0ede8; color: #6b665f;">Tipo de servicio / evento:</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid #f0ede8; color: #1a1918; font-weight: 600;">${eventType}</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; font-weight: bold; color: #6b665f; vertical-align: top;">Mensaje:</td>
            <td style="padding: 12px 16px; color: #333333; white-space: pre-wrap;">${message}</td>
          </tr>
        </table>

        <div style="text-align: center; margin-top: 25px;">
          <a href="mailto:${email}" style="background-color: #1a1918; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 4px; font-weight: bold; display: inline-block;">
            Responder Directamente al Cliente
          </a>
        </div>
      </div>

      <div style="background-color: #f1eee9; padding: 16px; text-align: center; font-size: 12px; color: #7a756f; border-top: 1px solid #e5e1db;">
        Este correo fue generado automáticamente por el formulario de contacto de Tato Studio.<br>
        Copia de respaldo enviada a: ${recipientCc}
      </div>
    </div>
  `;

  if (transporter) {
    try {
      const info = await transporter.sendMail({
        from: `"Tato Studio Web" <${process.env.EMAIL_USER}>`,
        to: recipientTo,
        cc: recipientCc,
        subject: `Nuevo mensaje de contacto web: ${fullName} (${eventType})`,
        html: htmlContent,
      });
      console.log('✔ Notificación por correo enviada con éxito:', info.messageId);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('⚠ Error al enviar correo con Nodemailer:', error.message);
      return { success: false, error: error.message };
    }
  } else {
    console.log(`✉ [SIMULACIÓN CORREO]
      De: Notificaciones Web Tato Studio
      Para: ${recipientTo}
      CC: ${recipientCc}
      Asunto: Nuevo mensaje de contacto web: ${fullName} (${eventType})
      Cliente: ${fullName} (${email})
      Mensaje: ${message}
    `);
    return { success: true, simulated: true };
  }
};
