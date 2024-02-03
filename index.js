const express=require("express")
const app=express()
require("dotenv").config()
const userRoute=require("./routes/user")
const port=process.env.PORT

app.use(express.json());
app.use("/user",userRoute);

app.listen(port);