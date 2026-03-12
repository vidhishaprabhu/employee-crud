const express=require('express');
const router=express.Router();
const {createEmployee,getEmployeeById,getAllEmp,updateEmp,deleteEmp}=require('../controller/employee');
const {authenticateJwt}=require('../middleware/auth.middlware')
router.post('/',authenticateJwt,createEmployee);
router.get('/:id',authenticateJwt,getEmployeeById);
router.get('/',authenticateJwt,getAllEmp)
router.put('/:id',authenticateJwt,updateEmp);
router.delete('/:id',authenticateJwt,deleteEmp);

module.exports=router