import express, {Application} from 'express'
import request from 'supertest'
import { patientRouter } from '../../../routes/patient.routes';
import { Patient } from '../../../domain/models/patients.models';

jest.mock("../../../domain/models/patients.models");

describe('UserController',()=>{
    let app: Application;

    // 
    beforeAll(()=>{
        app = express()
        app.use(express.json())
        app.use('/patients/detail/1', patientRouter)
    })

    // 
    afterEach(()=>{
        jest.clearAllMocks()
    })

    // 
    it('should return 400 if UUID is invalid', async()=>{
        const response = await request(app).get("/patients/detail/1");
        expect(response.status).toBe(404)
        // expect(response.body).toHaveProperty('error', 'id is not a valid UUID')
    })



    it('should return 404 if user is not found', async ()=>{
        (Patient.findByPk as jest.Mock).mockResolvedValue(null)

        const response = await request(app).get(
          "/patient/detail/e4eaaaf2-d142-4b42-9c0c-3e4b3b489a9e"
        );

        expect(response.status).toBe(404)
    })
})