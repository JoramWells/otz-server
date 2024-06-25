/* eslint-disable @typescript-eslint/no-misused-promises */


import express from "express";
import { MessagesRepository } from "../../adapters/repositories/chat/messageRepoitory";
import { MessageInteractor } from "../../application/interactors/chat/messageInteractor";
import { MessagesController } from "../../adapters/controllers/chat/messageController";

const repository = new MessagesRepository();
const interactor = new MessageInteractor(repository);

const controllers = new MessagesController(interactor);

const router = express.Router();

router.post("/add", controllers.onCreateMessage.bind(controllers));
router.get(
  "/fetchAll",
  controllers.onGetAllMessages.bind(controllers)
);
router.get(
  "/detail/:id",
  controllers.onGetMessageById.bind(controllers)
);
// router.put('/edit/:id', editPatient);
// router.delete('/delete/:id', deletePatient);

export { router as messageRouter };
