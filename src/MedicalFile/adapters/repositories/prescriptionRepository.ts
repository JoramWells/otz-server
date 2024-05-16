/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-var-requires */
// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
import { type IPrescriptionRepository } from '../../application/interfaces/art/IPrescriptionRepository'
import { type PrescriptionEntity } from '../../domain/entities/art/PrescriptionEntity'
import { ART } from '../../domain/models/art/art.model'
import { ArtCategory } from '../../domain/models/art/artCategory.model'
import { Prescription } from '../../domain/models/art/prescription.model'
import { Patient } from '../../domain/models/patients.models'

export class PrescriptionRepository implements IPrescriptionRepository {
  async create (data: PrescriptionEntity): Promise<PrescriptionEntity | null> {
    const results: PrescriptionEntity = await Prescription.create(data)

    return results
  }

  async find (): Promise<PrescriptionEntity[]> {
    const results = await Prescription.findAll({
      include: [
        {
          model: Patient,
          attributes: ['firstName', 'middleName']
        }
      ]
    })
    return results
  }

  async findById (id: string): Promise<PrescriptionEntity | null> {
    const results = await Prescription.findOne({
      where: {
        patientID: id
      },
      include: [
        {
          model: ART,
          attributes: ['artName'],
          include: [
            {
              model: ArtCategory,
              attributes: ['artPhase']
            }
          ]
        }
      ]
    })

    return results
  }
}
