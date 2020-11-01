import { TranslationWidth } from "@angular/common";

export class Category{
    key?: string
    name:string
    private description: string
    createdDate: number

  constructor(values: any)
    {
      if(values.key){this.key = values.key};
      this.name = values.name;
      this.description = values.description;
      this.createdDate = values.createdDate;
    }

}
