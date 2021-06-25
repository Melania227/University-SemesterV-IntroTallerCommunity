import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import firebase from 'firebase';
import { Ejercicio } from 'src/app/models/ejercicio.model';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  rootRef: firebase.database.Reference;

  constructor(private angularFirebaseDatabase: AngularFireDatabase) {
    const database = this.angularFirebaseDatabase.database;
    this.rootRef = database.ref('/Ejercicios/');
  }

  //Obtener todos los ejercicios :)
  getAllExercises(): Ejercicio[] {
    let list: Ejercicio[] = [];
    this.rootRef.once('value', (snapshot) => {
      snapshot.forEach(function (childSnapshot) {
        let data = childSnapshot.val();
        list.push(data);
      });
    });
    console.log(list);
    return list;
  }

  //Eliminar un ejercicio dado el código
  deleteExcercise(codigo: string): string {
    let mensaje: string;
    this.rootRef
      .child(codigo)
      .remove()
      .then(() => {
        mensaje = 'Ejercicio #' + codigo + ' eliminado.';
      })
      .catch((error) => {
        mensaje = 'No se pudo eliminar el ejercicio #' + codigo + '.';
      });
    return mensaje;
  }

  //Agrega ejercicio, retorna true si hubo error, false si no
  addExcercise(ejercicio): boolean {
    let recordKey = "0";
    let error = false;
    this.rootRef.once('value', (snapshot) => {
        recordKey = (snapshot.numChildren()+ 1).toString();
    }).then(() => {this.rootRef.child(recordKey).set(ejercicio).then(() => {error = false;}).catch((err) => {error = true;});
    });
    return error;
  }

  //Editar ejercicio, retorna true si hubo error, false si no
  editExcercise(ejercicio: Ejercicio): boolean {
    let recordKey = ejercicio.code.toString();
    let error = false;
    this.rootRef
      .child(recordKey)
      .update(ejercicio)
      .then(() => {
        error = false;
      })
      .catch((err) => {
        error = true;
      });
    return error;
  }

  //Ultimos 10 ejercicios agregados a la BD
  lastTenExcercises(): Ejercicio[] {
    let list: Ejercicio[] = [];
    this.rootRef.once('value', (snapshot) => {
      snapshot.forEach(function (childSnapshot) {
        let data = childSnapshot.val();
        list.push(data);
      });
    });
    console.log(list);
    return list;
  }

  //Ejercicios por nivel
  excercisesByLevel(level: number): Ejercicio[] {
    let list: Ejercicio[] = [];
    this.rootRef.once('value', (snapshot) => {
      snapshot.forEach(function (childSnapshot) {
        let data = childSnapshot.val();
        if (data.level == level.toString) {
          list.push(data);
          }
      });
    });
    console.log(list);
    return list;
  }

  //Ejercicios por categoria
  excercisesByCat(categoria: string): Ejercicio[] {
    let list: Ejercicio[] = [];
    this.rootRef.once('value', (snapshot) => {
      snapshot.forEach(function (childSnapshot) {
        let data = childSnapshot.val();
        if (data.section == categoria) {
          list.push(data);
          }
      });
    });
    console.log(list);
    return list;
  }

  filterbyCreator(name: string): Ejercicio[] {
    let list: Ejercicio[] = [];
    this.rootRef.once('value', (snapshot) => {
      snapshot.forEach(function (childSnapshot) {
        let data = childSnapshot.val();
        if (data.creator.includes(name)) {
          list.push(data);
          }
      });
    });
    console.log(list);
    return list;
  }
}
