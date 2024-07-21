export interface FacilityMAPSDetailsInterface {
  id: string;
  ageGroup: string;
  gender: string;
  regimenLine: string;
  regimen: string;
  count: number;
}


export interface FacilityMAPSInterface {
  id: string;
  lineListID?: string;
  details: FacilityMAPSDetailsInterface;
  createdAt?: Date;
  updatedAt?: Date;
}


export interface LineListCSVInterface {
  id: string;
  file: string;
  createdAt?: Date;
  updatedAt?: Date;
}