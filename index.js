const express = require("express");
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const userRoutes = require('./Routes/userRoute');
// const movieRoutes = require('./Routes/movieRoutes');
// const { authMiddleware } = require('./Middlewares/authMiddleware');
// const { verifyResetToken } = require('./Middlewares/verifyResetTokenMiddlware');



dotenv.config();
const port = process.env.PORT||4000;

const app = express();
app.use(express.json());

// Routes
app.use('/user', userRoutes);
// app.use('/movies', movieRoutes);
// Middleware: Authentication
// app.use(authMiddleware);
// app.use(verifyResetToken);






mongoose.connect('mongodb://127.0.0.1:27017/movie-store').then(function(){
    console.log("database already connected")
    app.listen (
        port, ()=>{
             console.log(`listening on port ${port}`)
         }
     )

}).catch(error=>{
    console.log("failed to connect", error)
})
    


