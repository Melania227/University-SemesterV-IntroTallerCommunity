import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CodeModel } from '@ngstack/code-editor';
import { Ejercicio } from 'src/app/models/ejercicio.model';
import { FirebaseService } from 'src/app/services/firebase.service';


@Component({
  selector: 'app-exercises-details',
  templateUrl: './exercises-details.component.html',
  styleUrls: ['./exercises-details.component.css']
})
export class ExercisesDetailsComponent implements OnInit {
  calification: boolean[] = [false,false,false,false,false];
  showSolution: boolean = false;
  buttonText: string = "Mostrar solución";

  exercise: Ejercicio;

   examples = [];

   codeModel: CodeModel;

   options = {
      dimension:{
         height: 500,
         width:1000
       }
   };

   private id: string;
   private sub: any;
   flagLoading: boolean = true;
   code: string;
   CodeAllow:boolean;

  constructor( 
     public firebase: FirebaseService,
     private route: ActivatedRoute
  ) 
  { 
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
      this.examples = this.exercise.examples!=undefined?this.exercise.examples:[];
      
      setTimeout(() => { this.flagLoading = false;}, 500);
   }); 
  }

   ngOnInit(): void {
      this.CodeAllow = false;
      this.code = '#No se puede visualizar el código, lo sentimos :P\n\n\n\n';
   }

   getStars(exercise: Ejercicio){
      for (let index = 0; index < exercise.level; index++) {
        this.calification[index] = true;
      }
      return this.calification;
   }

  showSolutionClick(){
    this.showSolution = !this.showSolution;
    this.showSolution?this.buttonText = "Ocultar solución":this.buttonText = "Mostrar solución";
  }

  getGroups(arr:any, numGroups:number) {
   const perGroup = numGroups;
   return new Array(Math.ceil(arr.length / numGroups))
     .fill('')
     .map((_, i) => arr.slice(i * perGroup, (i + 1) * perGroup));
 }

 sizeExamples(){
    this.examples.length;
 }
 
 showCode(){
    if(this.CodeAllow){
      this.CodeAllow = false;
    }
    else{
      this.CodeAllow = true;
    }
 }


}
