require('dotenv').config()
//?-----External Modules
const mongoose = require('mongoose')


//?-----Db Connection

async function connectDb (){
    try
    {

        return await mongoose.connect(process.env.DB_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
            socketTimeoutMS: 45000, 
            ssl:true,
        })
       
    }catch (err)
    {
        throw err
    }
}

module.exports = connectDb