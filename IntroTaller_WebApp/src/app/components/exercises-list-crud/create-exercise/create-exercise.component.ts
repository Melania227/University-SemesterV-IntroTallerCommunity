import { Component, Input, OnInit } from '@angular/core';
import { CodeEditorModule, CodeModel } from '@ngstack/code-editor';

@Component({
  selector: 'app-create-exercise',
  templateUrl: './create-exercise.component.html',
  styleUrls: ['./create-exercise.component.css']
})
export class CreateExerciseComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  code = [
    `### Introducir un numero por teclado y decir si es par o impar`,
    `num = int(input('Introduzca un numero: '))`,
    `ifnum % 2 == 0:`,
    `print('Par')`,
    `else:`,
    `print('Impar')`
  ].join('\n');
  codeModel: CodeModel = {
    language: 'python',
    uri: '',
    value: this.code,
    dependencies: ['@types/node', '@ngstack/translate', '@ngstack/code-editor']
  };

  @Input() activeTheme = 'vs';
  @Input() readOnly = true;

  options = {
    contextmenu: true
  };
}
