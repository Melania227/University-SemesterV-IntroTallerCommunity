import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CodeModel } from '@ngstack/code-editor';
import { Ejercicio } from 'src/app/models/ejercicio.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-edit-exercise',
  templateUrl: './edit-exercise.component.html',
  styleUrls: ['./edit-exercise.component.css']
})
export class EditExerciseComponent implements OnInit {
  id: string;
  private sub: any;

  form: FormGroup;
  fileToUpload: File | null = null;
  code: string;
  textContent: string;
  btn_bool: Boolean;
  editable: Boolean;
  codeModel: CodeModel;
  @ViewChild('codeEditor') codeEditor_: ElementRef<HTMLInputElement>;

  constructor(private fb: FormBuilder, private us: FileUploadService, private firebase: FirebaseService, private route: ActivatedRoute) {
    this.createForm();
    this.sub = this.route.params.subscribe((params) => {
      this.id = params['id'];
    })
    }

  ngOnInit(): void {
    this.firebase.excercisesByID(this.id).then(value => this.fillform(value) );
    this.textContent = 'No se ha cargado ningún archivo';
    this.btn_bool= this.editable = false;
    this.code = '\n\n\n\n';
    this.codeModel = {
      language: 'python',
      uri: '',
      value: this.code,
      dependencies: [
        '@types/node',
        '@ngstack/translate',
        '@ngstack/code-editor',
      ],
    };
  }

  createForm() {
    this.form = this.fb.group({
      call: ['', Validators.required],
      examples: this.fb.array([]),
      solution: this.fb.group({
        inputs: this.fb.array([]),
        outputs: this.fb.array([]),
      }),
      name: ['', Validators.required],
      section: ['', Validators.required],
      details: [''],
    });
  }

  fillform(value: Ejercicio){
    if( value.solution.code.slice(-1) != "_"){
      this.code = value.solution.code;
      this.codeModel = {
        language: 'python',
        uri: '',
        value: this.code ,
        dependencies: [
          '@types/node',
          '@ngstack/translate',
          '@ngstack/code-editor',
        ],
      };
    }
    else{
      //this.us.getFile(value.solution.code);
      this.textContent = value.solution.code;
      this.btn_bool = this.editable = true;
    }
    this.form.reset(
      {
        call: value.call,
        name: value.name,
        section: value.section,
        details: value.details
      });
      value.examples.forEach (valor => this.examples.push(this.fb.group({
        call: [valor.call, Validators.required],
        result: [valor.result, Validators.required],
        comment: [valor.comment],
      })));
      value.solution.inputs.forEach (valor => this.inputs.push(this.fb.group({
        name: [valor.name, Validators.required],
        type: [valor.type, Validators.required],
      })));
      value.solution.outputs.forEach (valor => this.outputs.push(this.fb.group({
        name: [valor.name, Validators.required],
        type: [valor.type, Validators.required],
      })));
  }

  get solution() {
    return this.form.get('solution') as FormGroup;
  }

  get examples() {
    return this.form.get('examples') as FormArray;
  }

  get inputs() {
    return this.form.get('solution')['controls'].inputs as FormArray;
  }

  get outputs() {
    return this.form.get('solution')['controls'].outputs as FormArray;
  }

  get nombreInvalido() {
    return this.form.get('name').invalid && this.form.get('name').touched;
  }

  get catInvalido() {
    return this.form.get('section').invalid && this.form.get('section').touched;
  }

  get callInvalido() {
    return this.form.get('call').invalid && this.form.get('call').touched;
  }

  //INPUTS
  inputNInvalido(i: number) {
    return (
      this.inputs.at(i).get('name').invalid &&
      this.inputs.at(i).get('name').touched
    );
  }

  inputTInvalido(i: number) {
    return (
      this.inputs.at(i).get('type').invalid &&
      this.inputs.at(i).get('type').touched
    );
  }

  //OUTPUTS
  outputNInvalido(i: number) {
    return (
      this.outputs.at(i).get('name').invalid &&
      this.outputs.at(i).get('name').touched
    );
  }

  outputTInvalido(i: number) {
    return (
      this.outputs.at(i).get('type').invalid &&
      this.outputs.at(i).get('type').touched
    );
  }

  //EXAMPLES
  exampleCInvalido(i: number) {
    return (
      this.examples.at(i).get('call').invalid &&
      this.examples.at(i).get('call').touched
    );
  }

  exampleRInvalido(i: number) {
    return (
      this.examples.at(i).get('result').invalid &&
      this.examples.at(i).get('result').touched
    );
  }
 
  //Ejemplos dinamicos
  addExample() {
    this.examples.push(
      this.fb.group({
        call: ['', Validators.required],
        result: ['', Validators.required],
        comment: [''],
      })
    );
  }

  removeExample(i: number) {
    this.examples.removeAt(i);
  }

  //Inputs dinamicos
  addInput() {
    this.inputs.push(
      this.fb.group({
        name: ['', Validators.required],
        type: ['', Validators.required],
      })
    );
  }

  removeInput(i: number) {
    this.inputs.removeAt(i);
  }

  //Outputs dinamicos
  addOutput() {
    this.outputs.push(
      this.fb.group({
        name: ['', Validators.required],
        type: ['', Validators.required],
      })
    );
  }

  removeOutput(i: number) {
    this.outputs.removeAt(i);
  }

  //Files
  addCodeFile(event: any) {
    if (event.target.files.length != 0) {
      this.fileToUpload = event.target.files[0];
      this.btn_bool = this.editable = true;
      this.textContent = this.fileToUpload.name;
      
      function readFile(file){
        return new Promise((resolve,reject) => {
          var reader = new FileReader();
          reader.readAsText(file)
          reader.onload = function(){
            resolve(this.result)
          }
        })
      }
      
      readFile(this.fileToUpload).then( data => {
         typeof data === 'string'
        ? this.showCode(data)
        : undefined
      });
    }
  }

  removeCodeFile() {
    this.code = "";
    this.btn_bool = this.editable = false;
    this.fileToUpload = null;
    this.textContent = 'No se ha cargado ningún archivo';
    this.showCode("");
  }

  //Code
  addCodeText(event: any) {
    this.code = event;
    if(this.code  != "" && this.code != '\n\n\n\n')
      this.btn_bool = true;
  }

  showCode(data: string) {
    this.code = data;
      this.codeModel = {
      language: 'python',
      uri: '',
      value: this.code ,
      dependencies: [
        '@types/node',
        '@ngstack/translate',
        '@ngstack/code-editor',
      ],
    };
  }

  guardar() {
    
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach((control) => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach((innerControl) => {
            innerControl.markAllAsTouched();
          });
        } else {
          control.markAsTouched();
        }
      });
    }
    if (this.fileToUpload==null){
      this.form = this.fb.group({
        ...this.form.controls,
        code: this.code
      })
    }
    else{
      this.form = this.fb.group({
        ...this.form.controls,
        code: [
          'codes/' + this.fileToUpload.name + '_' + "code"
        ],
      })
    }
    let result:Ejercicio = this.form.value;
    
  }
}