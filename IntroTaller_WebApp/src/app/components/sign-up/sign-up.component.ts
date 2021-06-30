import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { adminUser } from 'src/app/models/adminUser';
import { User } from 'src/app/models/loginUser';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { FirebaseService } from 'src/app/services/firebase.service';
import { NavegadorService } from 'src/app/services/navegador.service';


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
    private _authService: AuthService , private firebase: FirebaseService,
    private navService: NavegadorService
  ) { 
    this.createForm();
  }

  ngOnInit(): void {
    this.navService.changeData("false");
    //this.loggingService.logStatusChange(status);
    this.navService.statusUpdated.emit("GATITOS GORDOS");
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
        password: ['', [Validators.required, Validators.minLength(6)]],
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
      Swal.fire({
        allowOutsideClick: false,
        icon: 'warning',
        title: '¿Desea crear este nuevo usuario?',
        showDenyButton: true,
        showConfirmButton: true,
        confirmButtonColor: '#3085d6',
        denyButtonColor: '#d33',
        confirmButtonText: `Crear`,
        denyButtonText: `Cancelar`,
      }).then((result) => {
        if (result.isConfirmed) {
          console.log("lo logré");
          this._authService.nuevoUsuario({email: this.forma.get('email').value, password: this.forma.get('password').value, name: this.forma.get('name').value })
          .subscribe( resp => {
            console.log(resp);
            this.firebase.addAdmin({id:"", name: this.forma.get('name').value, email: this.forma.get('email').value});
            Swal.fire('Usuario añadido con éxito', '', 'success')
          }, (err) => {
            console.log(err.error.error.message);
            Swal.fire('Error en la creación del usuario', 'Este usuario puede ya existir, o por el contrario sus credenciales pueden ser erróneas. Por favor intente con otras credenciales.', 'error')
          });
        }
      });
    }
  }

}
