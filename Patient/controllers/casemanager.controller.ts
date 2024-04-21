/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import { type NextFunction, type Request, type Response } from 'express'
import CaseManager from '../domain/models/casemanager.model'
import { Patient } from '../domain/models/patients.models'
import { User } from '../domain/models/user.model'

// const CaseManager = require('../domain/models/CaseManager.model')
// const Patient = require('../domain/models/patients.models')

// using *Patients model
const addCaseManager = async (req: Request, res: Response, next: NextFunction) => {
  const { patientID, userID, isNotification } = req.body
  try {
    await CaseManager.create({ patientID, userID, isNotification })
    next()

    return res.json({ message: 'Successfully Created New Care' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' })
    next(error)
  }
}

// get all priceListItems
const getAllCaseManagers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const results = await CaseManager.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'firstName', 'middleName']

        }
      ]
    })
    res.json(results)
    console.log(results, 'ui')
    next()
  } catch (error) {
    console.log(error)
    res.json({ error: 'Internal Server error' })
    next(error)
  }
}

const getCaseManagerDetail = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  try {
    const results = await CaseManager.findAll({
      where: {
        patientID: id
      }
    })
    res.json(results)
    next()
  } catch (error) {
    console.log(error)
    res.sendStatus(500).json({ message: 'Internal Server Error' })
  }
}

// edit patient
const editCaseManager = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  const {
    first_name, middle_name, last_name, id_number, cell_phone
  } = req.body
  try {
    const editPAtient = await CaseManager.findOne({
      where: {
        id
      }
    })

    // editPAtient.first_name = first_name
    // editPAtient.middle_name = middle_name
    // editPAtient.last_name = last_name
    // editPAtient.id_number = id_number
    // editPAtient.cell_phone = cell_phone
    next()

    // return await editPAtient.save()
  } catch (error) {
    console.log(error)
    res.sendStatus(500).json({ message: 'Internal Server' })
  }
}

const deleteCaseManager = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  try {
    const results = await CaseManager.destroy({
      where: {
        id
      }
    })

    if (results) {
      return res.status(200).json({ message: 'User deleted successfully' })
    }
    return res.status(404).json({ message: 'User not found.' })
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

export {
  addCaseManager, getAllCaseManagers, getCaseManagerDetail, editCaseManager, deleteCaseManager
}
