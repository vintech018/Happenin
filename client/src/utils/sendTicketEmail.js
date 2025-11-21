import emailjs from 'emailjs-com';
import QRCode from 'qrcode';

/**
 * Generate a QR code (base64 image)
 */
async function generateQRCode(data) {
  try {
    return await QRCode.toDataURL(data, {
      width: 300,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    });
  } catch (error) {
    console.error('QR Code Generation FAILED:', error);
    throw error;
  }
}

/**
 * Send Booking Ticket Email using EmailJS
 */
export async function sendTicketEmail(formData) {
  try {
    // 1. Generate ticket ID if missing
    const ticketId = formData.ticketId || crypto.randomUUID();

    // 2. Format seats (string or array)
    const seatsString = Array.isArray(formData.seats)
      ? formData.seats.join(', ')
      : formData.seats || 'N/A';

    // 3. QR Code data (encoded ticket info)
    const qrPayload = `
      Movie: ${formData.movie}
      Date: ${formData.date}
      Time: ${formData.time}
      Seats: ${seatsString}
      Ticket ID: ${ticketId}
      Email: ${formData.email}
    `;

    console.log('Generating QR Code...');
    const qrImage = await generateQRCode(qrPayload);
    console.log(`QR Code generated (${qrImage.length} chars)`);

    // 4. Template params for EmailJS
    const templateParams = {
      email: formData.email, // <-- MUST MATCH EmailJS: {{email}}
      movie: formData.movie,
      date: formData.date,
      time: formData.time,
      seats: seatsString,
      ticketId: ticketId,
      qr_code: qrImage
    };

    // 5. Read env variables
    const serviceID = import.meta.env.VITE_EMAILJS_SERVICE;
    const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC;

    if (!serviceID || !templateID || !publicKey) {
      throw new Error(
        '❌ Missing EmailJS credentials. Check your .env file: VITE_EMAILJS_*'
      );
    }

    console.log('Sending Email via EmailJS...');
    const response = await emailjs.send(
      serviceID,
      templateID,
      templateParams,
      publicKey
    );

    console.log('✅ Email sent successfully!', response);
    return response;

  } catch (error) {
    console.error('❌ ERROR: Failed to send email', error);
    throw error;
  }
}







