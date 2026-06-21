const express  = require('express');
const bookRoute = require('./routes/book.routes');
const app = express();
require("dotenv").config();


const PORT = process.env.PORT || 3000;




app.use(express.json());

app.use(express.urlencoded({extended:true}))

app.use(express.static('public'));

app.use("/api/books",bookRoute);




app.listen(PORT,(err)=>{
    if(err){
        console.log(err);
    }
    console.log(`Server is running on http://localhost:${PORT}`);
})