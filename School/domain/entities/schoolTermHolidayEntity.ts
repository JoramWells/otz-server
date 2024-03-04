export class SchoolTermHolidayEntity {
  constructor(
    public id: string,
    public termID: string,
    public termHolidayDescription: string,
    public openingDate: string,
    public closingDate: string,
    public duration: string
  ) {}
}