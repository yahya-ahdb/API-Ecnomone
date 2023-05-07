const express = require('express')
const app = express();
const dotenv =require("dotenv")
const mongoose =require('mongoose')
dotenv.config()
const RouterUsers = require("./routes/user")
const RouterAuth = require("./routes/auth")
const RouterProduct = require("./routes/product")
const RouterCart = require("./routes/cart")
const RouterOrder = require("./routes/order")
const cookieParser = require('cookie-parser')
const cors = require('cors')

app.use(express.json())
app.use(cookieParser())
app.use(cors())
mongoose.connect(process.env.DataDB)
.then(()=>{
    console.log('DBdatabase connacted');
}).catch((err)=>{
    console.log("error in DB " +err);
});

app.use('/api/user', RouterUsers )
app.use('/api/auth', RouterAuth )
app.use('/api/product', RouterProduct )
app.use('/api/cart', RouterCart )
app.use('/api/order', RouterOrder )


app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      stack: err.stack,
    });
  });
  
app.listen(process.env.PORT || 8000 , (req,res)=>{
    console.log("Hello PORT="+process.env.PORT);
})
