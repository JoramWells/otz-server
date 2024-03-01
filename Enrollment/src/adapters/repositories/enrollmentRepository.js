const OTZEnrollment = require("../../../models/otzEnrollment.model");

class EnrollmentRepository{
    async createEnrollment(enrollmentData){
        return await OTZEnrollment.create(enrollmentData)
    }

    async getAllEnrollments(){
        return await OTZEnrollment.findAll({})
    }
}

module.exports = new EnrollmentRepository()