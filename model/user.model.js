const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
      fullName: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      userName: { type: String, required: true, unique: true },
      role: { type: String, enum: ['doctor', 'patient'], required: true },
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function (next) {
      if (!this.isModified('password')) return next();
      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      this.password = await bcrypt.hash(this.password, salt);
      next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;