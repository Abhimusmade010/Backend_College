const { google } = require("googleapis");
const path = require("path");
const {v4:uuid} = require("uuid");

const auth = new google.auth.GoogleAuth({
  keyFile: path.join(__dirname, "credentials.json"),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const appendToSheet = async ({ complaintId,natureOfComplaint, department, roomNo,emailId}) => {
  try{const client = await auth.getClient();
  const sheets = google.sheets({ version: "v4", auth: client });
  

  const spreadsheetId = process.env.SPREADSHEET_ID || "10yFgXuLllF0xh9xIyhFmNNZ-px8XSj-mqDP2PoperWY";
  const range = "Sheet1!A:K"; // 11 columns
  // const complaintId= uuid(); // Generate a unique ID for the complaint

  // Append the complaint data to the Google Sheet
    
  const response = await sheets.spreadsheets.values.append({
    spreadsheetId,
    range,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[
        complaintId,                   // unique ID for the complaint
        natureOfComplaint,             // Nature of Complaint
        new Date().toLocaleString(),   // Complaint received on
        "",                            // Complaint attended on (admin fills)
        "",                            // Complaint resolved on (admin fills)
        "Pending",                     // Remark
        "",                            // Reason for Pendency
        department,                    // Department
        roomNo,
        emailId,                       // Room No
        ""                             //Name of Technician (admin fills)
      ]],
    },
  });
  return response.data;
}catch (error) {
    console.error(" Error appending to Google Sheet:", error);
    
    if (error.code === 403) {
      throw new Error("Access denied to Google Sheets. Check credentials and permissions.");
    }
    
    if (error.code === 404) {
      throw new Error("Google Sheet not found. Check spreadsheet ID.");
    }
    
    throw error;
  }
 
};

module.exports = { appendToSheet };
