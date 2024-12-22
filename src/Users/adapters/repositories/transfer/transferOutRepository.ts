/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-var-requires */
// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
import { TransferOutInterface } from "otz-types";

import { validate as isUUID } from "uuid";
import { ITransferOutRepository } from "../../../application/interfaces/transfer/ITransferOutRepository";
import { TransferOut } from "../../../domain/models/transfer/transferOut.model";

export class TransferOutRepository implements ITransferOutRepository {
  async create(data: TransferOutInterface): Promise<TransferOutInterface> {
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

    const results: TransferOutInterface = await TransferOut.create(data);
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
  ): Promise<TransferOutInterface[] | undefined | null> {
    try {
      let where = {};

      if (isUUID(hospitalID)) {
        where = {
          ...where,
          hospitalID,
        };
      }

      const results = await TransferOut.findAll({
        where,
      });
      return results;
    } catch (error) {
      console.log(error);
    }
  }

  async findById(id: string): Promise<TransferOutInterface | null> {
    const results = await TransferOut.findOne({
      where: {
        id,
      },
    });

    return results;
  }

  //
  async findByHospitalId(
    hospitalID: string
  ): Promise<TransferOutInterface | null | undefined> {
    try {
      let where = {};

      if (isUUID(hospitalID)) {
        where = {
          ...where,
          hospitalID,
        };
      }
      const results = await TransferOut.findOne({
        order: [["createdAt", "DESC"]],
        // attributes: [],
        where,
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
