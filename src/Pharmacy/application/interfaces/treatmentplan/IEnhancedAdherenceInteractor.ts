import { EnhancedAdherenceAttributes } from "otz-types";


export interface IEnhancedAdherenceInteractor {
  createEnhancedAdherence: (data: EnhancedAdherenceAttributes) => Promise<EnhancedAdherenceAttributes>;
  getAllEnhancedAdherence: () => Promise<EnhancedAdherenceAttributes[]>;
  getEnhancedAdherenceById: (id: string) => Promise<EnhancedAdherenceAttributes | null>;
}
