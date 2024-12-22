/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-var-requires */
// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
import { TransferInInterface } from "otz-types";

import { validate as isUUID } from "uuid";
import { ITransferInRepository } from "../../../application/interfaces/transfer/ITransferInRepository";
import { TransferIn } from "../../../domain/models/transfer/transferIn.model";

export class TransferInRepository implements ITransferInRepository {
  async create(data: TransferInInterface): Promise<TransferInInterface> {
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

    const results: TransferInInterface = await TransferIn.create(data);
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
  ): Promise<TransferInInterface[] | undefined | null> {
    try {
      let where = {};

      if (isUUID(hospitalID)) {
        where = {
          ...where,
          hospitalID,
        };
      }

      const results = await TransferIn.findAll({
        where,
      });
      return results;
    } catch (error) {
      console.log(error);
    }
  }

  async findById(id: string): Promise<TransferInInterface | null> {
    const results = await TransferIn.findOne({
      where: {
        id,
      },
    });

    return results;
  }

  //
  async findByHospitalId(
    hospitalID: string
  ): Promise<TransferInInterface | null | undefined> {
    try {
      let where = {};

      if (isUUID(hospitalID)) {
        where = {
          ...where,
          hospitalID,
        };
      }
      const results = await TransferIn.findOne({
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
