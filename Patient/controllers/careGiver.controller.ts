/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import { type NextFunction, type Request, type Response } from 'express'

const CareGiver = require('../domain/models/caregiver.model')
const Patient = require('../domain/models/patients.models')

// using *Patients model
const addCaregiver = async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body)
  try {
    await CareGiver.create(req.body)
    res.sendStatus(200).json({ messae: 'Successfully Created New Care' })

    next()
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' })
    next(error)
  }
}

// get all priceListItems
const getAllCaregivers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const results = await CareGiver.findAll({
      include: [
        {
          model: Patient,
          attributes: ['firstName', 'middleName', 'dob', 'gender']
        }
      ]
    })
    res.json(results)
    next()
  } catch (error) {
    console.log(error)
    res.json({ error: 'Internal Server error' })
    next(error)
  }
}

const getCaregiverDetail = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  try {
    const results = await CareGiver.findAll({
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
const editCaregiver = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  const {
    first_name, middle_name, last_name, id_number, cell_phone
  } = req.body
  try {
    const editPAtient = await CareGiver.findOne({
      where: {
        patient_id: id
      }
    })

    editPAtient.first_name = first_name
    editPAtient.middle_name = middle_name
    editPAtient.last_name = last_name
    editPAtient.id_number = id_number
    editPAtient.cell_phone = cell_phone
    next()

    return editPAtient.save()
  } catch (error) {
    console.log(error)
    res.sendStatus(500).json({ message: 'Internal Server' })
  }
}

const deleteCaregiver = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  try {
    const results = await CareGiver.destroy({
      where: {
        patient_id: id
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

module.exports = {
  addCaregiver, getAllCaregivers, getCaregiverDetail, editCaregiver, deleteCaregiver
}
