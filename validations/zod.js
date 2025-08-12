const {z}= require('zod');

const  complaintSchema = z.object({
  natureOfComplaint: z.string().min(1, "Nature of Complaint is required"),
    department: z.string().min(1, "Department is required"),
    roomNo: z.string().min(1, "Room No is required"),
    emailId: z.string().email("Invalid email address").min(1, "Email ID is required"),
});

module.exports = complaintSchema;
