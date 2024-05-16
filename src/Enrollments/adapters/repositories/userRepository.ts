/* eslint-disable @typescript-eslint/no-var-requires */
// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
import { type IUserRepository } from '../../application/interfaces/IUserRepository'
import { type UserEntity } from '../../domain/entities/UserEntity'
import { User } from '../../domain/models/user.model'

export class UserRepository implements IUserRepository {
  async create (data: UserEntity): Promise<UserEntity> {
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
    const userEntity: UserEntity = {
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
    return userEntity
  }

  async find (): Promise<UserEntity[]> {
    const results = await User.findAll({})
    return results
  }

  async findById (id: string): Promise<UserEntity | null> {
    const results = await User.findOne({
      where: {
        id
      }
    }
    )

    return results
  }

  async login (email: string, password: string): Promise<UserEntity | null> {
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
