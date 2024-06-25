/* eslint-disable @typescript-eslint/no-misused-promises */


import express from "express";
import { ChatRepository } from "../../adapters/repositories/chat/chatRepository";
import { ChatInteractor } from "../../application/interactors/chatInteractor";
import { ChatController } from "../../adapters/controllers/chatController";

const repository = new ChatRepository();
const interactor = new ChatInteractor(repository);

const controllers = new ChatController(interactor);

const router = express.Router();

router.post("/add", controllers.onCreateChat.bind(controllers));
router.get(
  "/fetchAll",
  controllers.onGetAllChats.bind(controllers)
);
router.get(
  "/detail/:id",
  controllers.onGetChatById.bind(controllers)
);
// router.put('/edit/:id', editPatient);
// router.delete('/delete/:id', deletePatient);

export { router as chatRouter };
