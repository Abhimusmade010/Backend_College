const express = require('express');
const complaintSchema  = require('../validations/zod');
const validateWithZod = require('../middleware/middlewares');
const {submitForm} = require('../controllers/controllers');
const {dashboard} = require('../controllers/controllers');
const Router = express.Router();

Router.post("/submit", validateWithZod(complaintSchema), submitForm);



module.exports = Router;
