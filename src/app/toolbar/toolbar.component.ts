import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { User } from 'src/class/user';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  currentUser: User;
  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
  ) { }

  ngOnInit(): void {
    this.afAuth.onAuthStateChanged(user => {
      this.currentUser     = new User(user)
    })
  }

}
