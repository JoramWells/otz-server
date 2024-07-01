/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-var-requires */
// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
import { AppointmentAttributes, PrescriptionInterface } from 'otz-types'
import { type IPrescriptionRepository } from '../../application/interfaces/art/IPrescriptionRepository'
import { connect } from '../../domain/db/connect'
import { Appointment } from '../../domain/models/appointment/appointment.model'
import { ART } from '../../domain/models/art/art.model'
import { ArtCategory } from '../../domain/models/art/artCategory.model'
import { Prescription } from '../../domain/models/art/prescription.model'
import { calculateFacilityAdherence } from '../../utils/adherence'
import { calculatePills2 } from '../../utils/calculatePills'

export class PrescriptionRepository implements IPrescriptionRepository {
  async create (
    data: PrescriptionInterface,
    appointmentInput: AppointmentAttributes
  ): Promise<PrescriptionInterface | null> {
    return await connect.transaction(async (t) => {
      const results: PrescriptionInterface = await Prescription.create(data, {
        transaction: t
      })

      await Appointment.create(appointmentInput, { transaction: t })

      return results
    })
  }

  async find (): Promise<PrescriptionInterface[]> {
    const results = await calculatePills2()
    return results
  }

  async findAllAdherence (): Promise<PrescriptionInterface[]> {
    const results = await calculatePills2()
    return results
  }

  async findFacilityAdherence (): Promise<string | number> {
    const facilityAdherence = await calculateFacilityAdherence()
    return facilityAdherence
  }

  async findDetails (id: string): Promise<PrescriptionInterface | null> {
    const results = await Prescription.findOne({
      order: [['updatedAt', 'DESC']],
      where: {
        patientID: id
      }

    })

    return results
  }

  async findById (id: string): Promise<PrescriptionInterface | null> {
    const results = await Prescription.findOne({
      where: {
        patientVisitID: id
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
