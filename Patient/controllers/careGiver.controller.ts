/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import { type NextFunction, type Request, type Response } from 'express'
import { CaregiverInstance } from '../domain/models/caregiver.model'

const Patient = require('../domain/models/patients.models')

// using *Patients model
const addCaregiver = async (req: Request, res: Response, next: NextFunction) => {
  const {
    patientID,
    firstName,
    middleName,
    sex,
    dob,
    phoneNo,
    locationID,
    drugs,
    careerID,
    maritalStatus,
    idNo,
    relationship
  } = req.body
  try {
    await CaregiverInstance.create({
      patientID,
      firstName,
      middleName,
      sex,
      dob,
      phoneNo,
      locationID,
      drugs,
      careerID,
      maritalStatus,
      idNo,
      relationship
    })
    res.json({ message: 'Successfully Created New Care' })

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
    const results = await CaregiverInstance.findAll({
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
    const results = await CaregiverInstance.findAll({
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
  // const {
  //   middleName,
  //   sex,
  //   dob,
  //   phoneNo,
  //   locationID,
  //   drugs,
  //   careerID,
  //   maritalStatus,
  //   idNo,
  //   relationship
  // } = req.body
  try {
    await CaregiverInstance.findOne({
      where: {
        id
      }
    })

    // results.firstName = firstName

    next()

    // return await results.save()
  } catch (error) {
    console.log(error)
    res.sendStatus(500).json({ message: 'Internal Server' })
  }
}

const deleteCaregiver = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  try {
    const results = await CaregiverInstance.destroy({
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

module.exports = {
  addCaregiver, getAllCaregivers, getCaregiverDetail, editCaregiver, deleteCaregiver
}
