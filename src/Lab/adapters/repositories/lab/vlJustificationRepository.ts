/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-var-requires */
// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
import { VLReasonsInterface } from "otz-types";
import { IVLJustificationRepository } from "../../../application/interfaces/lab/IVLJustificationRepository";
import { VLJustification } from "../../../domain/models/lab/vlJustification.model";

export class VLJustificationRepository implements IVLJustificationRepository {
  async create(data: VLReasonsInterface): Promise<VLReasonsInterface> {
    try {
      const results: VLReasonsInterface = await VLJustification.create(data);

      return results;
    } catch (error) {
      console.log(error);
    }
  }

  async find(): Promise<VLReasonsInterface[] | undefined> {
    try {
      const results = await VLJustification.findAll({});
      return results;
    } catch (error) {
      console.log(error);
    }
  }

  async findById(id: string): Promise<VLReasonsInterface | null | undefined> {
try {
      const results = await VLJustification.findOne({
        where: {
          id,
        },
      });

      return results;
} catch (error) {
  console.log(error)
}
  }
}
