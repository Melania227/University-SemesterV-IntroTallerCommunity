import { Component, OnInit } from '@angular/core';
import { Ejercicio } from 'src/app/models/ejercicio.model';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-exercises-list',
  templateUrl: './exercises-list.component.html',
  styleUrls: ['./exercises-list.component.css']
})
export class ExercisesListComponent implements OnInit {
  prueba=[1,4,6.6,8,98,6,5,4,3,342,3,456,73,3];
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

}
