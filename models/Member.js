const mongoose = require('mongoose');

const MemberSchema = mongoose.Schema({
    id: String,
    user_type: {
        type: String,
        default: "member"
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
    sub_type: String,
    occupation: String,
    no_of_children: Number,
    age_of_last_child: Number,
    health_data: {
        height: Number,
        weight: Number,
    },
    plan: String
})

module.exports = mongoose.model('Member', MemberSchema, 'user');