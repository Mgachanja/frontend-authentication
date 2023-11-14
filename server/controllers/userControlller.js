const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const asyncHandler=require('express-async-handler')
const user = require('../DBModel/user.js')

/**
 *      @description    Register new user
 *      @route          POST /api/user
 *      @access         Public
 */

const registerUser=asyncHandler(async(req,res)=>{
    const {name ,email , password}=req.body

    if(!name || !email || !password){
        res.status(400)
        throw new Error('please add all fields')
    }

    //check if user exists
    const userExists = await user.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error('user alrady exists')
    }

    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password ,salt)

    //create user
    const User = await user.create({
        name,
        email,
        password:hashedPassword
    })

    if(user){
        res.status(201).json({
            _id:User.id,
            name:User.name,
            email:User.email,
            token:generateToken(user._id)
        })
    }
    else{
        res.status(400)
        throw new Error('invalid user data')
    }
})
/**
* @desc    Authenticate a user
* @route   POST /api/users/login
* @access  Public
*/

const loginUser = asyncHandler(async(req,res)=>{
    const {email ,password} = req.body

    //check for user email
    const User = await user.findOne({email})

    if(user && (await bcrypt.compare(password,User.password))){
        res.json({
            _id:User.id,
            name:User.name,
            email:User.email,
            token:generateToken(User._id)
        })
    }
    else{
        res.status(400)
        throw new Error('invalid credentials')
    }
})

/**
 * @description     GET user data
 * @route           GET/api/users/me
 * @access          Private
 */

const getMe = asyncHandler(async(req,res)=>{
    res.status(200).json(req.User)
})

/** generate JWT */
const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'30d'
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe,
  }
