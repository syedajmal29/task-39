import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
  student_First_name: String,
  student_Last_name: String,
  student_Email: String,
  student_Batch_name: String,
  mentorDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Mentor",
  },
  previousMentor: 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mentor",
    },
  
});

const Student = mongoose.model("Student", studentSchema);

export default Student;