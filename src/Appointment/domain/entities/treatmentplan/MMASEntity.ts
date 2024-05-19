import { MMASAttributes } from "../../models/treatmentplan/mmas.model";

export class MMASEntity implements MMASAttributes {
  constructor() {}
  patientID!: string;
  patientVisitID!: string;
  isForget!: boolean;
  isCareless!: boolean;
  isQuitFeelWorse!: boolean;
  isQuitFeelBetter!: boolean;
  isTookMedYesterday!: boolean;
  isQuitOutControl!: boolean;
  isUnderPressure!: boolean;
  difficultyRemembering!: string;
  id?: string | undefined;
}
