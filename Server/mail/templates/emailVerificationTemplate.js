const otpTemplate = (otp) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>OTP Verification</title>
  <style>
    body {
      background-color: #000814;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      font-size: 16px;
      line-height: 1.6;
      color: #AFB2BF;
      margin: 0;
      padding: 0;
    }

    .wrapper {
      padding: 40px 15px;
    }

    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #161D29;
      border-radius: 16px;
      border: 1px solid #2C333F;
      padding: 40px;
      text-align: center;
    }

    .logo {
      max-width: 160px;
      margin-bottom: 30px;
    }

    .message {
      font-size: 24px;
      font-weight: 700;
      color: #F1F2FF;
      margin-bottom: 15px;
    }

    .body-text {
      font-size: 16px;
      color: #999DAA;
      margin-bottom: 30px;
    }

    .otp-container {
      background-color: #000814;
      border: 2px solid #FFD60A;
      border-radius: 12px;
      padding: 20px;
      margin: 30px 0;
      display: inline-block;
    }

    .otp-code {
      font-size: 36px;
      font-weight: 800;
      letter-spacing: 10px;
      color: #FFD60A;
      margin: 0;
    }

    .validity-note {
      font-size: 14px;
      color: #6E727F;
      margin-top: 10px;
    }

    .support {
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
        <img class="logo" src="https://res.cloudinary.com/deujrq6nv/image/upload/StudyNotionMERNProject/devProfilePic.png" alt="StudyNotion Logo">
      </a>

      <div class="message">Quick Verification Needed 👋</div>

      <div class="body-text">
        <p>Hey there,</p>

        <p>
          Thanks for checking out this project! This site is built purely for learning and demo purposes,
          so feel free to explore, click around, and see how everything works.
        </p>

        <p>
          To continue logging in, just enter the OTP below:
        </p>

        <div class="otp-container">
          <h2 class="otp-code">${otp}</h2>
        </div>

        <p class="validity-note">
          This OTP is valid for <span style="color: #FFD60A; font-weight: 600;">5 minutes</span>.
          If it expires, you can always request a new one.
        </p>
      </div>

      <p style="font-size: 14px; color: #6E727F; text-align: left;">
        Didn’t try to log in? No worries — you can safely ignore this email.
      </p>

      <div class="support">
        Built as a learning project 🚀  
        <p>© ${new Date().getFullYear()} StudyNotion (Demo Project)</p>
      </div>
    </div>
  </div>
</body>
</html>`;
};

module.exports = otpTemplate;
