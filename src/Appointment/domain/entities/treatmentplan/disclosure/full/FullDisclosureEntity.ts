import { FullDisclosureAttributes } from "../../../../models/treatmentplan/disclosure/full/fullDisclosure.model";

export class FullDisclosureEntity implements FullDisclosureAttributes {
  constructor() {}
  executeDisclosureID!: string;
  postDisclosureID!: string;

}
