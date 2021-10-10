require("dotenv").config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const userAuth = require("./routes/user.js");
const menuAuth = require("./routes/menu.js");
const adminAuth = require("./routes/admin");

//Datebase connection
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true , useUnifiedTopology: true}).then(() =>{
    console.log(`connection successful`)
}).catch((err) => console.log(err));


//MiddleWare
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());


app.use("/api",userAuth);
app.use("/menu" , menuAuth);
app.use('/admin' , adminAuth);

//EndPoints
app.get("/" , (req, res) =>{
    res.send("deployed")
})


app.listen(process.env.PORT || 8000, ()=>{
    console.log(`The application started successfully on port 8000`);
});
