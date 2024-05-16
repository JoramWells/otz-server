/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import { AdverseDrugsReactionRepository } from '../adapters/repositories/adverseDrugsReactionRepository'
import { AdverseDrugReactionsInteractor } from '../application/interactors/adverseDrugReactionsInteractor'
import { AdverseDrugsReactionController } from '../adapters/controllers/adverseDrugsReactionController'

const repository = new AdverseDrugsReactionRepository()
const interactor = new AdverseDrugReactionsInteractor(repository)

const controller = new AdverseDrugsReactionController(interactor)

const router = express.Router()

router.post('/add', controller.onCreateAdverseDrugsReaction.bind(controller))
router.get(
  '/fetchAll',
  controller.onGetAllAdverseDrugsReactions.bind(controller)
)
router.get(
  '/detail/:id',
  controller.onGetAdverseDrugsReactionById.bind(controller)
)
// router.put('/edit/:id', editPatient);
// router.delete('/delete/:id', deletePatient);

export { router as adverseDrugsReactionRepositoryRouter }
