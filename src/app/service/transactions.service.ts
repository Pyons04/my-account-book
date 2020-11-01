import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Transaction } from 'src/class/transaction';
import { User } from 'src/class/user';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  transactionsRef: AngularFireList<Transaction>
  transactions: Transaction[];
  queryTransactionsRef: AngularFireList<Transaction>
  queryTransactions: Transaction[];
  transactionObservable: Observable<Transaction[]>;

  constructor(
    private currentUser: User,
    private db: AngularFireDatabase
  )
  {
    this.transactionsRef = this.db.list(`users/${currentUser.uid}/transactions`)
    this.transactionsRef.snapshotChanges()
      .subscribe(snapshots => {
        this.transactions = snapshots.map(snapshot => {
        const values = snapshot.payload.val() as Transaction;
        return new Transaction({key: snapshot.payload.key, ...values});
      })
    })

    this.transactionObservable = this.transactionsRef.snapshotChanges().pipe(
      map(actions => actions.map(a => {
          const data = a.payload.val() as Transaction;
          const key  = a.payload.key;
          return {key,  ...data};
        })
      )
    );
  }

  query(columnName: string): void{
    this.transactionsRef = this.db.list(`users/${this.currentUser.uid}/transactions`, ref => ref.orderByChild('price'))
    this.transactionsRef.snapshotChanges()
    .subscribe(snapshots => {
      this.transactions = snapshots.map(snapshot => {
        const values = snapshot.payload.val() as Transaction;
        return new Transaction({key: snapshot.payload.key, ...values});
      })
    })
  }

  add(value: Transaction): void{
    this.transactionsRef.push(value)
  }

  findByKey(key: string){
    return this.transactions?.find(category =>
      category.key == key
    );
  }

  update(key: string, value: Transaction): void{
    console.log(key);
    console.log(value);
    const itemRef = this.db.object(`users/${this.currentUser.uid}/transactions/${key}`);
    itemRef.update(value);
  }
}
