import { PaginatedResponseInterface, TransferOutInterface } from "otz-types";

export interface ITransferOutInteractor {
  createTransferOut: (
    patientData: TransferOutInterface
  ) => Promise<TransferOutInterface | undefined | null>;
  getAllTransferOuts: (
    hospitalID?: string,
    page?: number,
    pageSize?: number,
    searchQuery?: string
  ) => Promise<
    PaginatedResponseInterface<TransferOutInterface> | null | undefined
  >;
  getTransferOutByHospitalId: (
    id: string
  ) => Promise<TransferOutInterface | null | undefined>;
  //
  getTransferOutByPatientId: (
    patientID: string
  ) => Promise<TransferOutInterface | null | undefined>;
  getAllTransferOutByPatientId: (
    patientID: string,
    page?: number,
    pageSize?: number,
    searchQuery?: string
  ) => Promise<
    PaginatedResponseInterface<TransferOutInterface> | null | undefined
  >;
}
