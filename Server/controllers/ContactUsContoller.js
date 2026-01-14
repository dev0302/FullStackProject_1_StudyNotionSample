// ContactUs Controller //(12/10/2025 (Day After Diwali))
// createContact //getAllContacts

const { contactUsEmail } = require("../mail/templates/contactFormRes");
const Contact = require("../models/ContactUs");
const mailSender = require("../utils/mailSender");

exports.createContact = async (req, res) => {
  console.log("insdieeee");
  console.log(req.body);
  
  
  try {
    const { firstName, lastName, email, phoneNumber, message } = req.body;
    console.log("Phone number: ", phoneNumber);
    console.log("first name", firstName);
    
    // ✅ 1. Validate input
    if (!firstName || !email || !phoneNumber || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // Optional: additional validation (email & phone regex)
    const emailRegex = /.+@.+\..+/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address.",
      });
    }
    
    

    const phoneRegex = /^\d{10,15}$/;
    if (!phoneRegex.test(phoneNumber)) {
      return res.status(400).json({
        success: false,
        message: "Invalid phone number. Must be 10-15 digits.",
      });
    }

    // ✅ 2. Save to database
    const contact = await Contact.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      message,
    });

    if(!contact){
      return res.status(201).json({
        success: false,
        message: "Error while creating record in db.",
      });
    }

    const emailRes = await mailSender(
      email,
      "Your Data send successfully",
      contactUsEmail(email, firstName, lastName, message, phoneNumber,)
    )

    // Response
    return res.status(201).json({
      success: true,
      message: "Message submitted successfully and Email send successfully",
      data: contact,
    });

  } catch (error) {
    console.error("Error creating contact message:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while submitting message.",
    });
  }
};



exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 }); // latest first

    return res.status(200).json({
      success: true,
      message: "All contact messages fetched successfully.",
      data: contacts,
    });
  } catch (error) {
    console.error("Error fetching contact messages:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while fetching messages.",
    });
  }
};



exports.getContactById = async (req, res) => {
  try {
    const { contactId } = req.params;

    if (!contactId) {
      return res.status(400).json({
        success: false,
        message: "Contact ID is required.",
      });
    }

    const contact = await Contact.findById(contactId);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact message not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Contact message fetched successfully.",
      data: contact,
    });
  } catch (error) {
    console.error("Error fetching contact message:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while fetching message.",
    });
  }
};


