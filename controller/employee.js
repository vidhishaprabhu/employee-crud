const Employee = require("../models/Employee");
exports.createEmployee = async (req, res) => {
  try {
    const {
      empId,
      name,
      email,
      phone,
      gender,
      department,
      designation,
      salary,
      address,
      joiningDate,
    } = req.body;
    if (
      !empId ||
      !name ||
      !email ||
      !phone ||
      !gender ||
      !department ||
      !designation ||
      !salary ||
      !address ||
      !joiningDate
    ) {
      return res.status(400).json({ message: "All Fields are required" });
    } else {
      const existingEmp = await Employee.findOne({ email });
      if (existingEmp) {
        return res
          .status(400)
          .json({ message: `Employee with ${email} already exists` });
      }
      const employee = new Employee({
        empId,
        name,
        email,
        phone,
        gender,
        department,
        designation,
        salary,
        address,
        joiningDate,
      });
      await employee.save();
      return res
        .status(200)
        .json({ message: "Employee Created successfully", employee: employee });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.getEmployeeById = async (req, res) => {
  try {
    const id = req.params.id;
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    } else {
      return res
        .status(200)
        .json({
          message: `Employee with ${id} fetched successfully`,
          employee: employee,
        });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.getAllEmp = async (req, res) => {
  try {
    const employee = await Employee.find();
    return res
      .status(200)
      .json({
        message: "All Employee details fetched successfully",
        employee: employee,
      });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.updateEmp = async (req, res) => {
  try {
    const {
      empId,
      name,
      email,
      phone,
      gender,
      department,
      designation,
      salary,
      address,
      joiningDate,
    } = req.body;
    if (
      !empId ||
      !name ||
      !email ||
      !phone ||
      !gender ||
      !department ||
      !designation ||
      !salary ||
      !address ||
      !joiningDate
    ) {
      return res.status(400).json({ message: "All Fields are required" });
    } else {
      const employee = await Employee.findByIdAndUpdate(
        req.params.id,
        {empId,
        name,
        email,
        phone,
        gender,
        department,
        designation,
        salary,
        address,
        joiningDate},
        {new:true}
      );
      return res.status(200).json({message:'Employee updated successfully',employee:employee});
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.deleteEmp=async(req,res)=>{
  try{
    const id=req.params.id;
    const employee=await Employee.findByIdAndDelete(id);
    if(!employee){
      return res.status(404).json({message:'Employee not found'});
    }
    else{
      return res.status(200).json({message:'Employee deleted successfully'})
    }

  }
  catch(error){
    return res.status(500).json({ message: "Internal Server Error" });
  }
}