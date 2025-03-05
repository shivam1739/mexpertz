const Appointment = require("../model/appointment.model");

const bookAppointmentService = async (appointmentData) => {
      const appointment = await Appointment.create(appointmentData);
      return appointment;
};


const cancelAppointmentService = async (appointmentId) => {
      return await Appointment.findByIdAndUpdate(appointmentId, { status: 'canceled' }, { new: true });
};

const getAppointmentByIdService = async (appointmentId) => {
      return await Appointment.findById(appointmentId).populate('patient doctor');
}

const checkIsExistAppointmentForThisTime = async (appointment) => {
      return await Appointment.findOne({ doctor: appointment.doctor, date: appointment.date, time: appointment.time, status: 'scheduled' });
}

const getAppointmentsService = async () => {
      return await Appointment.find().populate('patient doctor');
};

const getAllAppointmentsByDoctorService = async (id) => {
      return await Appointment.find({ doctor: id }).populate('patient', '-password').populate('doctor');
}

module.exports = {
      bookAppointmentService,
      cancelAppointmentService,
      getAppointmentsService,
      getAppointmentByIdService,
      checkIsExistAppointmentForThisTime,
      getAllAppointmentsByDoctorService
};