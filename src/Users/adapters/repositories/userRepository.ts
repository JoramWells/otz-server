/* eslint-disable @typescript-eslint/no-var-requires */
// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
import { UserInterface } from 'otz-types'
import { type IUserRepository } from '../../application/interfaces/IUserRepository'
import { User } from '../../domain/models/user.model'
import bcrypt from "bcrypt";
import { Patient } from '../../domain/models/patients.models';
import { generateDefaultHashedPassword } from '../../utils/generateDefaultHashedPassword';

export class UserRepository implements IUserRepository {
  async create(data: UserInterface): Promise<UserInterface> {
    const {
      firstName,
      middleName,
      lastName,
      dob,
      phoneNo,
      sex,
      idNo,
      email,
      countyID,
      password,
      hospitalID,
      role,
    } = data;

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
      idNo,
      hospitalID,
      role,
    });
    const user: UserInterface = {
      id: results.id,
      firstName: results.firstName,
      middleName,
      sex,
      role,
      countyID,
      phoneNo,
      idNo,
      lastName: "",
      dob: "",
      email: "",
      password: "",
    };
    return user;
  }

  async find(): Promise<UserInterface[]> {
    const results = await User.findAll({});
    return results;
  }

  async findById(id: string): Promise<UserInterface | null> {
    const results = await User.findOne({
      where: {
        id,
      },
    });

    return results;
  }

  async edit(data: UserInterface): Promise<UserInterface | null> {
    const {
      id,
      firstName,
      middleName,
      lastName,
      phoneNo,
      role,
      dob,
      hospitalID,
    } = data;

    // delete cache
    // await this.redisClient.del(patientCache);
    // await this.redisClient.del(id as string);

    const results = await User.findOne({
      where: {
        id,
      },
    });

    if (results) {
      results.firstName = firstName;
      results.middleName = middleName;
      results.lastName = lastName;
      results.phoneNo = phoneNo;

      results.dob = dob;
      results.role = role;
      results.hospitalID = hospitalID;
      await results.save();
    }
    return results;
  }

  async editPassword(data: UserInterface): Promise<UserInterface | null> {
    const {
      id,
      password
    } = data;

    // delete cache
    // await this.redisClient.del(patientCache);
    // await this.redisClient.del(id as string);

    const results = await User.findOne({
      where: {
        id,
      },
    });

    if (results && password) {
      const passwordHash = await generateDefaultHashedPassword(password)
      results.password = passwordHash
      await results.save();
    }
    return results;
  }

  async login(
    firstName: string,
    password: string,
    hospitalID: string
  ): Promise<UserInterface | null> {
    try {
      const user: User | null = await User.findOne({
        where: { firstName: firstName, hospitalID: hospitalID },
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

  //
  async delete(id: string): Promise<number | null> {
    // await this.redisClient.del(patientCache);
    // await this.redisClient.del(id as string);
    const results: number | null = await User.destroy({
      where: {
        id,
      },
    });
    console.log("deleted cache!!");

    return results;
  }
}
