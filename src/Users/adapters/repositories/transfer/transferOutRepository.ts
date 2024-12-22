/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-var-requires */
// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
import { PaginatedResponseInterface, TransferOutInterface } from "otz-types";

import { validate as isUUID } from "uuid";
import { ITransferOutRepository } from "../../../application/interfaces/transfer/ITransferOutRepository";
import { TransferOut } from "../../../domain/models/transfer/transferOut.model";
import { TransferIn } from "../../../domain/models/transfer/transferIn.model";
import { Patient } from "../../../domain/models/patients.models";
import { connect } from "../../../domain/db/connect";
import { calculateLimitAndOffset } from "../../../utils/calculateLimitAndOffset";
import { User } from "../../../domain/models/user/user.model";
import { Hospital } from "../../../domain/models/hospital/hospital.model";

export class TransferOutRepository implements ITransferOutRepository {
  async create(
    data: TransferOutInterface
  ): Promise<TransferOutInterface | undefined | null> {
    try {
      // find patientID
      const { patientID } = data;
      const patient = await Patient.findByPk(patientID);
      if (patient) {
        return await connect.transaction(async (t) => {
          // patient.hospitalID = transferredTo;
          const transferOutResults = await TransferOut.create(data, {
            transaction: t,
          });

          const transferInResults = await TransferIn.create(
            { transferOutID: transferOutResults.id },
            {
              transaction: t,
            }
          );
          return transferOutResults;
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async find(
    hospitalID?: string,
    page?: number,
    pageSize?: number,
    searchQuery?: string
  ): Promise<
    PaginatedResponseInterface<TransferOutInterface> | undefined | null
  > {
    try {
      const { limit, offset } = calculateLimitAndOffset(page, pageSize);
      let where = {};

      if (isUUID(hospitalID)) {
        where = {
          ...where,
          hospitalID,
        };
      }

      const { rows, count } = await TransferOut.findAndCountAll({
        limit,
        offset,
        include: [
          {
            model: Patient,
            attributes: ["id", "firstName", "middleName", "sex", "dob"],
          },
          {
            model: User,
            attributes: ["id", "firstName", "middleName"],
            where,
          },
          {
            model: Hospital,
            attributes: ["hospitalName"],
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

  //
  //
  async findByPatientId(
    patientID: string
  ): Promise<TransferOutInterface | null | undefined> {
    try {
      const results = await TransferOut.findOne({
        order: [["createdAt", "DESC"]],
        // attributes: [],
        include: [
          {
            model: User,
            attributes: ["firstName", "middleName", "phoneNo"],
          },
          {
            model: Patient,
            attributes: [],
            where: {
              id: patientID,
            },
          },
        ],
      });

      return results;
    } catch (error) {
      console.log(error);
    }
  }

  async findAllByPatientId(
    patientID: string,
    page?: number,
    pageSize?: number,
    searchQuery?: string
  ): Promise<
    PaginatedResponseInterface<TransferOutInterface> | null | undefined
  > {
    try {
      let where = {};

      if (isUUID(patientID)) {
        where = {
          ...where,
          id: patientID,
        };
      }
      const { limit, offset } = calculateLimitAndOffset(page, pageSize);
      const { rows, count } = await TransferOut.findAndCountAll({
        limit,
        offset,
        order: [["createdAt", "DESC"]],
        // attributes: [],
        include: [
          {
            model: TransferOut,
            include: [
              {
                model: User,
                attributes: ["firstName", "middleName", "phoneNo"],
              },
              {
                model: Patient,
                attributes: [],
                where,
              },
            ],
          },
        ],
      });

      return {
        data: rows,
        page: page,
        pageSize: limit,
        total: count,
      };
    } catch (error) {
      console.log(error);
    }
  }
}
