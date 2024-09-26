import Student from "../Models/StudentSchema.js";
import Mentor from "../Models/mentorSchema.js";

//Assignment of students to a mentor
export const assignMentor = async (req, res) => {
  try {
    const mentorid = req.body.mentorId;
    
    const {studentIds} = req.body
    
    //removing the student Id if anu other mentor have same student id
    for(const studentId of studentIds){
      const existingMentor = await Mentor.findOne({students:studentId});

      if(existingMentor)
        {
          existingMentor.students=existingMentor.students.filter(ele=>ele.toString() !== studentId.toString())
          await existingMentor.save();
        }
    }

    //Finding particular mentor and updating the students
    const mentor = await Mentor.findById(mentorid)
   console.log(mentor);
    mentor.students.push(...studentIds);
    await mentor.save();

    if(!mentor)
      {
        res.status(200).json({message:"Mentor not found"})
      }
 
      //updatinf the mentor details in student coleection
      await Student.updateMany(
        {_id: {$in : studentIds}},
        {$set : {mentorDetails:mentorid}}
      ) 

      res.status(200).json({message:"Students assinged to mentor",result:mentor})
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error in assignMentor" });
  }
};

//changing mentor for a particular student
export const modifyMentor = async (req, res) => {
  try {
    const studentid = req.body.studentId;
    const student = await Student.findById(studentid);
    // console.log(student);

    //getting current mentor id from Mentor Collection
    const PreviousMentorId = student.mentorDetails;
    //console.log(PreviousMentorId);
    //getting new Mentor ID from req.body
    student.mentorDetails = req.body.newMentorId;

    //Assiging new field in Student collection as previous mentor i.e current mentor id before
    student.previousMentor = PreviousMentorId;

    //updating new mentor id in Student Collection
    student.save();
  //  console.log(PreviousMentorId);

    //change mentor's student list i.e removing the student from the previous mentor
    const previousMentor = await Mentor.findById(PreviousMentorId);
    console.log(previousMentor);
    if(previousMentor)
      {
        previousMentor.students=previousMentor.students.filter(ele=>ele.toString() !== studentid)
        await  previousMentor.save();
      }

    //add student in new mentor's student list
    let newMentor = await Mentor.findById(req.body.newMentorId);
    if (newMentor.students.length < 0) {
      return res.status(400).json({message:"bad req"});
    } 
    else {
      if (newMentor.students.includes(req.body.studentId)) {
       return res.status(409).json({message:"student already modified"})
      }
    }
    newMentor.students = [...newMentor.students, req.body.studentId];
    newMentor.save();
    res.status(200).json({ message: "Updated new mentor to student," });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error in modifyMentor" });
  }
};

export const PreviousMentor = async (req, res) => {
  try {
    const studentid = req.params.id;
    const student = await Student.findById(studentid);
    res
      .status(200)
      .json({ message: "Previous Assigned Mentor", result: student });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal Server Error in previousMentor" });
  }
};