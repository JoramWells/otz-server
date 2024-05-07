import { UptakeAttributes } from "../../models/treatmentplan/uptake.model";

export class UptakeEntity implements UptakeAttributes {
  constructor(

  ) {}
  id?: string;
  timeAndWorkID!: string;
  currentDate!: string;
  morningStatus!: boolean;
  eveningStatus!: boolean;
}
