
const express = require('express');
const userRoutes = require('./user.routes.js');
const appointmentRoutes = require('./appointment.routes.js');


const v1Router = express.Router();

v1Router.get("/", (req, res) => {
      res.json({ message: "Welcome to API v1!" });
});

v1Router.use('/user', userRoutes)
v1Router.use('/appointment', appointmentRoutes)

module.exports = v1Router
