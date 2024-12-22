import { TransferInInterface } from "otz-types"

export interface ITransferInRepository {
  create: (data: TransferInInterface) => Promise<TransferInInterface>;
  find: (hospitalID: string) => Promise<TransferInInterface[] | undefined | null>;
  findByHospitalId: (
    hospitalID: string
  ) => Promise<TransferInInterface | null | undefined>;
}
