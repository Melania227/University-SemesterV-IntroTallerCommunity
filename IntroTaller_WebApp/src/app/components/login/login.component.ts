import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { loginUser } from 'src/app/models/loginUser';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  forma: FormGroup;
  userToLogin: loginUser

  constructor(
    private fb: FormBuilder,
    private _authService: AuthService 
  ) { 
    this.createForm();
  }

  ngOnInit(): void {
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
      this._authService.login({email: this.forma.get('email').value, password: this.forma.get('password').value})
      .subscribe( resp => {
        console.log(resp);
      }, (err) => {
        console.log(err.error.error.message);
      });
    }
  }



}