const axios = require('axios');

const mailSender = async (email, title, body) => {
    try {
        console.log("hey:",process.env.BREVO_API_KEY);
        const response = await axios.post(
            'https://api.brevo.com/v3/smtp/email',
            {
                sender: { 
                    name: "StudyNotion", 
                    email: process.env.SENDER_EMAIL 
                },
                to: [{ email: email }],
                subject: title,
                htmlContent: body,
            },
            {
                headers: {
                    'api-key': process.env.BREVO_API_KEY, // Use 'api-key' header exactly
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        );
        
        

        console.log("Brevo API Success:", response.data.messageId);
        return response.data;

    } catch (error) {
        // This will print the EXACT error from Brevo's server
        console.error("--- BREVO ERROR ---");
        if (error.response) {
            console.error("Status:", error.response.status);
            console.error("Message:", error.response.data.message);
        } else {
            console.error("Error:", error.message);
        }
        return null;
    }
};

module.exports = mailSender;