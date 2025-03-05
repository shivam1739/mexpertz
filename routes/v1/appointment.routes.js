const express = require('express');
const appointmentRoutes = express.Router()
const isAuthenticatedMiddleware = require('../../middleware/authentication.middleware');
const { bookAppointmentController, cancelAppointmentController, getAppointmentsByDoctor } = require('../../controller/appointment.controller');
const { isPatient, isDoctor } = require('../../middleware/authorization.middleware');







appointmentRoutes.post('/book', isAuthenticatedMiddleware, isPatient, bookAppointmentController)
appointmentRoutes.patch('/cancel/:id', isAuthenticatedMiddleware, isPatient, cancelAppointmentController)
appointmentRoutes.get('/my-appointments', isAuthenticatedMiddleware, isDoctor, getAppointmentsByDoctor)

module.exports = appointmentRoutes