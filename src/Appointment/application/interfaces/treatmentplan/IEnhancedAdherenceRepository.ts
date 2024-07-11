import { EnhancedAdherenceAttributes } from "otz-types";

export interface IEnhancedAdherenceRepository {
  create: (data: EnhancedAdherenceAttributes) => Promise<EnhancedAdherenceAttributes>;
  find: () => Promise<EnhancedAdherenceAttributes[]>;
  findById: (id: string) => Promise<EnhancedAdherenceAttributes | null>;
  // count: () => Promise<MMASEntity | null>;
}
