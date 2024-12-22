// import { type Patient } from '../../domain/entities/PatientEntity'
import { PaginatedResponseInterface, TransferInInterface } from "otz-types";
import { ITransferInInteractor } from "../../interfaces/transfer/ITransferInInteractor";
import { ITransferInRepository } from "../../interfaces/transfer/ITransferInRepository";

export class TransferInInteractor implements ITransferInInteractor {
  private readonly repository: ITransferInRepository;

  constructor(repository: ITransferInRepository) {
    this.repository = repository;
  }

  async getTransferInByHospitalId(
    id: string
  ): Promise<TransferInInterface | null | undefined> {
    return await this.repository.findByHospitalId(id);
  }

  async getTransferInById(
    id: string
  ): Promise<TransferInInterface | null | undefined> {
    return await this.repository.findByHospitalId(id);
  }

  async createTransferIn(
    patientData: TransferInInterface
  ): Promise<TransferInInterface> {
    return await this.repository.create(patientData);
  }

  async getAllTransferIns(
    hospitalID?: string,
    page?: number,
    pageSize?: number,
    searchQuery?: string
  ): Promise<
    PaginatedResponseInterface<TransferInInterface> | undefined | null
  > {
    return await this.repository.find(hospitalID, page, pageSize, searchQuery);
  }

  //
  async verifyTransferID(
    transferInID: string,
    userID: string,
    hospitalID: string
  ): Promise<TransferInInterface | null | undefined> {
    return await this.repository.verify(transferInID, userID, hospitalID);
  }

  //
  async getTransferInByPatientId(
    id: string
  ): Promise<TransferInInterface | null | undefined> {
    return await this.repository.findByPatientId(id);
  }

  async getAllTransferInByPatientId(
    id: string,
    page?: number,
    pageSize?: number,
    searchQuery?: string
  ): Promise<
    PaginatedResponseInterface<TransferInInterface> | null | undefined
  > {
    return await this.repository.findAllByPatientId(id, page, pageSize, searchQuery);
  }
}
