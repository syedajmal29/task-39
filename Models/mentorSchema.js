import mongoose from "mongoose";

const mentorSchema = mongoose.Schema({
  mentor_Name: String,
  mentor_Email: String,
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
  
});

const Mentor = mongoose.model("Mentor", mentorSchema);

export default Mentor;