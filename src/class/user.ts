import { Timestamp } from 'rxjs';

export class User{
   private name: String;
   private startDate: string;
   email: String;
   public uid: String;

   constructor(values){
     this.uid = values.uid;
     if(this.name){this.name = values.name}
     if(!this.startDate){
       this.startDate = new Date().toString();
      }
      else{
        this.startDate = values.startDate;
      };
     this.email = values.email;
   }


}
