import { PaginatedResponseInterface, TransferInInterface } from "otz-types"

export interface ITransferInRepository {
  create: (data: TransferInInterface) => Promise<TransferInInterface>;
  find: (
    hospitalID?: string,
    page?: number,
    pageSize?: number,
    searchQuery?: string
  ) => Promise<
    PaginatedResponseInterface<TransferInInterface> | undefined | null
  >;
  findByHospitalId: (
    hospitalID: string
  ) => Promise<TransferInInterface | null | undefined>;
  verify: (
    transferInID: string,
    userID: string,
    hospitalID: string
  ) => Promise<TransferInInterface | null | undefined>;
  //
  findByPatientId: (
    patientID: string
  ) => Promise<TransferInInterface | null | undefined>;
  findAllByPatientId: (
    patientID: string,
    page?: number,
    pageSize?: number,
    searchQuery?: string
  ) => Promise<
    PaginatedResponseInterface<TransferInInterface> | null | undefined
  >;
}
