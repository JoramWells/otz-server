import { IPatientInteractor } from "../../application/interfaces/IPatientInteractor";
import { IPatientRepository } from "../../application/interfaces/IPatientRepository";
import { Patient } from "../../domain/entities/Patient";
const PatientDetails = require("../../domain/models/patients.models");
const School = require("../../domain/models/school/school.model");
const Hospital = require("../../domain/models/hospital/hospital.model");
const ViralLoad = require("../../domain/models/vl/viralLoadTests.model");

export class PatientRepository implements IPatientRepository {
  async create(data: Patient): Promise<Patient> {
    return await PatientDetails.create(data);
  }
  async find(): Promise<Patient> {
    return await PatientDetails.findAll({
      include: [
        { model: School, attributes: ["schoolName"] },
        {
          model: Hospital,
          attributes: ["hospitalName"],
        },
        {
          model: ViralLoad,
          attributes: [
            "id",
            "dateOfNextVL",
            "vlResults",
            "isValid",
            "dateOfCurrentVL",
          ],
        },
      ],
    });
  }
  async findById(id: string): Promise<Patient> {
    return await PatientDetails.findOne({
      where:{
        id
      }
    })
  }
}