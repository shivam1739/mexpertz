const isPatient = (req, res, next) => {
      if (!(req.user.role !== 'patient')) {
            return res.status(404).json({ message: "Access denied. Patient only." });
      }
      next();
}

const isDoctor = (req, res, next) => {
      if (!(req.user.role !== 'doctor')) {
            return res.status(404).json({ message: "Access denied. Doctor only." });
      }
      next();

}

module.exports = { isDoctor, isPatient }