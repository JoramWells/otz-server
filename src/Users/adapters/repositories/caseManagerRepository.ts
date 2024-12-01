/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-var-requires */
// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
import { CaseManagerInterface } from "otz-types";
import { type ICaseManagerRepository } from "../../application/interfaces/ICaseManagerRepository";
import CaseManager from "../../domain/models/casemanager.model";
import { Patient } from "../../domain/models/patients.models";
import { User } from "../../domain/models/user.model";

export class CaseManagerRepository implements ICaseManagerRepository {
  async create(data: CaseManagerInterface): Promise<CaseManagerInterface> {
    // const {
    //   firstName,
    //   middleName,
    //   lastName,
    //   dob,
    //   phoneNo,
    //   sex,
    //   idNo,
    //   email,
    //   countyID,
    //   password
    // } = data

    const results: CaseManagerInterface = await CaseManager.create(data);
    // const caregiverEntity: CaregiverEntity = {
    //   id: results.id,
    //   firstName: results.firstName,
    //   middleName,
    //   sex,
    //   countyID,
    //   phoneNo,
    //   idNo,
    //   lastName: '',
    //   dob: '',
    //   email: '',
    //   password: ''
    // }
    return results;
  }

  async find(hospitalID: string): Promise<CaseManagerInterface[] | undefined | null> {
    try {
      const results = await CaseManager.findAll({
        attributes:[],
        include: [
          {
            model: Patient,
            attributes: ['id', "firstName", "middleName"],
          },
          {
            model: User,
            attributes: ['id',"firstName", "middleName", "phoneNo"],
            where: {
              hospitalID,
            },
          },
        ],
      });
      return results;
    } catch (error) {
      console.log(error);
    }
  }

  async findById(id: string): Promise<CaseManagerInterface | null> {
    const results = await CaseManager.findOne({
      where: {
        id,
      },
    });

    return results;
  }

  //
  async findByPatientId(
    id: string
  ): Promise<CaseManagerInterface | null | undefined> {
    try {
      const results = await CaseManager.findOne({
        order:[['createdAt', 'DESC']],
        attributes:[],
        where: {
          patientID: id,
        },
        include: [
          {
            model: User,
            attributes: ["firstName", "middleName", "phoneNo"],
          },
        ],
      });

      return results;
    } catch (error) {
      console.log(error);
    }
  }
}
