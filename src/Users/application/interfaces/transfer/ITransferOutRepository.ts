import { PaginatedResponseInterface, TransferOutInterface } from "otz-types";

export interface ITransferOutRepository {
  create: (data: TransferOutInterface) => Promise<TransferOutInterface | undefined | null>;
  find: (
    hospitalID?: string,
    page?: number,
    pageSize?: number,
    searchQuery?: string
  ) => Promise<
    PaginatedResponseInterface<TransferOutInterface> | undefined | null
  >;
  findByHospitalId: (
    hospitalID: string
  ) => Promise<TransferOutInterface | null | undefined>;
}
