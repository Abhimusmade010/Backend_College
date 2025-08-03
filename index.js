const express = require("express");
const dotenv = require("dotenv");
const session=require("express-session");
const rateLimit = require("express-rate-limit");
const path = require("path");
const userRouter = require("./routes/userRoutes");
const adminRouter = require("./routes/adminRoutes"); // Create this file for admin routes

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(session({
  secret:process.env.SESSION_SECRET || "mycustomsessionkey",
  resave:false,
  saveUninitialized:false,
  cookie:{
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    httpOnly: true, // Prevent XSS attacks
    maxAge: 24 * 60 * 60 * 1000, // 24 hours session timeout
    sameSite: 'strict' // Prevent CSRF attacks
  }
}))

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: "Too many requests from this IP, please try again after 15 minutes."
});
app.use(limiter);

app.use("/user", userRouter);
app.use("/admin", adminRouter);

module.exports = app;

