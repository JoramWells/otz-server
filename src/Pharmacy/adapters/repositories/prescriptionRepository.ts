/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-var-requires */
// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
import { type IPrescriptionRepository } from '../../application/interfaces/art/IPrescriptionRepository'
import { connect } from '../../domain/db/connect'
import { type AppointmentEntity } from '../../domain/entities/appointment/AppointmentEntity'
import { type PrescriptionEntity } from '../../domain/entities/art/PrescriptionEntity'
import { Appointment } from '../../domain/models/appointment/appointment.model'
import { ART } from '../../domain/models/art/art.model'
import { ArtCategory } from '../../domain/models/art/artCategory.model'
import { Prescription } from '../../domain/models/art/prescription.model'
import { Patient } from '../../domain/models/patients.models'

export class PrescriptionRepository implements IPrescriptionRepository {
  async create (data: PrescriptionEntity, appointmentInput: AppointmentEntity): Promise<PrescriptionEntity | null> {
    return await connect.transaction(async t => {
      const results: PrescriptionEntity = await Prescription.create(data, { transaction: t })

      await Appointment.create(appointmentInput, { transaction: t })

      return results
    })
  }

  async find (): Promise<PrescriptionEntity[]> {
    const results = await Prescription.findAll({
      include: [
        {
          model: Patient,
          attributes: ['firstName', 'middleName']
        },
        {
          model: ART,
          attributes: ['artName']
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
