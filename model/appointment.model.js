const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
      patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      date: { type: String, required: true },
      time: { type: String, required: true },
      status: { type: String, enum: ['scheduled', 'canceled'], default: 'scheduled' },
}, { timestamps: true });

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;