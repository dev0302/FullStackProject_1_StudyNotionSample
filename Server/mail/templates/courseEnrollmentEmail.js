exports.courseEnrollmentEmail = (courseName, name) => {
  const clientUrl = process.env.CLIENT_URL || "https://full-stack-project-1-study-notion-s-nine.vercel.app";
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Course Enrollment</title>
  <style>
    body {
      background-color: #000814;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      margin: 0;
      padding: 0;
      color: #AFB2BF;
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
      overflow: hidden;
      text-align: center;
    }

    .header {
      padding: 40px 20px 20px;
    }

    .logo {
      max-width: 160px;
      margin-bottom: 20px;
    }

    .message {
      font-size: 26px;
      font-weight: 700;
      color: #F1F2FF;
      margin-bottom: 10px;
    }

    .body-content {
      padding: 0 40px 40px;
      text-align: left;
      font-size: 16px;
      line-height: 1.6;
    }

    .course-card {
      background-color: #000814;
      border-radius: 12px;
      padding: 20px;
      margin: 20px 0;
      border: 1px dashed #424854;
      text-align: center;
    }

    .cta-container {
      text-align: center;
      margin: 30px 0;
    }

    .cta-button {
      background-color: #2C333F;
      color: #000814;
      padding: 14px 30px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 700;
      font-size: 16px;
      display: inline-block;
    }

    .footer {
      padding: 25px;
      border-top: 1px solid #2C333F;
      font-size: 13px;
      color: #424854;
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
      <div class="header">
        <a href="${clientUrl}">
          <img class="logo" src="https://res.cloudinary.com/deujrq6nv/image/upload/v1767624352/IMG_20260105_201245_avuyxq.jpg" alt="StudyNotion Project Logo">
        </a>
      </div>

      <div class="message">You're Enrolled 🎉</div>

      <div class="body-content">
        <p>Hey <span style="color: #F1F2FF; font-weight: 600;">${name}</span>,</p>

        <p>
          Nice! You’ve successfully enrolled in a course on <strong>StudyNotion_Project_by_Dev</strong>.
          This platform is built as a learning/demo project, so feel free to explore everything at your own pace.
        </p>

        <div class="course-card">
          <p style="margin: 0; color: #999DAA; font-size: 14px;">YOU ENROLLED IN</p>
          <h3 style="margin: 5px 0; color: #FFD60A;">${courseName}</h3>
        </div>

        <p>
          You can now access the course content from your dashboard — videos, sections, and all the usual stuff.
          Click around, test features, and see how the flow works.
        </p>

        <div class="cta-container">
          <a href="${clientUrl}/dashboard/enrolled-courses" class="cta-button">
            Go to Dashboard
          </a>
        </div>

        <p style="font-size: 14px; color: #6E727F;">
          If something doesn’t load or behaves weirdly — that’s okay 😄  
          This is just a project built for learning and experimentation.
        </p>
      </div>

      <div class="footer">
        <p>
          Questions or feedback? Reach out at
          <a href="mailto:info@studynotion_project_by_dev.com" class="support-link">
            info@studynotion_project_by_dev.com
          </a>
        </p>
        <p>© ${new Date().getFullYear()} StudyNotion_Project_by_Dev — Demo & Learning Project</p>
      </div>
    </div>
  </div>
</body>
</html>`;
};
