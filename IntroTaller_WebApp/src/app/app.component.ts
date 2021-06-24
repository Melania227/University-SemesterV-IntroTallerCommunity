import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WebApp';
  rootRef: firebase.database.Reference;

  constructor(private angularFirebaseDatabase: AngularFireDatabase){
    
    const database = this.angularFirebaseDatabase.database;
    this.rootRef = database.ref('/Ejercicios/');
  }


  getUserList() { 
    this.rootRef.once('value', function(snapshot) {
    
      snapshot.forEach(function(childSnapshot) {
        const data = snapshot.val();

        console.log(data);
          });
    });
    
  }

}
