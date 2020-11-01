import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { stringify } from 'querystring';
import { Observable } from 'rxjs';
import { Category } from 'src/class/category';
import { User } from 'src/class/user';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  categoriesRef: AngularFireList<Category>
  categories:    Category[];
  category:  Category;

  constructor(
    private currentUser: User,
    private db: AngularFireDatabase
  )
  {
    this.categoriesRef = this.db.list(`users/${currentUser.uid}/cateogires`)
    this.categoriesRef.snapshotChanges()
      .subscribe(snapshots => {
        this.categories = snapshots.map(snapshot => {
        const values = snapshot.payload.val();
        return new Category({key: snapshot.payload.key, ...values});
      })
    })
  }

  add(value: Category): void{
    this.categoriesRef.push(value)
  }

  findBykey(key: string):Category{
    return this.categories?.find(category =>
      category.key == key
    );
  }

}
