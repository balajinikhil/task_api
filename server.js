process.on('uncaughtException',(err)=>{
    console.log(err);
    process.exit(1);
})

// CONFIG FILE
const dotenv = require('dotenv');
dotenv.config({
    path:'./config.env'
});

// DB CONNECTION
const mongoose = require('mongoose');
const DB = process.env.DB;
mongoose.connect(DB, {
    useFindAndModify:false,
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true  
}).then(()=>console.log('DB connected')).catch((err)=>console.log(err,'DB Error'));

// SERVER SETUP
const app = require('./app');
const PORT = process.env.PORT || 7000;
const server = app.listen(PORT, ()=>{
    console.log(`server up and running ${PORT}`);
})

// UNHANDELED PROMISE
process.on('unhandledRejection', (err)=>{
    console.log(err);
    server.close(()=>process.exit(1));
})