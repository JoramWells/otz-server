import { ISchoolTermHolidayRepository } from "../../application/interfaces/ISchoolTermHolidayRepository";
import { SchoolTermHolidayEntity } from "../../domain/entities/schoolTermHolidayEntity";
const SchoolCategoryDetails = require('../../domain/models/schoolCategory')


export class SchoolTermHolidayRepository implements ISchoolTermHolidayRepository {
  //
  create(data: SchoolTermHolidayEntity): Promise<SchoolTermHolidayEntity> {
    return SchoolCategoryDetails.create(data);
  }
  read(): Promise<SchoolTermHolidayEntity> {
    return SchoolCategoryDetails.findAll();
  }
  readById(id: string): Promise<SchoolTermHolidayEntity> {
    return SchoolCategoryDetails.findOne({
      where: {
        id,
      },
    });
  }
  update(data: SchoolTermHolidayEntity): Promise<SchoolTermHolidayEntity> {
    return SchoolCategoryDetails;
  }
}