/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-var-requires */
// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
import { CALHIVInterface } from "otz-types";
import { Patient } from "../../domain/models/patients.models";
import { User } from "../../domain/models/user.model";
import { ICALHIVRepository } from "../../application/interfaces/ICALHIVRepository";
import { CALHIV } from "../../domain/models/calHIV.model";

export class CALHIVRepository implements ICALHIVRepository {
  async create(data: CALHIVInterface): Promise<CALHIVInterface> {
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

    const results: CALHIVInterface = await CALHIV.create(data);
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

  async find(
    hospitalID: string
  ): Promise<CALHIVInterface[] | undefined | null> {
    try {
      let where = {};

      if (hospitalID?.length > 0) {
        where = {
          ...where,
          hospitalID,
        };
      }
      const results = await CALHIV.findAll({
        where
      });
      return results;
    } catch (error) {
      console.log(error);
    }
  }

  async findById(id: string): Promise<CALHIVInterface | null> {
    const results = await CALHIV.findOne({
      where: {
        id,
      },
    });

    return results;
  }

  //
  async findByHospitalId(
    id: string
  ): Promise<CALHIVInterface | null | undefined> {
    try {
      const results = await CALHIV.findOne({
        order: [["createdAt", "DESC"]],
        // attributes: [],
        where: {
          hospitalID: id,
        },
        // include: [
        //   {
        //     model: User,
        //     attributes: ["firstName", "middleName", "phoneNo"],
        //   },
        // ],
      });

      return results;
    } catch (error) {
      console.log(error);
    }
  }
}
