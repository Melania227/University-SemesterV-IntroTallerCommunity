import { Component, OnInit } from '@angular/core';
import { CodeModel } from '@ngstack/code-editor';
import { Ejercicio } from 'src/app/models/ejercicio.model';

@Component({
  selector: 'app-exercises-details',
  templateUrl: './exercises-details.component.html',
  styleUrls: ['./exercises-details.component.css']
})
export class ExercisesDetailsComponent implements OnInit {
  calification: boolean[];
  showSolution: boolean = false;
  buttonText: string = "Mostrar solución";

  exercise: Ejercicio =  {
    "call":"eliminar(ele, a)",
    "creator":"Diego Mora",
    "code": 77,
    "examples":[
       {
          "call":"eliminar(30, [52, [30, 15, [35, [], 38]], [70, [60, [], 65], 80]])",
          "result":"[52, [15, [], [35, [], 38]], [70, [60, [], 65], 80]]",
          "comment":""
       },
       {
          "call":"eliminar(120,[100, [80, [70, 65, 74], 85], [120, 110, []]])",
          "result":"[100, [80, [70, 65, 74], 85], 110]",
          "comment":""
       },
       {
          "call":"eliminar(35, [20,[10, 5, 15],[30, 25, 35]])",
          "result":"[20, [10, 5, 15], [30, 25, []]]",
          "comment":""
       }
    ],
    "solution":{
       "outputs":[
          {
             "name":"Una lista",
             "type":"Lista que representa un árbol"
          }
       ],
       "code":"def eliminar(ele, a):\n    if a == []:\n        return []\n    elif ele < raiz(a):\n        return arbol (raiz(a), eliminar(ele, hijoizq(a)),hijoder(a))\n    elif ele > raiz(a):\n        print(raiz(a),hijoizq(a),hijoder(a))\n        return arbol (raiz(a),hijoizq(a), eliminar(ele, hijoder(a)))\n    # nodo no tiene hijos\n    elif hijoder(a) == [] and hijoizq(a) == []:\n        return []\n    # nodo no tiene hijo izquierdo\n    elif hijoizq(a) == []:\n        return hijoder(a)\n    # nodo no tiene hijo derecho\n    elif hijoder(a) == []:\n        return hijoizq(a)\n    else:\n        return arbol(mayor(hijoizq(a)),eliminar(mayor(hijoizq(a)),hijoizq(a)),hijoder(a)) ",
       "inputs":[
          {
             "name":"ele",
             "type":"Un número entero que representa un nodo en el árbol"
          },
          {
             "name":"a",
             "type":"Lista que representa un árbol"
          }
       ]
    },
    "level":3,
    "created": "2021-06-17",
    "name":"Eliminar nodo",
    "section":"Árboles",
    "details":"Realice una función que elimine un nodo de un árbol, tomando en cuenta los siguientes casos:\ncaso1: Borrar un nodo sin hijos, se borra simplemente.\ncaso2: Borrar un nodo con 1 hijo, el hijo lo sustituye.\ncaso3: Sustituirlo por el mayor de los menores o el menor de los mayores."
  };

   examples = [];

   codeModel: CodeModel = {
      language: 'python',
      uri: '',
      value: this.exercise.solution.code,
      dependencies: ['@types/node', '@ngstack/translate', '@ngstack/code-editor']
   };

   options = {
      dimension:{
         height: 500,
         width:1000
       }
   };

  constructor() { }

  ngOnInit(): void {
    this.calification = [true, true, true, false, false]
    this.examples = this.exercise.examples;
  }

  showSolutionClick(){
    this.showSolution = !this.showSolution;
    this.showSolution?this.buttonText = "Ocultar solución":this.buttonText = "Mostrar solución";
  }

}
