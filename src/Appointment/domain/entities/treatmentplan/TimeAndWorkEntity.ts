import { TimeAndWorkAttributes } from "../../models/treatmentplan/timeAndWork.model";

export class TimeAndWorkEntity implements TimeAndWorkAttributes {
  constructor(

  ) {}
  id!: string;
  patientID!: string;
  wakeUpTime!: Date;
  departureHomeTime!: Date;
  arrivalWorkTime!: Date;
  departureWorkTime!: Date;
  arrivalHomeTime!: Date;
  morningPlace!: string;
  morningMedicineTime!: Date;
  eveningPlace!: string;
  eveningMedicineTime!: Date;
  medicineStorage!: string;
  toolsAndCues!: string;
  goal!: string;
}
