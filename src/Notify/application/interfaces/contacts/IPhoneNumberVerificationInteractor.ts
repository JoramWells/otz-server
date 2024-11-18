import { PhoneNumberVerificationInterface } from "otz-types";

export interface IPhoneNumberVerificationInteractor {
  createPhoneNumberVerification: (data: PhoneNumberVerificationInterface) => Promise<PhoneNumberVerificationInterface>;
  getAllPhoneNumberVerifications: () => Promise<PhoneNumberVerificationInterface[]>;
  getPhoneNumberVerificationById: (id: string) => Promise<PhoneNumberVerificationInterface[] | null>;
}
