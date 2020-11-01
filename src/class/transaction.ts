export class Transaction{

  price: number;
  realizationDate: number;
  createdDate: number;
  description?: string;
  categoryKey: string;
  key: string;

  constructor(values: any){
      this.price = values.price;
      this.categoryKey = values.categoryKey;
      this.realizationDate = values.realizationDate;
      this.createdDate = values.createdDate;
      this.description = values.description;
      if(values.key){ this.key = values.key}
  }

  }



