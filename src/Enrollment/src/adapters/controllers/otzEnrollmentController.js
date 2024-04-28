import enrollmentService from '../../application/services/enrollmentService'

class EnrollmentController{
    async createEnrollment(req, res, next){
        try {
            const results = await enrollmentService.createEnrollment(req.body)
            res.status(200).json(results)
            next()
        } catch (error) {
            next(error)

        }
    }
}

module.exports = new EnrollmentController()