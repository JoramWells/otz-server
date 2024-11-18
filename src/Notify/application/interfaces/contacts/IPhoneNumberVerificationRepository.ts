import { PhoneNumberVerificationInterface } from "otz-types";

export interface IPhoneNumberVerificationRepository {
  create: (data: PhoneNumberVerificationInterface) => Promise<PhoneNumberVerificationInterface>;
  find: () => Promise<PhoneNumberVerificationInterface[]>;
  findById: (id: string) => Promise<PhoneNumberVerificationInterface[] | null>;
}
