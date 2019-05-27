const mongoose = require('mongoose');

const TraineeSchema = mongoose.Schema({
    id: String,
    user_type: {
        type: String,
        default: "trainee"
    },
    first_name: String,
    mid_name: String,
    last_name: String,
    dob: Date,
    gender: String,
    earning: Boolean,
    married: Boolean,
    guardian_name: String,
    guardian_relationship: String,
    address: {
        house_no: String,
        street_name: String,
        pin_code: String
    },
    contact_no: Number,
    date_admission: {
        type: Date,
        default: Date.now
    },
    aadhar_no: Number,
    qualification: {
        academic: String,
        certification: String,
    },
    reference: String,
    batch: String,
    fully_paid: Boolean
})

module.exports = mongoose.model('Trainee', TraineeSchema, 'user');