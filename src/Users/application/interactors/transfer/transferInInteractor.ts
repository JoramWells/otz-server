// import { type Patient } from '../../domain/entities/PatientEntity'
import { TransferInInterface } from "otz-types";
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

  async getTransferInById(id: string): Promise<TransferInInterface | null | undefined> {
    return await this.repository.findByHospitalId(id);
  }

  async createTransferIn(patientData: TransferInInterface): Promise<TransferInInterface> {
    return await this.repository.create(patientData);
  }

  async getAllTransferIns(
    hospitalID: string
  ): Promise<TransferInInterface[] | undefined | null> {
    return await this.repository.find(hospitalID);
  }
}
