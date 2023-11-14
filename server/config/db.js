const mongoose=require('mongoose')

async function connectDB(){
    try{
        const conn=await mongoose.connect(process.env.MONGODB_URI)
        console.log(`mongo db connected :${conn.connection.host}`.cyan.underline)
    }
    catch(error){
        console.log(error)
        process.exit(1)
    }
}

module.exports= connectDB