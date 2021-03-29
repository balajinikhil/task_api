const path = require("path")
const express = require('express');
const morgan = require('morgan');
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cookieSession = require('cookie-session');
const passport = require('passport');

const app = express();

// own modules 

const ApiRoutes = require('./routes/ApiRoutes');
const passportSetup = require('./utils/passport-setup');


app.use(cors());
app.options("*", cors());

// cookie session
app.use(cookieSession({
  maxAge:24 * 60 * 60 * 1000,
  keys:[process.env.COOKIE_KEY]
}))

// intialize passport
app.use(passport.initialize());
app.use(passport.session());

// Set security HTTP headers
app.use(helmet());

app.use(morgan("dev"));

//URL ENCODE DATA
app.use(
    express.urlencoded({
      extended: false,
    })
  );
app.use(express.json());
app.use(cookieParser());
  
// data-sanitization, code-injection
app.use(mongoSanitize());
app.use(xss());
  
// params pollution
app.use(
    hpp({
      whitelist: [
//  array of vals
      ],
    })
  );

//SERVING STATIC fILES
app.use(express.static(path.join(__dirname, "/public")))

// react app

//   api routes
app.use('/api-v1', ApiRoutes);

  
app.use((err,req,res,next)=>{
  console.log(err);
})

module.exports = app;