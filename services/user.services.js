const User = require("../model/user.model");

const createUserService = async (userData) => {
      try {
            const user = await User.create(userData);
            user.password = undefined;
            return user;
      } catch (error) {
            console.error("Error creating user:", error);
            throw new Error(`Error creating user: ${error.message}`);
      }
};

const getDoctorByIdService = async (id) => {

      try {
            const doctor = await User.findById(id);
            return doctor;
      } catch (error) {
            throw new Error(`Error retrieving doctor: ${error.message}`);
      }
}



const getUserByUsernameService = async (userName) => {
      try {
            const user = await User.findOne({ userName: userName });
            return user;
      } catch (error) {
            throw new Error('Error retrieving user');
      }
}

const getAllDoctorsServices = async () => {
      try {
            const doctors = await User.find({ role: 'doctor' }).select('-password');
            return doctors;
      } catch (error) {
            throw new Error('Error retrieving doctors');
      }
}

const getAllPatientsServices = async () => {
      try {
            const patients = await User.find({ role: 'patient' }).select('-password');
            return patients;
      } catch (error) {
            throw new Error('Error retrieving patients');
      }
}


module.exports = {
      createUserService,
      getUserByUsernameService,
      getDoctorByIdService,
      getAllDoctorsServices,
      getAllPatientsServices
};