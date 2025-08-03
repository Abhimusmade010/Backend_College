const nodemailer = require("nodemailer");

const getFormattedDateTime = () => {
  return new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "full",
    timeStyle: "short",
  });
};

const sendEmail = async ({ emailId, department, natureOfComplaint, roomNo }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS ,
      },
    });

    const submittedAt = getFormattedDateTime();
    const sheetLink = "https://docs.google.com/spreadsheets/d/10yFgXuLllF0xh9xIyhFmNNZ-px8XSj-mqDP2PoperWY/edit";
    
    

    await transporter.sendMail({
      from: `"Hardware Management System" <${process.env.EMAIL_USER || "abhishekmusmade342@gmail.com"}>`,
      to: process.env.ADMIN_EMAIL || "musmadesunanda6@gmail.com",
      subject: "Hardware Issue Reported - New Complaint",
      html: `
        <h2>New Complaint Reported</h2>
        <p><strong>Department:</strong> ${department}</p>
        <p><strong>Room No:</strong> ${roomNo}</p>
        <p><strong>Nature of Complaint:</strong> ${natureOfComplaint}</p>
        <p><strong>Submitted At:</strong> ${submittedAt}</p>
        <p><strong>View in Sheet:</strong> <a href="${sheetLink}">Complaint Sheet</a></p>
        <p><strong>Note:</strong> Please ensure to update the sheet with the status of this complaint.</p>
        <p>Thank you!</p>
        `
    });

    console.log("Email notification sent successfully");
    
  } catch (error) {
    console.error(" Email sending failed:", error);
    throw error;
  }
};

module.exports = { sendEmail };
