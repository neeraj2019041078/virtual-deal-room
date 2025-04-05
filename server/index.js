require("dotenv").config();
const express=require("express");
const cors=require("cors");
const path=require("path");
const connectDb=require("./config/db");
const routes=require("./routes/authRoutes");
const dealroute=require("./routes/dealRoutes");

const app=express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use("/api/auth",routes);
app.use("/api/deals",dealroute);
connectDb();


const Port = process.env.PORT || 2000;


app.listen(Port,()=>{
    console.log(`Server listen at ${Port}`)
})