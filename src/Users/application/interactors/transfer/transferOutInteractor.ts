// import { type Patient } from '../../domain/entities/PatientEntity'
import { PaginatedResponseInterface, TransferOutInterface } from "otz-types";
import { ITransferOutInteractor } from "../../interfaces/transfer/ITransferOutInteractor";
import { ITransferOutRepository } from "../../interfaces/transfer/ITransferOutRepository";

export class TransferOutInteractor implements ITransferOutInteractor {
  private readonly repository: ITransferOutRepository;

  constructor(repository: ITransferOutRepository) {
    this.repository = repository;
  }

  async getTransferOutByHospitalId(
    id: string
  ): Promise<TransferOutInterface | null | undefined> {
    return await this.repository.findByHospitalId(id);
  }

  async getTransferOutById(
    id: string
  ): Promise<TransferOutInterface | null | undefined> {
    return await this.repository.findByHospitalId(id);
  }

  async createTransferOut(
    patientData: TransferOutInterface
  ): Promise<TransferOutInterface | undefined | null> {
    return await this.repository.create(patientData);
  }

  async getAllTransferOuts(
    hospitalID?: string,
    page?: number,
    pageSize?: number,
    searchQuery?: string
  ): Promise<PaginatedResponseInterface<TransferOutInterface> | undefined | null> {
    return await this.repository.find(hospitalID, page, pageSize);
  }
}
