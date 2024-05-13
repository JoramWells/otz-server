/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-var-requires */
// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
import { type IARTRepository } from '../../application/interfaces/art/IARTRepository'
import { type ARTEntity } from '../../domain/entities/art/ARTEntity'
import { ART } from '../../domain/models/art/art.model'

export class ARTRepository implements IARTRepository {
  async create (data: ARTEntity): Promise<ARTEntity> {
    // const {
    //   firstName,
    //   middleName,
    //   lastName,
    //   dob,
    //   phoneNo,
    //   sex,
    //   idNo,
    //   email,
    //   countyID,
    //   password
    // } = data

    const results: ARTEntity = await ART.create(data)
    // const ARTEntity: ARTEntity = {
    //   id: results.id,
    //   firstName: results.firstName,
    //   middleName,
    //   sex,
    //   countyID,
    //   phoneNo,
    //   idNo,
    //   lastName: '',
    //   dob: '',
    //   email: '',
    //   password: ''
    // }
    return results
  }

  async find (): Promise<ARTEntity[]> {
    const results = await ART.findAll({})
    return results
  }

  async findById (id: string): Promise<ARTEntity | null> {
    const results = await ART.findOne({
      where: {
        id
      }
    })

    return results
  }
}
