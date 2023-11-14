const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT||5000
const{errorHandler}=require("./middleware/errors.js")
const connectDB= require('./config/db.js')
const colors = require('colors')
const path =require('path')

connectDB()   

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/goals',require('./routes/goalRoutes.js'))

// Serve frontend
if (process.env.NODE_ENV ='production') {
    // Serve static files from the 'frontend/build' directory
    app.use(express.static(path.join(__dirname, '../client/build')));
  
    // For any other route, serve the 'index.html' file  
    app.get('*', (req, res) =>
      res.sendFile(
        path.resolve(__dirname, '../', 'client', 'build', 'index.html')
      )
    );
  } else {
    // If not in production, respond with a message
    app.get('/', (req, res) => res.send('Please set to production'));
  }
  

//app.use(errorHandler)

// listen for requests
app.listen(port, () => console.log(`Server started on ${port}`))