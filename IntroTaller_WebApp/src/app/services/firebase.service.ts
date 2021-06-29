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
  async getAllExercises(): Promise<Ejercicio[]> {
    let list: Ejercicio[] = [];
    await this.rootRef.once('value', (snapshot) => {
      snapshot.forEach(function (childSnapshot) {
        let data = childSnapshot.val();
        list.push(data);
      });
    });
    return list;
  }

  //Eliminar un ejercicio dado el código
  async deleteExcercise(codigo: string): Promise<string> {
    let mensaje: string;
    await this.rootRef
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
  async addExcercise(ejercicio): Promise<boolean> {
    let recordKey = "0";
    let error = false;
    await this.rootRef.once('value', (snapshot) => {
        recordKey = (snapshot.numChildren()+ 1).toString();
    })
    ejercicio.code = recordKey;
    await this.rootRef.child(recordKey).set(ejercicio).then(() => {
      error = false;console.log(recordKey)
    }).catch((err) => {
      error = true; console.log(error)
    })
    return error;
  }

  

  //Editar ejercicio, retorna true si hubo error, false si no
  async editExcercise(ejercicio: Ejercicio): Promise<boolean> {
    let recordKey = ejercicio.code.toString();
    let error = false;
    await this.rootRef
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
  async lastTenExcercises(): Promise<Ejercicio[]> {
    let list: Ejercicio[] = [];
    await this.rootRef.once('value', (snapshot) => {
      snapshot.forEach(function (childSnapshot) {
        let data = childSnapshot.val();
        list.push(data);
      });
    });
    console.log(list);
    return list;
  }


  //Ejercicio por su código
  async excercisesByID(code: string): Promise<Ejercicio> {
    let exercise: Ejercicio;
    await this.rootRef.child(code).once('value', (snapshot) => {
      exercise = snapshot.val();
    });
    return exercise;
  }


  //Ejercicios por nivel
  async excercisesByLevel(level: string): Promise<Ejercicio[]> {
    let list: Ejercicio[] = [];
    await this.rootRef.once('value', (snapshot) => {
      snapshot.forEach(function (childSnapshot) {
        let data = childSnapshot.val();
        if (data.level == level) {
          list.push(data);
          }
      });
    });
    console.log(list);
    return list;
  }

  //Ejercicios por categoria
  async excercisesByCat(categoria: string): Promise<Ejercicio[]> {
    let list: Ejercicio[] = [];
    await this.rootRef.once('value', (snapshot) => {
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

  async filterbyCreator(name: string): Promise<Ejercicio[]> {
    let list: Ejercicio[] = [];
    await this.rootRef.once('value', (snapshot) => {
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
