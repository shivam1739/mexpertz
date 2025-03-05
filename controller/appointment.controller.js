const { bookAppointmentService, checkIsExistAppointmentForThisTime, cancelAppointmentService, getAllAppointmentsByDoctorService } = require("../services/appointment.services");
const { getDoctorByIdService } = require("../services/user.services");

const bookAppointmentController = async (req, res) => {
      try {
            const { patient_id, doctor_id, date, time, } = req.body
            if (!patient_id || !doctor_id || !date || !time) {
                  return res.status(400).json({ message: 'All fields are required' });
            }
            const doctor = await getDoctorByIdService(doctor_id)
            if (!doctor || doctor.role !== 'doctor') {
                  return res.status(404).json({ message: 'Doctor not found' });
            }
            const checkAppointmentAvailability = await checkIsExistAppointmentForThisTime({ doctor: doctor_id, date, time })

            if (checkAppointmentAvailability) {
                  return res.status(400).json({ message: 'This time slot is already booked for this doctor' });
            }

            const appointment = await bookAppointmentService({ patient: patient_id, doctor: doctor_id, date: date, time })

            res.status(200).json({ message: 'Appointment booked successfully', data: appointment })

      } catch (error) {
            res.status(500).json({ message: error.message });
      }
}

const cancelAppointmentController = async (req, res) => {
      try {
            const { id: appointment_id } = req.params
            if (!appointment_id) {
                  return res.status(400).json({ message: 'Appointment ID is required' });
            }
            const appointment = await cancelAppointmentService(appointment_id)
            if (!appointment) {
                  return res.status(404).json({ message: 'Appointment not found' });
            }
            res.status(200).json({ message: 'Appointment canceled successfully', data: appointment })
      }
      catch (error) {
            res.status(500).json({ message: error.message });
      }
}

const getAppointmentsByDoctor = async (req, res) => {
      try {

            const { userId: doctor_id } = req.user
            if (!doctor_id) {
                  return res.status(400).json({ message: 'Doctor ID is required' });
            }
            const appointments = await getAllAppointmentsByDoctorService(doctor_id)
            res.status(200).json({ message: 'Appointments fetched successfully', data: appointments })
      } catch (error) {
            res.status(500).json({ message: error.message });
      }
}

module.exports = { bookAppointmentController, cancelAppointmentController, getAppointmentsByDoctor };