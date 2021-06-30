import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { adminUser } from 'src/app/models/adminUser';
import { User } from 'src/app/models/loginUser';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  forma: FormGroup;
  newAdmin: adminUser

  constructor(
    private fb: FormBuilder,
    private _authService: AuthService , private firebase: FirebaseService
  ) { 
    this.createForm();
  }

  ngOnInit(): void {
  }

  get nameInvalid(){
    return this.forma.get('name').invalid && this.forma.get('name').touched
  }

  get mailInvalid(){
    return this.forma.get('email').invalid && this.forma.get('email').touched
  }

  get passwordInvalid(){
    return this.forma.get('password').invalid && this.forma.get('password').touched
  }

  createForm(){
    this.forma = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        name: ['', [Validators.required]]
      }
    )
  }

  signUp(){
    if(this.forma.invalid){
      Object.values( this.forma.controls ).forEach (control =>{
        control.markAsTouched();
      })
    }
    else{
      console.log(this.forma);
      this._authService.nuevoUsuario({email: this.forma.get('email').value, password: this.forma.get('password').value, name: this.forma.get('name').value })
      .subscribe( resp => {
        console.log(resp);
      }, (err) => {
        console.log(err.error.error.message);
      });
      let user: User;
      user.name = this.forma.get('name').value;
      user.email = this.forma.get('email').value;
      this.firebase.addAdmin(user);
    }
  }

}
