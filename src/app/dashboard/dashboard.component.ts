import { Component, OnInit } from '@angular/core';
import { User } from 'src/class/user';
import { Transaction} from 'src/class/transaction';
import { AngularFireDatabase} from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { TransactionsService } from '../service/transactions.service';
import { CategoriesService } from '../service/categories.service';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  currentUser: User;
  transactionsService: TransactionsService;
  categoriesService: CategoriesService;

  isEditing: Transaction;
  priceEdit: number;
  realizationDateEdit: string;
  categoryKeyEdit: string;
  descriptionEdit: string;

  condition: boolean;

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
  ) {}

  dataSource: Observable<Transaction[]>;

  ngOnInit(): void {
    this.afAuth.onAuthStateChanged(user => {
      this.currentUser     = new User(user)

      this.transactionsService = new TransactionsService(this.currentUser, this.db);
      this.categoriesService   = new CategoriesService(this.currentUser, this.db);
      //this.dataSource = this.transactionsService.transactionsRef.valueChanges();

      this.dataSource = this.transactionsService.transactionObservable;
      // this.dataSource = this.transactionsService.transactionsRef.snapshotChanges().pipe(
      //   map(actions => actions.map(a => {
      //     const data = a.payload.val() as Transaction;
      //     const key = a.payload.key;
      //     return {key,  ...data };
      //   }))
      // );
    })
  }

  edit(key: string): void{
    this.isEditing = this.transactionsService.findByKey(key);
    this.priceEdit =  this.isEditing.price;
    this.realizationDateEdit = moment(new Date(this.isEditing.realizationDate)).format('YYYY-MM-DD');
    this.categoryKeyEdit = this.isEditing.categoryKey;
    this.descriptionEdit = this.isEditing.description;
  }

  editCancel(): void{
    this.isEditing = null;
  }

  updateTransaction(): void{
    this.transactionsService.update(
      this.isEditing.key, new Transaction({
        key: this.isEditing.key,
        price: this.priceEdit,
        description: this.descriptionEdit,
        realizationDate: new Date(this.realizationDateEdit).getTime(),
        categoryKey: this.categoryKeyEdit,
        createdDate: this.isEditing.createdDate
      })
    )
    this.isEditing = null;
  }

  sort(): void{
    this.transactionsService.query('price');
    this.condition = true;
  }

  conditionByWords: string;
  panelOpenState: boolean = false;

  filter(): void{
    this.dataSource = this.dataSource.pipe(
      map(transactions => transactions.filter(
        transaction => transaction.price < 2000
      ).filter(
        transaction => transaction.description.includes(this.conditionByWords)
      ))
    )
  }

}
