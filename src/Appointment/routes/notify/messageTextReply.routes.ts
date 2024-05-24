/* eslint-disable @typescript-eslint/no-misused-promises */


import express from "express";
import { MessageTextReplyRepository } from "../../adapters/repositories/notify/messageTextReplyRepository";
import { MessageTextReplyInteractor } from "../../application/interactors/notify/messageTextReplyInterctor";
import { MessageTextReplyController } from "../../adapters/controllers/notify/messageTextReplyController";

const repository = new MessageTextReplyRepository();
const interactor = new MessageTextReplyInteractor(repository);

const controllers = new MessageTextReplyController(interactor);

const router = express.Router();

router.post("/add", controllers.onCreateMessageTextReply.bind(controllers));
router.get(
  "/fetchAll",
  controllers.onGetAllMessageTextReplies.bind(controllers)
);
router.get(
  "/detail/:id",
  controllers.onGetMessageTextReplyById.bind(controllers)
);
// router.put('/edit/:id', editPatient);
// router.delete('/delete/:id', deletePatient);

export { router as messageTextReplyRouter };
