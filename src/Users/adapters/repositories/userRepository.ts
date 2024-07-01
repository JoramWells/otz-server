/* eslint-disable @typescript-eslint/no-var-requires */
// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
import { UserInterface } from 'otz-types'
import { type IUserRepository } from '../../application/interfaces/IUserRepository'
import { User } from '../../domain/models/user.model'

export class UserRepository implements IUserRepository {
  async create (data: UserInterface): Promise<UserInterface> {
    const {
      firstName,
      middleName,
      lastName,
      dob,
      phoneNo,
      sex,
      idNo, email, countyID, password
    } = data

    const results = await User.create({
      firstName,
      middleName,
      lastName,
      dob,
      phoneNo,
      email,
      countyID,
      sex,
      password,
      idNo
    })
    const user: UserInterface = {
      id: results.id,
      firstName: results.firstName,
      middleName,
      sex,
      countyID,
      phoneNo,
      idNo,
      lastName: '',
      dob: '',
      email: '',
      password: ''
    }
    return user
  }

  async find (): Promise<UserInterface[]> {
    const results = await User.findAll({})
    return results
  }

  async findById (id: string): Promise<UserInterface | null> {
    const results = await User.findOne({
      where: {
        id
      }
    }
    )

    return results
  }

  async login (email: string, password: string): Promise<UserInterface | null> {
    const user: User | null = await User.findOne({
      where: {
        email
      }
    })

    if (user !== null && user.password === password) {
      return user
    }
    return null
  }
}
