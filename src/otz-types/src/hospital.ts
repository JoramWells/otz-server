export interface HospitalAttributes {
  id: string;
  location: string;
  mflCode: string;
  hospitalName: string;
  longitude: string;
  latitude: string;
  locationUpdatedAt: string;
  locationUpdatedBy: string;
}


export interface HospitalLocationInterface {
  id: string;
  hospitalID: string;
  country: string;
  city: string;
  longitude: string;
  latitude: string;
  isoCountryCode: string;
  region: string;
  locationUpdatedAt: string;
  locationUpdatedBy: string;
}