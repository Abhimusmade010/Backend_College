const express = require('express');
const complaintSchema  = require('../validations/zod');
const validateWithZod = require('../middleware/middlewares');
const {submitForm} = require('../controllers/controllers');
const userRouter = express.Router();


userRouter.post("/submit", validateWithZod(complaintSchema), submitForm);
module.exports = userRouter;
