exports.passwordResetTemplate = (userName, resetLink) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reset Your Password</title>
      <style>
          body {
              background-color: #000814; /* richblack-900 */
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
              margin: 0;
              padding: 0;
              color: #AFB2BF; /* richblack-300 */
          }
          .wrapper {
              background-color: #000814;
              padding: 40px 15px;
          }
          .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #161D29; /* richblack-800 */
              border-radius: 16px;
              border: 1px solid #2C333F; /* richblack-700 */
              overflow: hidden;
              box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          }
          .header {
              padding: 40px 20px 20px;
              text-align: center;
          }
          .logo {
              max-width: 160px;
              margin-bottom: 20px;
          }
          .body {
              padding: 0 40px 40px;
              text-align: left;
          }
          .welcome-text {
              color: #F1F2FF; /* richblack-5 */
              font-size: 22px;
              font-weight: 600;
              margin-bottom: 10px;
          }
          .description {
              font-size: 16px;
              line-height: 1.6;
              color: #999DAA; /* richblack-400 */
              margin-bottom: 20px;
          }
          .btn-container {
              text-align: center;
              margin: 35px 0;
          }
          .reset-btn {
              background-color: #FFD60A; /* yellow-50 */
              color: #000814; /* richblack-900 */
              padding: 14px 30px;
              border-radius: 8px;
              text-decoration: none;
              font-weight: 700;
              font-size: 16px;
              display: inline-block;
              box-shadow: 0 4px 14px rgba(255, 214, 10, 0.3);
          }
          .warning {
              font-size: 13px;
              color: #6E727F; /* richblack-500 */
              background-color: #000814;
              padding: 15px;
              border-radius: 8px;
              border-left: 4px solid #EF4444; /* red for alert */
          }
          .footer {
              background-color: #161D29;
              text-align: center;
              padding: 25px;
              border-top: 1px solid #2C333F;
              font-size: 12px;
              color: #424854; /* richblack-600 */
          }
          .support-link {
              color: #47A5C5; /* blue-100 */
              text-decoration: none;
          }
      </style>
  </head>
  <body>
      <div class="wrapper">
          <div class="container">
              <div class="header">
                  <a href="https://studynotion-edtech-project.vercel.app">
                    <img class="logo" src="https://res.cloudinary.com/deujrq6nv/image/upload/v1752061751/DevFileUpload_1/1730230387401.jpg" alt="StudyNotion Logo">
                  </a>
              </div>
              <div class="body">
                  <h2 class="welcome-text">Password Reset Request</h2>
                  <p class="description">Hey <span style="color: #F1F2FF;">${userName}</span>,</p>
                  <p class="description">We received a request to reset your password. No changes have been made to your account yet.</p>
                  
                  <div class="btn-container">
                      <a href="${resetLink}" class="reset-btn">Reset My Password</a>
                  </div>

                  <p class="description">This link will expire in <span style="color: #FFD60A;">10 minutes</span>. If you did not initiate this request, please ignore this email or contact support if you have concerns.</p>
                  
                  <div class="warning">
                      <strong>Security Note:</strong> For your protection, never forward this email or share the reset link with anyone.
                  </div>
              </div>
              <div class="footer">
                  <p>Questions? We're here to help at <a href="mailto:support@studynotion.com" class="support-link">support@studynotion.com</a></p>
                  <p>© ${new Date().getFullYear()} StudyNotion EdTech. All rights reserved.</p>
              </div>
          </div>
      </div>
  </body>
  </html>
  `;
};