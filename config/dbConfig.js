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
            ssl:true,
        })
       
    }catch (err)
    {
        console.log(err)
        throw err
    }
}

module.exports = connectDb