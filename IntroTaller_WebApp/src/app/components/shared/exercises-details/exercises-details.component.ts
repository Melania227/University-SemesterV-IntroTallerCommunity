import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CodeModel } from '@ngstack/code-editor';
import { Ejercicio } from 'src/app/models/ejercicio.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { NavegadorService } from 'src/app/services/navegador.service';
import Swal from 'sweetalert2';


@Component({
   selector: 'app-exercises-details',
   templateUrl: './exercises-details.component.html',
   styleUrls: ['./exercises-details.component.css']
})
export class ExercisesDetailsComponent implements OnInit {
   public calification: boolean[] = Array(5).fill(false);
   showSolution: boolean = false;
   buttonText: string = "Mostrar solución";

   exercise: Ejercicio;

   examples = [];

   codeModel: CodeModel;

   options = {
      dimension: {
         height: 500,
         width: 1000
      }
   };

   private id: string;
   private sub: any;
   flagLoading: boolean = true;
   code: string;
   CodeAllow: boolean;
   ref: string;
   actualLevel: number;

   constructor(private us: FileUploadService,
      public firebase: FirebaseService,
      private route: ActivatedRoute, private navService: NavegadorService
   ) {
      this.sub = this.route.params.subscribe((params) => {
         this.id = params['id'];
      });

      this.firebase.excercisesByID(this.id).then((data) => {
         this.exercise = data;
         this.codeModel = {
            language: 'python',
            uri: '',
            value: this.exercise.solution.code,
            dependencies: ['@types/node', '@ngstack/translate', '@ngstack/code-editor']
         };
         this.examples = this.exercise.examples != undefined ? this.exercise.examples : [];
         this.actualLevel = this.exercise.level;
         setTimeout(() => { this.flagLoading = false; }, 500);
      });
      this.navService.changeData("false");
      //this.loggingService.logStatusChange(status);
      this.navService.statusUpdated.emit("GATITOS GORDOS");
    }

   ngOnInit(): void {
      this.CodeAllow = false;
      this.code = '#No se puede visualizar el código, lo sentimos :P\n\n\n\n';
   }

   getStars(exercise: Ejercicio) {
      for (let index = 0; index < this.actualLevel; index++) {
         this.calification[index] = true;
      }
      return this.calification;
   }

   showSolutionClick() {
      this.showSolution = !this.showSolution;
      this.showSolution ? this.buttonText = "Ocultar solución" : this.buttonText = "Mostrar solución";
   }

   getGroups(arr: any, numGroups: number) {
      const perGroup = numGroups;
      return new Array(Math.ceil(arr.length / numGroups))
         .fill('')
         .map((_, i) => arr.slice(i * perGroup, (i + 1) * perGroup));
   }

   sizeExamples() {
      this.examples.length;
   }

   showCode() {
      if (this.exercise.solution.code.slice(-1) != '_') {
         if(this.CodeAllow){
            this.CodeAllow = false;
         }
         else{
            this.CodeAllow = true;
         }
      }
      else{
      this.us.getFile(this.exercise.created + '-' + this.exercise.code + this.exercise.solution.code).then(result => window.open(result, '_blank').focus());
      }
   }

   public rate(rating: number) {
      this.actualLevel = rating;
      this.calification = this.calification.map((_, i) => rating > i);
      this.firebase.vote((this.exercise.code).toString(),rating)
      console.log('rating', rating);
      Swal.fire({
         allowOutsideClick: false,
         icon: 'success',
         title: '¡Gracias por tu voto!',
         showConfirmButton: true,
         confirmButtonColor: '#3085d6',
       });
    }

}
