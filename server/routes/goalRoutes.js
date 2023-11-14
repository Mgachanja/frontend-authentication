const express=require('express')
const router=express.Router()
const {getGoals,setGoals,deleteGoals,updateGoals}=require('../controllers/goalControllers.js')


router.get('/' ,getGoals)

router.post('/' ,setGoals)

router.put('/:id' ,deleteGoals)

router.delete('/:id' ,updateGoals)


module.exports=router