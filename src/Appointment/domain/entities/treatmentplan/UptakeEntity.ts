import { UptakeAttributes } from "../../models/treatmentplan/uptake.model";

export class UptakeEntity implements UptakeAttributes {
  constructor() {}
  id?: string;
  timeAndWorkID!: string;
  prescriptionID!: string;
  currentDate!: string;
  morningStatus!: boolean;
  eveningStatus!: boolean;
}
