exports.passwordUpdated = (email, name) => {
    return `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Update Confirmation</title>
        <style>
            body {
                background-color: #000814; /* Deep Richblack to match StudyNotion */
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                font-size: 16px;
                line-height: 1.6;
                color: #AFB2BF; /* richblack-300 */
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
                background-color: #161D29; /* richblack-800 */
                border-radius: 12px;
                border: 1px solid #2C333F; /* richblack-700 */
                padding: 40px;
                text-align: center;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            }
    
            .logo {
                max-width: 180px;
                margin-bottom: 30px;
            }
    
            .icon-box {
                width: 60px;
                height: 60px;
                background-color: rgba(5, 163, 255, 0.1);
                border-radius: 50%;
                margin: 0 auto 20px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
    
            .message {
                font-size: 24px;
                font-weight: 700;
                color: #F1F2FF; /* richblack-5 */
                margin-bottom: 15px;
            }
    
            .body-text {
                font-size: 16px;
                color: #999DAA; /* richblack-400 */
                margin-bottom: 25px;
                text-align: left;
            }
    
            .highlight {
                color: #FFD60A; /* yellow-50 */
                font-weight: 600;
            }
    
            .cta-button {
                display: inline-block;
                padding: 12px 24px;
                background-color: #FFD60A; /* yellow-50 */
                color: #000814;
                text-decoration: none;
                border-radius: 8px;
                font-weight: 700;
                margin-top: 10px;
                margin-bottom: 30px;
            }
    
            .footer {
                font-size: 13px;
                color: #424854; /* richblack-600 */
                margin-top: 30px;
                border-top: 1px solid #2C333F;
                padding-top: 20px;
                line-height: 1.5;
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
                <a href="https://studynotion-edtech-project.vercel.app">
                    <img class="logo" src="https://res.cloudinary.com/deujrq6nv/image/upload/v1752061751/DevFileUpload_1/1730230387401.jpg" alt="StudyNotion Logo">
                </a>
                
                <div class="icon-box">
                    <span style="font-size: 30px;">🛡️</span>
                </div>

                <div class="message">Password Successfully Updated</div>
                
                <div class="body-text">
                    <p>Hey <span style="color: #F1F2FF;">${name}</span>,</p>
                    <p>This is a confirmation that your password for <span class="highlight">${email}</span> has been changed successfully.</p>
                    <p>If you made this change, you can safely ignore this email. However, if you <span style="color: #EF4444;">did not</span> authorize this, please secure your account immediately.</p>
                </div>

                <a href="https://studynotion-edtech-project.vercel.app/login" class="cta-button">Login to Dashboard</a>

                <div class="footer">
                    Questions? Email us at <a href="mailto:info@studynotion.com" class="support-link">info@studynotion.com</a><br>
                    © ${new Date().getFullYear()} StudyNotion. All rights reserved.
                </div>
            </div>
        </div>
    </body>
    
    </html>`;
};