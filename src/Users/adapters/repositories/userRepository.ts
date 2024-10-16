/* eslint-disable @typescript-eslint/no-var-requires */
// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
import { UserInterface } from 'otz-types'
import { type IUserRepository } from '../../application/interfaces/IUserRepository'
import { User } from '../../domain/models/user.model'
import bcrypt from "bcrypt";
import { Patient } from '../../domain/models/patients.models';

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
    const results = await User.findAll({
      include:[{
        model:Patient,
        attributes:['id']
      }]
    })
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

  async login (firstName: string, password: string): Promise<UserInterface | null> {
    try {
      const user: User | null = await User.findOne({
        where: { firstName: firstName },
      });

      if (user !== null && user.password) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          return user;
        } else {
          console.log("Password does not match!!");
          return null;
        }
      }
      return null;
    } catch (error) {
      console.log("Error comparing password!!", error);
      throw new Error("Error logging in user");
    }
  }
}
