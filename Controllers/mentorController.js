import Mentor from "../Models/mentorSchema.js";

//create or add mentor
export const createMentor = async (req, res) => {
  try {
    const newMentor = new Mentor(req.body);
    const mentor_Email = req.body.mentor_Email
    const mentor = await Mentor.findOne({mentor_Email:mentor_Email})
    if(mentor)
      {
        return res.status(409).json({message:"Mentor already exists!"})
        
      }
    await newMentor.save();
    res
      .status(200)
      .json({ message: "Mentor added successfully", result: newMentor });
   
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error in create Mentor" });
  }
};

//get all mentor
export const getMentors = async (req, res) => {
  try {
    const mentors = await Mentor.find().populate("students");
    const mentorDetails = mentors.map(ele=>({
      _id:ele._id,
      Mentor_name:ele.mentor_Name,
      Mentor_Email:ele.mentor_Email,
      Assigned_students_List:ele.students 
    }))
    res.json({ message: "List of Mentors", result: [mentorDetails] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error in get Mentors" });
  }
};

//get mentor by id
export const getMentorById = async (req, res) => {
  try {
    const mentor_id = req.params.id;
    const mentor = await Mentor.findById(mentor_id).populate("students");

    res.status(200).json({ message: "Mentor details ", mentor });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal Server Error in get Mentor by id" });
  }
};

//modify mentor 
export const updateMentor = async(req,res)=>{
  try {
    const mentor_id = req.params.id
    const {mentor_name,mentor_email} = req.body

    const result = await Mentor.updateOne({_id:mentor_id},{mentor_name,mentor_email})

    if(result.matchedCount ===0 )
      {
        return res.status(404).json({message:"Mentor not found"})
      }

      const updatedMentor = await Mentor.find({_id:mentor_id})

      res.status(200).json({message:"Updated Mentor details ",result:updatedMentor})
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error in modify mentor" });
  }
}

export const deleteMentor = async(req,res)=>{
  try {
    const mentor_id = req.params.id

    const mentor = await Mentor.findOneAndDelete({_id:mentor_id})

    if(!mentor) {
      return res.status(404).json({message:"Mentor not found"})
    }
    res.status(200).json({message:"Mentor deleted Succesasfully"})
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error in delete mentor" });
  }
}