exports.contactUsEmail = (
  email,
  firstname,
  lastname,
  message,
  phoneNo
) => {
  return `<!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8">
      <title>Contact Form Confirmation</title>
      <style>
          body {
              background-color: #000814;
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
              font-size: 16px;
              line-height: 1.6;
              color: #AFB2BF;
              margin: 0;
              padding: 0;
          }

          .wrapper {
              background-color: #000814;
              padding: 40px 10px;
          }

          .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #161D29;
              border-radius: 12px;
              border: 1px solid #2C333F;
              padding: 40px;
              box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          }

          .logo {
              max-width: 160px;
              display: block;
              margin: 0 auto 30px;
          }

          .header-text {
              font-size: 24px;
              font-weight: 700;
              color: #F1F2FF;
              text-align: center;
              margin-bottom: 20px;
          }

          .greeting {
              font-size: 18px;
              color: #F1F2FF;
              margin-bottom: 15px;
          }

          .data-card {
              background-color: #000814;
              border-radius: 8px;
              padding: 20px;
              margin: 25px 0;
              border: 1px solid #2C333F;
          }

          .data-item {
              margin-bottom: 15px;
          }

          .label {
              color: #FFD60A;
              font-weight: 600;
              text-transform: uppercase;
              font-size: 12px;
              display: block;
              margin-bottom: 2px;
          }

          .value {
              color: #F1F2FF;
              font-size: 15px;
              display: block;
          }

          .footer {
              text-align: center;
              font-size: 13px;
              color: #424854;
              margin-top: 30px;
              border-top: 1px solid #2C333F;
              padding-top: 20px;
          }

          .support-link {
              color: #47A5C5;
              text-decoration: none;
          }
      </style>
  </head>
  <body>
      <div class="wrapper">
          <div class="container">
              <a href="https://studynotion-edtech-project.vercel.app">
                  <img class="logo" src="https://i.ibb.co/7Xyj3PC/logo.png" alt="StudyNotion Logo">
              </a>
              
              <div class="header-text">Inquiry Received</div>
              
              <div class="greeting">Hello ${firstname} ${lastname},</div>
              
              <p>Thank you for reaching out to us. We have successfully received your message and our team will get back to you within 24 hours.</p>
              
              <div class="data-card">
                  <div class="data-item">
                      <span class="label">Full Name</span>
                      <span class="value">${firstname} ${lastname}</span>
                  </div>
                  <div class="data-item">
                      <span class="label">Email</span>
                      <span class="value">${email}</span>
                  </div>
                  <div class="data-item">
                      <span class="label">Phone Number</span>
                      <span class="value">${phoneNo || "N/A"}</span>
                  </div>
                  <div class="data-item" style="margin-bottom: 0;">
                      <span class="label">Your Message</span>
                      <span class="value" style="line-height: 1.4;">${message}</span>
                  </div>
              </div>

              <p>We appreciate your patience. While you wait, you can explore our latest courses on your dashboard.</p>

              <div class="footer">
                  If you have any further questions, reach out to us at 
                  <a href="mailto:info@studynotion.com" class="support-link">info@studynotion.com</a>
                  <p>© ${new Date().getFullYear()} StudyNotion. All rights reserved.</p>
              </div>
          </div>
      </div>
  </body>
  </html>`;
};