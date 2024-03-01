import enrollmentRepository from "../../adapters/repositories/enrollmentRepository"

class EnrollmentService{
    async createEnrollment(enrollmentData){
        return await enrollmentRepository.createEnrollment(enrollmentData)
    }

    async getAllEnrollments(){
        return await enrollmentRepository.getAllEnrollments()
    }
}

module.exports = new EnrollmentService()