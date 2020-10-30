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
const userRouter = require('./controllers/user')
const jwt = require("jsonwebtoken");
const { auth } = require("./configs/auth.js");



//OTHER IMPORTS
const morgan = require("morgan");

//MONGO
const mongoose = require('./DB/connect');

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
//AUTH ROUTES
app.use('/auth', userRouter)
app.get("/testauth", auth(SECRET), (req, res) => { //tests the auth middleware
    res.json(req.payload);
  });
app.get("/testjwt", (req, res) => { //confirms that jwt was made
  const token = jwt.sign({ hello: "world" }, SECRET); 
  res.json({ token });
});

//RECIPE ROUTES
const recipeRouter = require('./controllers/recipe');
app.use('/recipe', recipeRouter);

//Server listening to PORT
app.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}`);
});
