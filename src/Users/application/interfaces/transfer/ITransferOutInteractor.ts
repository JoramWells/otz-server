import { TransferOutInterface } from "otz-types";

export interface ITransferOutInteractor {
  createTransferOut: (
    patientData: TransferOutInterface
  ) => Promise<TransferOutInterface>;
  getAllTransferOuts: (
    hospitalID: string
  ) => Promise<TransferOutInterface[] | null | undefined>;
  getTransferOutByHospitalId: (
    id: string
  ) => Promise<TransferOutInterface | null | undefined>;
}
