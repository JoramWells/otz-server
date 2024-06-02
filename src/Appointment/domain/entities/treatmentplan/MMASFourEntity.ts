import { MMASFourAttributes } from "../../models/treatmentplan/mmas4.model";

export class MMASFourEntity implements MMASFourAttributes {
  constructor() {}
  patientID!: string;
  patientVisitID!: string;
  isForget!: boolean;
  isCareless!: boolean;
  isQuitFeelWorse!: boolean;
  isQuitFeelBetter!: boolean;
  id?: string | undefined;
  totalScores!: number;
}
