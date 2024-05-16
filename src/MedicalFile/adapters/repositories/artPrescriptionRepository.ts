/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-var-requires */
// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
import { type IARTPrescriptionRepository } from '../../application/interfaces/art/IARTPrescriptionRepository'
import { type ARTPrescriptionEntity } from '../../domain/entities/art/ARTPrescriptionEntity'
import { ARTPrescription } from '../../domain/models/art/artPrescription.model'

export class ARTPrescriptionRepository implements IARTPrescriptionRepository {
  async create (data: ARTPrescriptionEntity): Promise<ARTPrescriptionEntity> {
    const results: ARTPrescriptionEntity = await ARTPrescription.create(data)

    return results
  }

  async find (): Promise<ARTPrescriptionEntity[]> {
    const results = await ARTPrescription.findAll({})
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
