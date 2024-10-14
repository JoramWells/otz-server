import { NextOfKinInterface, PatientAttributes } from "otz-types"

export interface IPatientRepository {
  create: (
    data: PatientAttributes,
    nextOfKinData: NextOfKinInterface
  ) => Promise<string | null>;
  find: () => Promise<PatientAttributes[]>;
  findImportant: (limit: number) => Promise<PatientAttributes[]>;
  findById: (id: string) => Promise<PatientAttributes | null>;
  important: (id: string, isImportant: boolean) => Promise<string | null>;
  edit: (data: PatientAttributes) => Promise<PatientAttributes | null>;
  findAllPMTCTPatients: () => Promise<PatientAttributes[]>;
  findOTZ: () => Promise<PatientAttributes[]>;
  editAvatar: (id: string, avatar: string) => Promise<PatientAttributes | null>;
  editUsername: (id: string, username: string) => Promise<PatientAttributes | null>;
  editPassword: (id: string, password: string) => Promise<PatientAttributes | null>;
  delete: (id: string) => Promise<number | null>;
  login: (
    firstName: string,
    password: string
  ) => Promise<PatientAttributes | null>;
}
