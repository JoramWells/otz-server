/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-var-requires */
// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
import { ARTPrescriptionInterface } from 'otz-types'
import { type IARTPrescriptionRepository } from '../../application/interfaces/art/IARTPrescriptionRepository'
import { ART } from '../../domain/models/art/art.model'
import { ARTPrescription } from '../../domain/models/art/artPrescription.model'

export class ARTPrescriptionRepository implements IARTPrescriptionRepository {
  async create (data: ARTPrescriptionInterface): Promise<ARTPrescriptionInterface> {
    const results: ARTPrescriptionInterface = await ARTPrescription.create(data)

    return results
  }

  async find (): Promise<ARTPrescriptionInterface[]> {
    const results = await ARTPrescription.findAll({
      include: [
        {
          model: ART,
          attributes: ['artName']
        }
      ]

    })
    return results
  }

  async findById (id: string): Promise<ARTPrescriptionInterface | null> {
    const results = await ARTPrescription.findOne({
      where: {
        patientID: id
      }
    })

    return results
  }
}
