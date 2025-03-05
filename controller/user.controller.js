const { USER_ROLES } = require('../constants');

const { createUserService, getUserByUsernameService, getAllDoctorsServices, getAllPatientsServices } = require('../services/user.services');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const registerUserController = async (req, res) => {
      try {
            const { fullName, email, password, role, userName } = req.body;
            console.log("#######", req.body)

            if (!fullName || !email || !password || !role || !userName) {
                  return res.status(400).json({ message: 'All fields are required fullName, email, password, role, userName ' });
            }

            if (!(USER_ROLES.includes(role))) {
                  return res.status(400).json({ message: 'Invalid role' });
            }

            const existingUser = await getUserByUsernameService(userName)

            if (existingUser) {
                  return res.status(400).json({ message: 'userName or email already registered' });
            }

            const newUser = await createUserService({ fullName, email, password, role, userName });
            res.status(201).json(newUser);
      } catch (error) {
            if (error.message.includes('E11000 duplicate')) {
                  return res.status(400).json({ message: 'Email or userName  already registered' });
            }

            res.status(500).json({ message: error.message });
      }
}

const signinUserController = async (req, res) => {
      try {
            const { userName, password } = req.body;

            if (!userName || !password) {
                  return res.status(400).json({ message: 'Both userName and password are required' });
            }

            const user = await getUserByUsernameService(userName);
            const isMatch = await bcrypt.compare(password, user.password);
            user.password = undefined;

            console.log(password, isMatch);
            if (!user || !isMatch) {
                  return res.status(401).json({ message: 'Invalid credentials' });
            }

            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

            res.status(200).json({
                  message: 'Signin successful', user, token
            });

      } catch (error) {
            res.status(500).json({ message: error.message });
      }
}

const getAllDoctorsController = async (req, res) => {
      try {
            const doctors = await getAllDoctorsServices();
            res.status(200).json(doctors);
      } catch (error) {
            res.status(500).json({ message: error.message });
      }
}

const getAllPatientsController = async (req, res) => {
      try {
            const doctors = await getAllPatientsServices();
            res.status(200).json(doctors);
      } catch (error) {
            res.status(500).json({ message: error.message });
      }
}

module.exports = {
      registerUserController,
      signinUserController,
      getAllDoctorsController,
      getAllPatientsController
};