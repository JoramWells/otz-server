export interface FacilityMAPSInterface {
  id: string;
  ageGroup: string;
  gender: string;
  regimenLine: string;
  regimen: string;
  count: number;
  lineListID?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface LineListCSVInterface {
  id: string;
  file: string;
  createdAt?: Date;
  updatedAt?: Date;
}