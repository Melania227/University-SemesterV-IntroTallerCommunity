import { Component, OnInit } from '@angular/core';
import { Ejercicio } from 'src/app/models/ejercicio.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-exercises-list-crud',
  templateUrl: './exercises-list-crud.component.html',
  styleUrls: ['./exercises-list-crud.component.css']
})
export class ExercisesListCRUDComponent implements OnInit {
  calification = [false, false, false, false, false];
  exercises:Ejercicio[];
  flagLoading: boolean = true;

  constructor(
    public firebase: FirebaseService
  ) { }

  ngOnInit(): void {
    (this.firebase.getAllExercises().then((data) => {
      this.exercises = data
      setTimeout(() => { this.flagLoading = false;}, 500);
    }));
  }

  getStars(exercise: Ejercicio){
    for (let index = 0; index < exercise.level; index++) {
      this.calification[index] = true;
    }
    return this.calification;
  }

  deleteExercise(code: string){
    console.log(code);
    /* this.firebase.deleteExcercise(code).then((res) => console.log(res));
    setTimeout(function(){ window.location.reload(); }, 2000); */
    Swal.fire({
      allowOutsideClick: false,
      icon: 'warning',
      title: '¿Desea eliminar este ejercicio?',
      showDenyButton: true,
      showConfirmButton: true,
      confirmButtonColor: '#3085d6',
      denyButtonColor: '#d33',
      confirmButtonText: `Eliminar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        //this.firebase.deleteExcercise(code).then((res) => console.log(res));
        Swal.fire('Ejercicio eliminado con éxito', '', 'success').then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        })
      }
    })
  }

}
