export class SchoolTermEntity {
  constructor(
    public id: string,
    public termDescription: string,
    public openingDate: string,
    public closingDate: string,
    public duration: string
  ) {}
}