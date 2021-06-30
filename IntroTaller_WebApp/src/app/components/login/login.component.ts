import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { loginUser } from 'src/app/models/loginUser';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

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
    private _authService: AuthService ,
    private router: Router
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

  login(){
    if(this.forma.invalid){
      Object.values( this.forma.controls ).forEach (control =>{
        control.markAsTouched();
      })
    }
    else{
      this._authService.login({email: this.forma.get('email').value, password: this.forma.get('password').value})
      .subscribe( resp => {
        Swal.fire({
          allowOutsideClick: false,
          icon: 'success',
          title: '¡Sesión iniciada con éxito!',
          showConfirmButton: true,
          confirmButtonColor: '#3085d6',
          confirmButtonText: `Aceptar`,
        }).then((result) => {
          if (result.isConfirmed) {
            //redirecciona al home de administradores
            this.router.navigateByUrl("/home");
          }
        })
      }, (err) => {
        Swal.fire({
          allowOutsideClick: false,
          icon: 'error',
          title: '¡Inicio de sesión inválido!',
          text: 'Credenciales inválidas, intente nuevamente.',
          confirmButtonColor: '#3085d6'
        })
      });
    }
  }



}