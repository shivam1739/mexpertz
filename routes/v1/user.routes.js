const express = require('express');
const userRoutes = express.Router()
const { registerUserController, signinUserController, getAllDoctorsController, getAllPatientsController } = require('../../controller/user.controller');
const isAuthenticatedMiddleware = require('../../middleware/authentication.middleware');
const { isPatient } = require('../../middleware/authorization.middleware');






userRoutes.get('/doctors', isAuthenticatedMiddleware, isPatient, getAllDoctorsController)
userRoutes.get('/patients', isAuthenticatedMiddleware, isPatient, getAllPatientsController)

userRoutes.post('/register', registerUserController)
userRoutes.post('/sign-in', signinUserController)

module.exports = userRoutes