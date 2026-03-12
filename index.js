const express=require('express')
const app=express();
const dotenv=require('dotenv')
dotenv.config({path:'./config/.env'})
const connectDB=require('./config/db');
const morgan = require('morgan');
const cors=require('cors');
const router=require('./routes/employee');
connectDB()

app.use(express.json());
app.use(morgan('dev'))
app.use(cors())

app.use('/api/employee',router);


app.listen(process.env.PORT,()=>{
  try{
    console.log(`Server started at ${process.env.PORT}`)
  }
  catch(error){
    console.error("There is some error while starting the server")
  }
})