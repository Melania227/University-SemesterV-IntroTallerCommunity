import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {FirebaseService} from 'src/app/services/firebase.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'WebApp';

  constructor(public firebase: FirebaseService){
    
  }

  ngOnInit():void{
    
  }

  isStudent(){
    console.log(localStorage.getItem('token'));
    return localStorage.getItem('token')==undefined;
  }


}