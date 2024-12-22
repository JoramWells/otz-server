import { TransferInInterface } from "otz-types";

export interface ITransferInInteractor {
  createTransferIn: (
    patientData: TransferInInterface
  ) => Promise<TransferInInterface>;
  getAllTransferIns: (
    hospitalID: string
  ) => Promise<TransferInInterface[] | null | undefined>;
  getTransferInByHospitalId: (
    id: string
  ) => Promise<TransferInInterface | null | undefined>;
}
