import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./Database/config.js";
import studentMentorRouter from "./Routers/studentMentorRouter.js";



dotenv.config();

const app = express();

//middle ware
app.use(express.json());
app.use(cors());
app.use('/api',studentMentorRouter)
connectDB();
//routes
app.get("/", (req, res) => {
  res.status(200).send("API running Successfully");
});

app.listen(process.env.PORT, () => {
  console.log("App is running");
});