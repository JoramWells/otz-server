import { FullDisclosureAttributes } from "../../../../models/treatmentplan/disclosure/fullDisclosure.model";

export class FullDisclosureEntity implements FullDisclosureAttributes {
  constructor() {}
  executeDisclosureID!: string;
  postDisclosureID!: string;

}
