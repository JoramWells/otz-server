import { MMASEightAttributes } from "../../models/treatmentplan/mmas8.model";

export class MMASEightEntity implements MMASEightAttributes {
  constructor() {}
  mmasFourID!: string;
  totalScores!: number;
  patientID!: string;
  patientVisitID!: string;
  isTookMedYesterday!: boolean;
  isQuitOutControl!: boolean;
  isUnderPressure!: boolean;
  difficultyRemembering!: string;
  id?: string | undefined;
}
