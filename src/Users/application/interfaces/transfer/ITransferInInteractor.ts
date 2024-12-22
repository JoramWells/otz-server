import { PaginatedResponseInterface, TransferInInterface } from "otz-types";

export interface ITransferInInteractor {
  createTransferIn: (
    patientData: TransferInInterface
  ) => Promise<TransferInInterface>;
  getAllTransferIns: (
    hospitalID?: string,
    page?: number,
    pageSize?: number,
    searchQuery?: string
  ) => Promise<
    PaginatedResponseInterface<TransferInInterface> | null | undefined
  >;
  getTransferInByHospitalId: (
    id: string
  ) => Promise<TransferInInterface | null | undefined>;
  verifyTransferID: (
    transferInID: string,
    userID: string,
    hospitalID: string
  ) => Promise<TransferInInterface | null | undefined>;

  //
  getTransferInByPatientId: (
    patientID: string
  ) => Promise<TransferInInterface | null | undefined>;
  getAllTransferInByPatientId: (
    patientID: string,
    page?: number,
    pageSize?: number,
    searchQuery?: string
  ) => Promise<
    PaginatedResponseInterface<TransferInInterface> | null | undefined
  >;
}
