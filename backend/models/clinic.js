const mongoose = require('mongoose');

const clinicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  doctors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
  }],
  totalAppointments: {
    type: Number,
    default: 0,
  },
  totalOnlineAppointments: {
    type: Number,
    default: 0,
  },
  totalOfflineAppointments: {
    type: Number,
    default: 0,
  },

});

const Clinic = mongoose.model('Clinic', clinicSchema);

module.exports = Clinic;
