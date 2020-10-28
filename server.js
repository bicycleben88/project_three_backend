///////////////////////////
// Environmental Variables
///////////////////////////
require("dotenv").config();
const {
  PORT = 3500,
  NODE_ENV = "development",
  SECRET = "liquor",
} = process.env;

//CORS
const cors = require("cors");
const corsOptions = require("./configs/cors.js");

//Bring in express
const express = require("express");
const app = express();

//AUTH
const jwt = require("jsonwebtoken");
const { auth } = require("./configs/auth.js");

//OTHER IMPORTS
const morgan = require("morgan");

////////////
//MIDDLEWARE
////////////
NODE_ENV === "production" ? app.use(cors(corsOptions)) : app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(morgan("tiny")); //logging

////////////////////
//ROUTES AND ROUTERS
////////////////////
app.get("/", (req, res)=>{
   res.send("Hello")
})

// //These routes are to generate a test JWT and test out your auth function from auth.js
// app.get("/testauth", auth(SECRET), (req, res) => {
//     res.json(req.payload);
//   });
  
//   app.get("/testjwt", (req, res) => {
//     const token = jwt.sign({ hello: "world" }, SECRET);
//     res.json({ token });
//   });


//Server listening to PORT
app.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}`);
});
