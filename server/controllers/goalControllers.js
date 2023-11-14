const asyncHandler= require('express-async-handler')
const goal= require('../DBModel/goals.js')
/**
@desc GET goal
@route GET /api/goals
@access Private
 **/
const getGoals = asyncHandler(async (req,res)=>{
    const goals=await goal.find()
    res.status(200).json(goals)
})

/**
@desc POST goal
@route POST /api/goals
@access Private
 **/
const setGoals =asyncHandler(async (req,res)=>{
    if(!req.body.Text){
        res.status(400)
        throw new Error('please add a text field')
    }else
    {
    const goals= await goal.create({Text:req.body.Text})
    res.status(200).json(goals)
    }
})
/**
@desc PUT goal
@route PUT /api/goals/:id
@access Private
 **/
const updateGoals =asyncHandler(async (req,res)=>{
    const goals= await goal.findById(req.params.id)

    if(!goals){
        res.status(400)
        throw new error('goal unavailable')
    }

    const updatedGoal=await goal.findByIdAndUpdate(req.params.id,req.body,{new:true})



    res.status(200).json(updatedGoal)
})
/**
@desc DELETE goal
@route DELETE /api/goals/:id 
@access Private
 **/
const deleteGoals =asyncHandler(async(req,res)=>{

    const goals= await goal.findById(req.params.id)

    if(!goals){
        res.status(400)
        throw new error('goal unavailable')
    }

    await goals.remove()
    res.status(200).json({id:req.params.id})
})


module.exports={
    getGoals,setGoals,deleteGoals,updateGoals
}