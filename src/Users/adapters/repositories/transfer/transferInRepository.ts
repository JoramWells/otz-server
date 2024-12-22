/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-var-requires */
// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
import { PaginatedResponseInterface, TransferInInterface } from "otz-types";

import { validate as isUUID } from "uuid";
import { ITransferInRepository } from "../../../application/interfaces/transfer/ITransferInRepository";
import { TransferIn } from "../../../domain/models/transfer/transferIn.model";
import { calculateLimitAndOffset } from "../../../utils/calculateLimitAndOffset";
import { TransferOut } from "../../../domain/models/transfer/transferOut.model";
import { User } from "../../../domain/models/user/user.model";
import { Hospital } from "../../../domain/models/hospital/hospital.model";
import { Patient } from "../../../domain/models/patients.models";

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
    hospitalID?: string,
    page?: number,
    pageSize?: number,
    searchQuery?: string
  ): Promise<
    PaginatedResponseInterface<TransferInInterface> | undefined | null
  > {
    try {
      let where = {};

      const { limit, offset } = calculateLimitAndOffset(page, pageSize);

      if (isUUID(hospitalID)) {
        where = {
          ...where,
          transferredTo: hospitalID,
        };
      }

      const { rows, count } = await TransferIn.findAndCountAll({
        limit,
        offset,
        include: [
          {
            model: TransferOut,
            attributes: ["transferOutVerified"],
            where,
            include: [
              {
                model: User,
                attributes: ["id", "firstName", "middleName", "phoneNo"],
                include: [
                  {
                    model: Hospital,
                    attributes: ["hospitalName"],
                  },
                ],
              },
              {
                model: Patient,
                attributes: ["id", "firstName", "middleName", "sex", "dob"],
              },
            ],
          },
        ],
      });
      return {
        data: rows,
        total: count,
        page: page,
        pageSize: limit,
      };
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

  //
  async verify(
    transferInID: string,
    userID: string,
    hospitalID: string
  ): Promise<TransferInInterface | null | undefined> {
    try {
      const currentDate = new Date();

      const transferInResults = await TransferIn.findByPk(transferInID);

      if (transferInResults) {
        // VERIFY IN TransferOut and save
        const transferOutResults = await TransferOut.findByPk(
          transferInResults.transferOutID
        );
        if (transferOutResults) {
          transferOutResults.transferOutVerified = true;
          transferOutResults.transferOutVerificationDate = currentDate;
          await transferOutResults.save();

          // transferIN
          transferInResults.transferInVerified = true;
          transferInResults.transferInVerificationDate = currentDate;
          transferInResults.confirmedBy = userID;
          await transferInResults.save();

          // Transfer patient by editing hospitalID
          const patientResults = await Patient.findByPk(
            transferOutResults.patientID
          );
          if (patientResults) {
            patientResults.hospitalID = hospitalID;
            await patientResults.save();
          }
        }
      }

      return transferInResults;
    } catch (error) {
      console.log(error);
    }
  }
}
