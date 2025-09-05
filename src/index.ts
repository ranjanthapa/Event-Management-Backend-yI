import express from "express";
import authRouter from "./routes/auth.route";


const app  = express();
app.use(express.json())
app.use('/api/auth', authRouter);

const PORT : number = 5000;
app.listen(PORT, ()=>{
    console.log(`server running on http://localhost:${PORT}`);
})


// create a event management in which the system will store its data in json 
// there will be 2 users organizer and user
// organizer will be able to create update delete and read the event that are posted by him
// event field will be title, description, totalNumber of participation, startDate and endDate.