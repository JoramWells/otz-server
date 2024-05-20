import { type PMTCTProfileAttributes } from '../models/pmtct/pmtctProfile.model'

export class PMTCTProfileEntity implements PMTCTProfileAttributes {
  id?: string | undefined
  patientID!: string
  kmhflCode!: string
  anc!: string
  pncNo!: string
}
