
import { RedisAdapter } from '../redisAdapter'
import { IRequestRepository } from '../../../application/interfaces/chats/IRequestRepository';
import { FriendRequestsAttributes } from 'otz-types';
import { FriendRequest } from '../../../domain/models/chats/friendRequest.model';
import { Patient } from '../../../domain/models/patients.models';
// import { createClient } from 'redis'

export class RequestRepository implements IRequestRepository {
  private readonly redisClient = new RedisAdapter();
  // constructor () {
  //   this.redisClient = createClient({})
  // }

  async create(
    data: FriendRequestsAttributes
  ): Promise<FriendRequestsAttributes> {
    const results = await FriendRequest.create(data);
    console.log("new mess!!");
    return results;
  }

  async find(): Promise<FriendRequestsAttributes[]> {
    // await this.redisClient.connect();

    // check if patient
    // if ((await this.redisClient.get(mmasCache)) === null) {
    const results = await FriendRequest.findAll({});
    // logger.info({ message: "Fetched from db!" });
    // console.log("fetched from db!");
    // set to cace
    //   await this.redisClient.set(mmasCache, JSON.stringify(results));

    //   return results;
    // }
    // const cachedPatients: string | null = await this.redisClient.get(
    //   mmasCache
    // );
    // if (cachedPatients === null) {
    //   return [];
    // }
    // await this.redisClient.disconnect();
    // // logger.info({ message: "Fetched from cache!" });
    // console.log("fetched from cache!");

    // const results: FriendRequestsAttributes[] = JSON.parse(cachedPatients);
    return results;
  }

  async findById(id: string): Promise<FriendRequestsAttributes[] | null> {
    // await this.redisClient.connect();
    // if ((await this.redisClient.get(id)) === null) {

    const results: FriendRequest[] | null = await FriendRequest.findAll({
      where: {
        id,
      },
    });

    return results;

    // const patientResults: AppointmentEntity = {
    //   firstName: results?.firstName,
    //   middleName: results?.middleName,
    //   sex: results?.sex,
    //   phoneNo: results?.phoneNo,
    //   idNo: results?.idNo,
    //   occupationID: results?.occupationID,
    // };
    //   await this.redisClient.set(id, JSON.stringify(results));

    //   return results;
    // }

    // const cachedData: string | null = await this.redisClient.get(id);
    // if (cachedData === null) {
    //   return null;
    // }
    // const results: FriendRequestsAttributes = JSON.parse(cachedData);
    // console.log("fetched from cace!");

    // return null;
  }

  async findAllByPatientId(id: string): Promise<FriendRequestsAttributes[] | null> {
    // await this.redisClient.connect();
    // if ((await this.redisClient.get(id)) === null) {

    const results: FriendRequest[] | null = await FriendRequest.findAll({
      where: {
        from:id,
      },
      include:[
        {
          model:Patient,
          attributes:['firstName', 'middleName']
        }
      ]
    });

    return results;

    // const patientResults: AppointmentEntity = {
    //   firstName: results?.firstName,
    //   middleName: results?.middleName,
    //   sex: results?.sex,
    //   phoneNo: results?.phoneNo,
    //   idNo: results?.idNo,
    //   occupationID: results?.occupationID,
    // };
    //   await this.redisClient.set(id, JSON.stringify(results));

    //   return results;
    // }

    // const cachedData: string | null = await this.redisClient.get(id);
    // if (cachedData === null) {
    //   return null;
    // }
    // const results: FriendRequestsAttributes = JSON.parse(cachedData);
    // console.log("fetched from cace!");

    // return null;
  }
}
