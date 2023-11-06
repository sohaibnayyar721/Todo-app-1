const express = require('express')
const router=express.Router()
const {getTask,addTask,deleteTask,updateTask,getOneTask,completeTask} = require('../Controller/task')

router.get('/',getTask)
router.get('/:getOneTask',getOneTask)
router.post('/addTask',addTask)
router.delete('/:deleteTask',deleteTask)
router.put('/:updateTask',updateTask)
router.put('/yellow',completeTask)
router.all('*',(req,res)=>{
    res.send("Cant find any route")
})



module.exports=router