const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  try {
    // 1. Create a Transporter
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      // 🔥 PORT 465 is the industry standard for secure SMTP on cloud servers
      port: 465, 
      secure: true, 
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS, // This MUST be a 16-digit App Password
      },
      tls: {
            // This helps bypass some restrictive cloud firewalls
            rejectUnauthorized: false 
        },
      // ✅ Add these to prevent the "Stuck" state if the network is slow
      connectionTimeout: 10000, // 10 seconds
      greetingTimeout: 10000,
    });

    // 2. Send the mail
    let info = await transporter.sendMail({
      from: '"StudyNotion | Dev" <' + process.env.MAIL_USER + '>', // Improved 'from' format
      to: `${email}`,
      subject: `${title}`,
      html: `${body}`,
    });

    console.log("Email info: ", info);
    return info;

  } catch (error) {
    // 🔥 If mail fails, we log it but DON'T let it crash the server
    console.error("Nodemailer Error: ", error.message);
    return { error: error.message }; 
  }
};

module.exports = mailSender;