import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { adminUser } from '../models/adminUser';
import { loginUser, User } from '../models/loginUser';
import { map } from 'rxjs/operators';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //NOTE: firebase properties: para usar el API de AUTH de firebase
  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apikey = 'AIzaSyDFIXkOpWjdDXZ62u4qtl8bdDeXPYmMBDs';

  userToken: string;


  //NOTE: Lo primero que hace el servicio es leerToken del localStorage
  constructor( private http: HttpClient,
    private _firebaseService: FirebaseService ,
     ) {
    this.leerToken();
  }

  // logout = remove del local storage el token
  // ya en FE, se hace logout y se redirecciona a login component
  logout() {
    localStorage.removeItem('token');
  }

  login( usuario: loginUser ) {

    //"...usuario" es pasar toda la data el usuario como js object,
    // más la propiedad para que firebase retorne un token
    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    //retorna el observable de http, con un pipe para guardar el token de una vez
    // en el local storage, que es el equivalente a estar logueado
    return this.http.post(
      `${ this.url }signInWithPassword?key=${ this.apikey }`,
      authData
    ).pipe(
      map( resp => {
        this.guardarToken( resp['idToken'] ); //queda en el LocalStorage
        this._firebaseService.adminByEmail(usuario.email).then((data) => {
          localStorage.setItem('nameAdmin', data.name);
        });
        return resp;
      })
    ); 

  }


  // NOTE: usa el API para crear un usuario
  nuevoUsuario( usuario: adminUser ) {
    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(
      `${ this.url }signUp?key=${ this.apikey }`,
      authData
    ).pipe(
      map( resp => {
        //this.guardarToken( resp['idToken'] ); //queda en el LocalStorage
        return resp;
      })
    );

  }


  //guarda el token y el tiempo en el LS
  private guardarToken( idToken: string ) {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);

    let hoy = new Date();
    hoy.setSeconds( 3600 );
    localStorage.setItem('expira', hoy.getTime().toString() );
  }

  // si está en local storage, lo asigna al atributo
  // sino, va en nulo para que vaya por uno nuevo
  leerToken() {
    if ( localStorage.getItem('token') ) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }
    return this.userToken;
  }

  //valida que el token exista
  estaAutenticado(): boolean {
    if ( this.userToken.length < 2 ) {
      return false;
    }

    //obtiene la fecha y hora de expiración
    const expira = Number(localStorage.getItem('expira'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);

    // si es válido o no
    if ( expiraDate > new Date() ) {
      return true;
    } else {
      return false;
    }


  } 

}
