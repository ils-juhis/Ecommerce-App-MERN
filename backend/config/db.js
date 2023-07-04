const mongoose = require('mongoose');

const connectToMongo = ()=>{
    mongoose.connect(process.env.DB_URI, {
        
        useNewUrlParser: true
    }).then(()=>{
        console.log("DB connected!")
    });

}

module.exports = connectToMongo;