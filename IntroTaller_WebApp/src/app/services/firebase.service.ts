import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import firebase from 'firebase';
import { CategoriasInfo, Ejercicio, LevelInfo, Rating } from 'src/app/models/ejercicio.model';
import { User } from '../models/loginUser';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  rootRef: firebase.database.Reference;
  adminRef: firebase.database.Reference;
  starsRef: firebase.database.Reference;

  constructor(private angularFirebaseDatabase: AngularFireDatabase) {
    const database = this.angularFirebaseDatabase.database;
    this.rootRef = database.ref('/Ejercicios/');
    this.adminRef = database.ref('/Administradores/');
    this.starsRef = database.ref('/Rating/');
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
        this.starsRef.child(codigo).remove();
      })
      .catch((error) => {
        mensaje = 'No se pudo eliminar el ejercicio #' + codigo + '.';
      });
    return mensaje;
  }

  //Agrega ejercicio, retorna true si hubo error, false si no
  async addExcercise(ejercicio): Promise<string> {
    let recordKey  = "0";
    let error = false;
     await this.rootRef.limitToLast(1).once('value', snap => {
      snap.forEach(e => {
        let val: Ejercicio = e.val();
        recordKey = (parseInt(e.val().code)+1).toString();
        console.log(val)
      })    
    });
    console.log(recordKey);
    ejercicio.code = recordKey;
    await this.rootRef.child(recordKey).set(ejercicio).then(() => {
      this.starsRef.child(recordKey).set({"id":recordKey,"puntos":0,"votos":0}).then(() => {
      return recordKey;})
    })
    return recordKey;
  }

  async vote(code:string, val:number){
    let votesInfo: Rating;
    let error = false;
    await this.starsRef.child(code).once('value', (snapshot) => {
      votesInfo = snapshot.val();
      this.starsRef
      .child(code)
      .update({"id": votesInfo.id, "puntos": (Number(votesInfo.puntos)+Number(val)), "votos":(Number(votesInfo.votos)+1)})
      .then(() => {
        let value_ = ((Number(votesInfo.puntos)+Number(val))/(Number(votesInfo.votos+1)));
        this.excercisesByID(code).then(x => { 
            value_ > 5 ? x.level = 5 : x.level = parseInt(value_.toFixed(0));
            this.rootRef.child(code).update(x);
            error = false;
        })
      })
      .catch((err) => {
        error = true;
      });
    });
    return error;
  }

  async addAdmin(admin:User): Promise<string> {
    let recordKey  = "0";
    let error = false;
     await this.adminRef.limitToLast(1).once('value', snap => {
      snap.forEach(e => {
        recordKey = (parseInt(e.val().id)+1).toString();
      })    
    });
    console.log(recordKey);
    admin.id = recordKey;
    await this.adminRef.child(recordKey).set(admin).then(() => {
      return recordKey;
    })
    return recordKey;
  }
  

  async deleteAdmin(codigo: string): Promise<string> {
    let mensaje: string;
    await this.adminRef
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
  
  async adminByID(code: string): Promise<User> {
    let admin: User;
    await this.adminRef.child(code).once('value', (snapshot) => {
      admin = snapshot.val();
    });
    return admin;
  }

  async adminByEmail(email: string): Promise<User> {
    let admin: User;
    await this.adminRef.once('value', (snapshot) => {
      snapshot.forEach(function (childSnapshot) {
        let data = childSnapshot.val();
        console.log(data);
        if (data.email == email) {
          console.log(data.email);
          admin = data;
          }
      });
    });
    console.log(admin);
    return admin;
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
    await this.rootRef.orderByKey().limitToLast(10).once('value', (snapshot) => {
      snapshot.forEach(function (childSnapshot) {
        let data = childSnapshot.val();
        list.push(data);
      });
    });
    console.log(list);
    return list;
  }


    //Ultimos X ejercicios agregados a la BD
    async lastXExcercises(num: number): Promise<Ejercicio[]> {
      let list: Ejercicio[] = [];
      await this.rootRef.orderByKey().limitToLast(num).once('value', (snapshot) => {
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

  //Filtrar ejercicios y dar categorias existentes
  async getAllCategories(): Promise<CategoriasInfo[]> {
    let list: Ejercicio[] = [];
    await this.rootRef.once('value', (snapshot) => {
      snapshot.forEach(function (childSnapshot) {
        let data = childSnapshot.val();
        list.push(data);
      });
    });

    let categories: string[] = [];
    list.filter((elem)=>{
      categories.includes(elem.section)?categories:categories.push(elem.section);
    })
    let catInfo:CategoriasInfo[] = [];
    categories.forEach((elem)=>
      catInfo.push({section: elem, quantity: 0})
    );
    list.forEach((elem) =>{
      catInfo.filter( x => x.section == elem.section ? x.quantity+=1 : 0  )
    })
    return catInfo;
  }

  async getAllLevels(): Promise<LevelInfo[]> {
    let list: Ejercicio[] = [];
    await this.rootRef.once('value', (snapshot) => {
      snapshot.forEach(function (childSnapshot) {
        let data = childSnapshot.val();
        list.push(data);
      });
    });

    let levels: number[] = [0,1,2,3,4,5];
    let levelsInfo:LevelInfo[] = [];
    levels.forEach((elem)=>
      levelsInfo.push({level: elem, quantity: 0})
    );
    list.forEach((elem) =>{
      levelsInfo.filter( x => x.level == elem.level ? x.quantity+=1 : 0  )
    })
    return levelsInfo;
  }


}