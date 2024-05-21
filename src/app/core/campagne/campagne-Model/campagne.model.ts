export class Campagne {

    year: number;
    id: number;
    status: string;

    constructor(year: number, id: number, billFrom: string, status: string, totalCost: number) {
      this.year = year;
      this.id = id;
      this.status = status;

    }
  }


