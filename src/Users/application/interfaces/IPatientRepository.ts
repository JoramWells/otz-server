import { NextOfKinInterface, PatientAttributes } from "otz-types"
import { PatientResponseInterface } from "../../domain/models/patients.models";

export interface IPatientRepository {
  create: (
    data: PatientAttributes,
    nextOfKinData: NextOfKinInterface
  ) => Promise<string | null>;
  find: (
    hospitalID: string,
    page: number,
    pageSize: number,
    searchQuery: string,
    calHIVQuery: string,
    casemanager: string
  ) => Promise<PatientResponseInterface | null | undefined>;
  search: (
    hospitalID: string,
    searchQuery: string,
  ) => Promise<PatientResponseInterface | null | undefined>;
  findUsers: () => Promise<PatientAttributes[]>;
  findImportant: (limit: number) => Promise<PatientAttributes[]>;
  findById: (id: string) => Promise<PatientAttributes | null>;
  findPatientByUserId: (id: string) => Promise<PatientAttributes | null>;
  important: (id: string, isImportant: boolean) => Promise<string | null>;
  edit: (data: PatientAttributes) => Promise<PatientAttributes | null>;
  findAllPMTCTPatients: () => Promise<PatientAttributes[]>;
  findOTZ: (
    hospitalID: string,
    page: number,
    pageSize: number,
    searchQuery: string
  ) => Promise<PatientResponseInterface | undefined | null>;
  editAvatar: (id: string, avatar: string) => Promise<PatientAttributes | null>;
  editUsername: (
    id: string,
    username: string
  ) => Promise<PatientAttributes | null>;
  editPassword: (
    id: string,
    password: string
  ) => Promise<PatientAttributes | null>;
  delete: (id: string) => Promise<number | null>;
  login: (cccNo: string, password: string) => Promise<PatientAttributes | null>;
}
