// import { type Patient } from '../../domain/entities/PatientEntity'
import { PhoneNumberVerificationInterface } from 'otz-types';
import { IPhoneNumberVerificationInteractor } from '../../interfaces/contacts/IPhoneNumberVerificationInteractor';
import { IPhoneNumberVerificationRepository } from '../../interfaces/contacts/IPhoneNumberVerificationRepository';


export class PhoneNumberVerificationInteractor implements IPhoneNumberVerificationInteractor {
  private readonly repository: IPhoneNumberVerificationRepository;

  constructor(repository: IPhoneNumberVerificationRepository) {
    this.repository = repository;
  }

  async getPhoneNumberVerificationById(id: string): Promise<PhoneNumberVerificationInterface[] | null> {
    return await this.repository.findById(id);
  }

  async createPhoneNumberVerification(data:PhoneNumberVerificationInterface): Promise<PhoneNumberVerificationInterface> {
    return await this.repository.create(data);
  }

  async getAllPhoneNumberVerifications(): Promise<PhoneNumberVerificationInterface[]> {
    return await this.repository.find();
  }
}
