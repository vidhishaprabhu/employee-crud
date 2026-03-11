const express=require('express');
const router=express.Router();
const {createEmployee,getEmployeeById,getAllEmp,updateEmp,deleteEmp}=require('../controller/employee');

router.post('/',createEmployee);
router.get('/:id',getEmployeeById);
router.get('/',getAllEmp)
router.put('/:id',updateEmp);
router.delete('/:id',deleteEmp);

module.exports=router