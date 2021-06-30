import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { Ejercicio } from 'src/app/models/ejercicio.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import Swal from 'sweetalert2';
import { MessageService } from 'src/app/services/messages.service';
import { NavegadorService } from 'src/app/services/navegador.service';
@Component({
  selector: 'app-exercises-list-crud',
  templateUrl: './exercises-list-crud.component.html',
  styleUrls: ['./exercises-list-crud.component.css']
})
export class ExercisesListCRUDComponent implements OnInit {

  filterTerm: string = "";
  calification = [false, false, false, false, false];
  exercises:Ejercicio[];
  flagLoading: boolean = true;
  subscription: Subscription;
  
  constructor(
    public firebase: FirebaseService, private searchService: MessageService, private navService: NavegadorService
    ) {
      this.navService.changeData("true");
      //this.loggingService.logStatusChange(status);
      this.navService.statusUpdated.emit("GATITOS GORDOS");
      this.searchService.statusUpdated.subscribe(
        (status:string) =>
        { 
          this.filterTerm = this.searchService.filterTerm; 
          if (this.filterTerm == "") console.log("vacio");
        } );
   }

  ngOnInit(): void {
    (this.firebase.getAllExercises().then((data) => {
      this.exercises = data
      setTimeout(() => { this.flagLoading = false;}, 500);
    }));
  }

  getStars(exercise: Ejercicio){
    this.calification = [false,false,false,false,false];
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
