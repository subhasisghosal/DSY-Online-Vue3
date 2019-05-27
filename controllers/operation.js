const Handler = require('../lib/handler');
const Member = require('../models/Member');
const Trainee = require('../models/Trainee');

module.exports = {
    getAdmissionForm(req, res) {
        res.send("success")
    },
    async saveAdmissionForm(req, res) {
        try {
            let userModel, userInfo, reqBody = req.body,
                userBasics = {
                    id: reqBody.id,
                    user_type: reqBody.type,
                    first_name: reqBody.firstName,
                    mid_name: reqBody.middleName,
                    last_name: reqBody.lastName,
                    dob: reqBody.dateOfBirth,
                    gender: reqBody.gender,
                    earning: reqBody.isEarning || false,
                    married: reqBody.isMarried,
                    guardian_name: reqBody.guardianName,
                    guardian_relationship: reqBody.guardianRelation,
                    address: {
                        house_no: reqBody.houseNum,
                        street_name: reqBody.street,
                        pin_code: reqBody.pinCode
                    },
                    contact_no: reqBody.contactNum,
                    date_admission: reqBody.admissionDate
                };
            console.log(userBasics)
            if (userBasics.user_type === 'trainee') {
                console.log("Trainee")
                let traineeInfo = {
                    aadhar_no: reqBody.aadharNum,
                    qualification: {
                        academic: reqBody.qualification,
                        certification: reqBody.certification,
                    },
                    reference: reqBody.reference,
                    batch: reqBody.batch,
                    fully_paid: reqBody.isPaid
                };
                userModel = Trainee;
                userInfo = {
                    ...userBasics,
                    ...traineeInfo
                };
                console.log(traineeInfo)
            } else if (userBasics.user_type === 'member') {
                console.log("Member", typeof userBasics.earning, typeof reqBody.totalChildren)
                let memberInfo = {
                    sub_type: reqBody.subType,
                    occupation: userBasics.earning ? reqBody.occupation : 'Retired/Unemployed',
                    no_of_children: parseInt(reqBody.totalChildren),
                    age_of_last_child: this.no_of_children ? reqBody.lastChildAge : 0,
                    health_data: {
                        height: reqBody.height,
                        weight: reqBody.weight,
                    },
                    plan: reqBody.plan
                };
                userModel = Member;
                userInfo = {
                    ...userBasics,
                    ...memberInfo
                };
                console.log(memberInfo)
            } else {
                res.send("Invalid");
            }
            const { err: error1, data: new_user } = await Handler(userModel.create(userInfo));
            if (error1 || !new_user)
                return res.status(500).json({ error1, msg: "Srvr Err" });
            return res.send("submitted");
        } catch (error) {
            return res.status(500).json({ error, msg: "Server Err" });
        }
    }
}