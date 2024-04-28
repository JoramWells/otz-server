import { SchoolTermHolidayEntity } from "../../domain/entities/schoolTermHolidayEntity";

export interface ISchoolTermHolidayRepository {
  read(): Promise<SchoolTermHolidayEntity>;
  readById(input: string): Promise<SchoolTermHolidayEntity>;
  create(data: SchoolTermHolidayEntity): Promise<SchoolTermHolidayEntity>;
  update(data: SchoolTermHolidayEntity): Promise<SchoolTermHolidayEntity>;
}