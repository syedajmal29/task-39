import Student from "../Models/StudentSchema.js";

//Create or Add student
export const createStudent = async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res
      .status(200)
      .json({ message: "Student added successfully", result: newStudent });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server Error in createStudent" });
  }
};

//Get all students
export const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    
        const studentDetails = students.map((ele) => ({
          _id: ele._id,
          First_Name: ele.student_First_name,
          Last_Name: ele.student_Last_name,
          Email: ele.student_Email,
          Batch: ele.student_Batch_name,
          Assigned_mentor_Id: ele.mentorDetails,
          PreviousMentor: ele.previousMentor,
        }));
        return res
          .status(200)
          .json({ message: "List of students", result: [studentDetails] });
      
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server Error in getStudents" });
  }
};

//Get a single student by id
export const getStudent = async (req, res) => {
  try {
    const std_id = req.params.id;
    const student = await Student.findOne({ _id: std_id }).populate(
      "mentorDetails"
    );

    if (!student) {
      return res
        .status(404)
        .json({ message: "Student not found with ID", std_id });
    }
    res.status(200).json({ message: "Student details", result: student });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server Error in getStudent" });
  }
};

//edit or update a student by id
export const updateStudent = async (req, res) => {
  try {
    const std_id = req.params.id;
    const { student_First_name, student_Last_name, student_Email } = req.body;

    const result = await Student.updateOne(
      { _id: std_id },
      { student_First_name, student_Last_name, student_Email }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "No student Data Found" });
    }

    const updateStd = await Student.find({ _id: std_id });

    res.status(200).json({
      message: "Student Details edited successfully",
      result: updateStd,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server Error in updateStudent" });
  }
};

//delete student
export const deleteStudent = async (req, res) => {
  try {
    const std_id = req.params.id;
    const student = await Student.findOne({ _id: std_id });

    if (!student) {
      return res
        .status(404)
        .json({ message: "Student not found with ID", std_id });
    }

    const deleteStudent = await Student.deleteOne({ _id: std_id });

    res.status(200).json({ message: "Student deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server Error in deleteStudent" });
  }
};