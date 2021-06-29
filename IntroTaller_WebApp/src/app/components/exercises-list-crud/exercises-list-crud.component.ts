import { Component, OnInit } from '@angular/core';
import { Ejercicio } from 'src/app/models/ejercicio.model';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-exercises-list-crud',
  templateUrl: './exercises-list-crud.component.html',
  styleUrls: ['./exercises-list-crud.component.css']
})
export class ExercisesListCRUDComponent implements OnInit {
  calification = [false, false, false, false, false];
  exercises:Ejercicio[];

  constructor(
    public firebase: FirebaseService
  ) { }

  ngOnInit(): void {
    (this.firebase.getAllExercises().then((data) => this.exercises = data));
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
  }

}
