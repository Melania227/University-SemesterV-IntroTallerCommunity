import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { Ejercicio } from 'src/app/models/ejercicio.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { MessageService } from 'src/app/services/messages.service';
import { NavegadorService } from 'src/app/services/navegador.service';

@Component({
  selector: 'app-exercises-list',
  templateUrl: './exercises-list.component.html',
  styleUrls: ['./exercises-list.component.css'],
  //providers: [MessageService]
})
export class ExercisesListComponent implements OnInit {

  filterTerm: string = "";

  calification = [false, false, false, false, false];
  exercises: Ejercicio[];
  flagLoading: boolean = true;
  @Input() isHome: boolean;
  titulo: string;

  id: string;
  private sub: any;
  subscription: Subscription;

  constructor(
    public firebase: FirebaseService, private route: ActivatedRoute, private searchService: MessageService,
    private navService: NavegadorService
  ) {
    this.searchService.statusUpdated.subscribe(
      (status:string) =>
      { 
        this.filterTerm = this.searchService.filterTerm; 
        if (this.filterTerm == "") console.log("vacio");
      } );
      this.navService.changeData("true");
    //this.loggingService.logStatusChange(status);
    this.navService.statusUpdated.emit("GATITOS GORDOS");
    
   }

  ngOnInit(): void {
    
    if (this.isHome) {
      (this.firebase.lastTenExcercises().then((data) => {
        this.exercises = data.reverse();
        setTimeout(() => { this.flagLoading = false; }, 500);
      }));
      this.titulo = "Ejercicios recientemente agregados"
    }
    else {
      this.sub = this.route.params.subscribe((params) => {
        this.id = params['type'];
      });
      switch(this.id){
        case "category.section":{
          let cat = localStorage.getItem("categoria");
          localStorage.removeItem("categoria");
          this.firebase.excercisesByCat(cat).then((data) => {
            this.exercises = data
            setTimeout(() => { this.flagLoading = false; }, 500);
            this.titulo = cat;
          });
          break;
        }
        case "0":{
          (this.firebase.excercisesByLevel(this.id).then((data) => {
            this.exercises = data
            setTimeout(() => { this.flagLoading = false; }, 500);
            this.titulo = "Ejercicios sin nivel"
          }));
          break;
        }
        case "1":{
          (this.firebase.excercisesByLevel(this.id).then((data) => {
            this.exercises = data
            setTimeout(() => { this.flagLoading = false; }, 500);
            this.titulo = "Ejercicios nivel 1"
          }));
          break;
        }
        case "2":{
          (this.firebase.excercisesByLevel(this.id).then((data) => {
            this.exercises = data
            setTimeout(() => { this.flagLoading = false; }, 500);
            this.titulo = "Ejercicios nivel 2"
          }));
          break;
        }
        case "3":{
          (this.firebase.excercisesByLevel(this.id).then((data) => {
            this.exercises = data
            setTimeout(() => { this.flagLoading = false; }, 500);
            this.titulo = "Ejercicios nivel 3"
          }));
          break;
        }
        case "4":{
          (this.firebase.excercisesByLevel(this.id).then((data) => {
            this.exercises = data
            setTimeout(() => { this.flagLoading = false; }, 500);
            this.titulo = "Ejercicios nivel 4"
          }));
          break;
        }
        case "5":{
          (this.firebase.excercisesByLevel(this.id).then((data) => {
            this.exercises = data
            setTimeout(() => { this.flagLoading = false; }, 500);
            this.titulo = "Ejercicios nivel 5"
          }));
          break;
        }
        default:{
          (this.firebase.getAllExercises().then((data) => {
            this.exercises = data
            setTimeout(() => { this.flagLoading = false; }, 500);
            this.titulo = "Listado de ejercicios"
          }));
          break;
        }
      }

    }
    
 
  }

  getStars(exercise: Ejercicio) {
    this.calification = [false,false,false,false,false];
    for (let index = 0; index < exercise.level; index++) {
      this.calification[index] = true;
    }
    return this.calification;
  }

}
