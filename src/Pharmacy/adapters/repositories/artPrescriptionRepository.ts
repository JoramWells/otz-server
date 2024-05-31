/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-var-requires */
// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
import { type IARTPrescriptionRepository } from '../../application/interfaces/art/IARTPrescriptionRepository'
import { type ARTPrescriptionEntity } from '../../domain/entities/art/ARTPrescriptionEntity'
import { ART } from '../../domain/models/art/art.model'
import { ARTPrescription } from '../../domain/models/art/artPrescription.model'

export class ARTPrescriptionRepository implements IARTPrescriptionRepository {
  async create (data: ARTPrescriptionEntity): Promise<ARTPrescriptionEntity> {
    const results: ARTPrescriptionEntity = await ARTPrescription.create(data)

    return results
  }

  async find (): Promise<ARTPrescriptionEntity[]> {
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

  async findById (id: string): Promise<ARTPrescriptionEntity | null> {
    const results = await ARTPrescription.findOne({
      where: {
        patientID: id
      }
    })

    return results
  }
}
