import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import {MatSnackBar} from '@angular/material/snack-bar';
import { User } from 'src/class/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userRef: AngularFireList<User>
  newUser: User;
  hide: boolean = true;
  email: string;
  password: string;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private _snackBar: MatSnackBar)
  {}

  ngOnInit(): void {
  }

  login(){
    this.afAuth.signInWithEmailAndPassword(this.email, this.password)
    .then(user => {
         console.log('login success!' + user.user.email);
         this.createUserEntry(user);
         this.openSnackBar();
    })
    .catch(error => console.log(error));
  }

  createUserEntry(user){
    //this.newUser = ;
    console.log(user.email);
    this.db.object(`/users/${user.user.uid}`)
    .set({'user': new User(user.user)});
  }

  openSnackBar() {
    this._snackBar.open(`Welcome ${this.email}` !, '',{
      duration: 4000,
    });
  }
}
