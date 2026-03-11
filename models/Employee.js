const mongoose = require("mongoose");
const employeeSchema = mongoose.Schema({
  empId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  phone:{
    type:String,
    required:true
  },
  gender:{
    type:String,
    required:true
  },
  department:{
    type:String,
    required:true
  },
  designation:{
    type:String,
    required:true
  },
  salary:{
    type:Number,
    required:true
  },
  address:{
    type:String,
    required:true
  },
  joiningDate:{
    type:String,
    required:true
  }
});
const Employee=mongoose.model('Employee',employeeSchema);
module.exports=Employee;
