/* eslint-disable @typescript-eslint/no-misused-promises */


import express from "express";
import { RequestRepository } from "../../adapters/repositories/chat/requestRepository";
import { RequestInteractor } from "../../application/interactors/chat/requestInteractor";
import { RequestsController } from "../../adapters/controllers/chat/requestController";


const repository = new RequestRepository();
const interactor = new RequestInteractor(repository);

const controllers = new RequestsController(interactor);

const router = express.Router();

router.post("/add", controllers.onCreateRequest.bind(controllers));
router.get(
  "/fetchAll",
  controllers.onGetAllRequests.bind(controllers)
);
router.get(
  "/detail/:id",
  controllers.onGetRequestById.bind(controllers)
);
// router.put('/edit/:id', editPatient);
// router.delete('/delete/:id', deletePatient);

export { router as friendRequestRouter };
