import express from "express";
import { createStudent, deleteStudent, getStudent, getStudents, updateStudent } from "../Controllers/studentController.js";
import { createMentor, deleteMentor, getMentorById, getMentors, updateMentor } from "../Controllers/mentorController.js";
import { PreviousMentor, assignMentor, modifyMentor } from "../Controllers/assingmentController.js";

const router = express.Router();

//Student Routing
router.post("/createStudent",createStudent);
router.get("/getStudents",getStudents);
router.get("/getStudent/:id",getStudent);
router.put('/updateStudent/:id',updateStudent)
router.delete("/deleteStudent/:id",deleteStudent);

//Mentor Routing
router.post('/createMentor',createMentor)
router.get('/getMentors',getMentors)
router.get('/getMentorById/:id',getMentorById)
router.put('/updateMentor/:id',updateMentor)
router.delete('/deleteMentor/:id',deleteMentor)
//Assinging Mentor and retrieve previous mentor
router.get('/getPreviousMentor/:id',PreviousMentor)
router.put('/modifyMentor',modifyMentor)
router.put('/assignMentor',assignMentor)

export default router;