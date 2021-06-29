import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exercises-list',
  templateUrl: './exercises-list.component.html',
  styleUrls: ['./exercises-list.component.css']
})
export class ExercisesListComponent implements OnInit {
  prueba=[1,4,6.6,8,98,6,5,4,3,342,3,456,73,3];
  calification = [true, true, false, false, false];
  constructor() { }

  ngOnInit(): void {
  }

}
