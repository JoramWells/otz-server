import { AdherenceAttributes } from "otz-types";
import { PillUptakeRepository } from "../../adapters/repositories/pillUptakeRepository";
import { PillUptakeInteractor } from "../interactors/pillUptakeInteractor";

async function createAdherenceUseCase(data: AdherenceAttributes) {
  const repository = new PillUptakeRepository();
  const interactor = new PillUptakeInteractor(repository);
  return await interactor.createPillUptake(data);
}

export { createAdherenceUseCase };
