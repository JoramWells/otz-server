import { TransferOutInterface } from "otz-types"

export interface ITransferOutRepository {
  create: (data: TransferOutInterface) => Promise<TransferOutInterface>;
  find: (hospitalID: string) => Promise<TransferOutInterface[] | undefined | null>;
  findByHospitalId: (
    hospitalID: string
  ) => Promise<TransferOutInterface | null | undefined>;
}
