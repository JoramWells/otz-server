import { ISchoolTermHolidayRepository } from "../../application/interfaces/ISchoolTermHolidayRepository";
import { SchoolTermHolidayEntity } from "../../domain/entities/schoolTermHolidayEntity";
const SchoolTermHolidays = require('../../domain/models/schoolTermHolidays.model')
const SchoolTerm = require('../../domain/models/schoolTerm.model')


export class SchoolTermHolidayRepository implements ISchoolTermHolidayRepository {
  //
  create(data: SchoolTermHolidayEntity): Promise<SchoolTermHolidayEntity> {
    return SchoolTermHolidays.create(data);
  }
  read(): Promise<SchoolTermHolidayEntity> {
    return SchoolTermHolidays.findAll({
      include: [
        {
          model: SchoolTerm,
          attributes: ["termDescription"],
        },
      ],
    });
  }
  readById(id: string): Promise<SchoolTermHolidayEntity> {
    return SchoolTermHolidays.findOne({
      where: {
        id,
      },
    });
  }
  update(data: SchoolTermHolidayEntity): Promise<SchoolTermHolidayEntity> {
    return SchoolTermHolidays;
  }
}