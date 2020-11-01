import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Category } from 'src/class/category';
import { Transaction } from 'src/class/transaction';
import { User } from 'src/class/user';
import { CategoriesService } from '../service/categories.service';
import { TransactionsService } from '../service/transactions.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  currentUser: User;

  transactions: Transaction[];
  transactionsService: TransactionsService;
  categoriesService: CategoriesService;

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth) {
   }

  ngOnInit(): void {
    this.afAuth.onAuthStateChanged(user => {
      this.currentUser     = new User(user)

      this.transactionsService = new TransactionsService(this.currentUser, this.db);
      this.categoriesService   = new CategoriesService(this.currentUser, this.db);
    })
  }

  name: string;
  description2: string;

  addCategory(): void{
    this.categoriesService.add(
      new Category({
        name: this.name,
        description: this.description2,
        createdDate: Date.now()
      })
    )
  }

  price: number;
  description: string;
  realizationDate: Date;
  categoryKey: String;

  addTransaction(): void{
      this.transactionsService.add(
        new Transaction({
          price: this.price,
          description: this.description,
          realizationDate: new Date(this.realizationDate).getTime(),
          categoryKey: this.categoryKey,
          createdDate: Date.now()
        })
      )
  }
}
