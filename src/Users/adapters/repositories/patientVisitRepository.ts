/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-var-requires */
// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
import { PatientVisitsInterface } from 'otz-types'
import { type IPatientVisitsRepository } from '../../application/interfaces/IPatientVisitsRepository'
import { PatientVisits } from '../../domain/models/patientVisits.model'
import { Patient } from '../../domain/models/patients.models'
import { KafkaAdapter } from '../kafka/kafka.producer'

export class PatientVisitRepository implements IPatientVisitsRepository {
  private readonly kafkaProducer = new KafkaAdapter();
  async create(data: PatientVisitsInterface): Promise<PatientVisitsInterface> {
    // const results: PatientVisitsInterface = await PatientVisits.create(data);
    await this.kafkaProducer.sendMessage('lab',[{value:JSON.stringify(data)}])
    // return results;
  }

  async find(): Promise<PatientVisitsInterface[]> {
    const results = await PatientVisits.findAll({
      include: [
        {
          model: Patient,
          attributes: ["id", "firstName", "middleName"],
        },
      ],
    });
    return results;
  }

  async findById(id: string): Promise<PatientVisitsInterface | null> {
    const results = await PatientVisits.findOne({
      where: {
        patientID: id,
      },
    });

    return results;
  }

  async findHistoryById(id: string): Promise<PatientVisitsInterface[] | null> {
    const results = await PatientVisits.findAll({
      where: {
        patientID: id,
      },
    });

    return results;
  }
}
