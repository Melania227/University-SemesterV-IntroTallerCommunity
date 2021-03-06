import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CodeModel } from '@ngstack/code-editor';
import { Ejercicio } from 'src/app/models/ejercicio.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { NavegadorService } from 'src/app/services/navegador.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-exercise',
  templateUrl: './edit-exercise.component.html',
  styleUrls: ['./edit-exercise.component.css'],
})
export class EditExerciseComponent implements OnInit {
  id: string;
  private sub: any;

  ejercicio: Ejercicio;
  form: FormGroup;
  fileToUpload: File | null = null;
  code: string;
  textContent: string;
  btn_bool: Boolean;
  editable: Boolean;
  codeModel: CodeModel;
  archivoCambiado: Boolean;

  constructor(
    private fb: FormBuilder,
    private us: FileUploadService,
    private firebase: FirebaseService,
    private route: ActivatedRoute,
    private router: Router, private navService: NavegadorService
  ) {
    this.createForm();
    this.sub = this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
    this.archivoCambiado = false;
    this.firebase.excercisesByID(this.id).then((value) => this.fillform(value));
    this.textContent = 'No se ha cargado ningún archivo';
    this.btn_bool = this.editable = false;
    this.code = '#No se puede visualizar el código, lo sentimos :P\n\n\n\n';
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
    this.navService.changeData("false");
    //this.loggingService.logStatusChange(status);
    this.navService.statusUpdated.emit("GATITOS GORDOS");
  }

  ngOnInit(): void {
    
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

  fillform(value: Ejercicio) {
    console.log(value);
    this.ejercicio = value;
    if (value.solution.code.slice(-1) != '_') {
      this.code = value.solution.code;
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
    } else {
      //this.us.getFile(value.solution.code);
      this.textContent = value.solution.code;
      this.btn_bool = this.editable = true;
    }
    this.form.reset({
      call: value.call,
      name: value.name,
      section: value.section,
      details: value.details,
    });
    if (value.examples != undefined)
      value.examples.forEach((valor) =>
        this.examples.push(
          this.fb.group({
            call: [valor.call, Validators.required],
            result: [valor.result, Validators.required],
            comment: [valor.comment],
          })
        )
      );
    if (value.solution.inputs != undefined)
      value.solution.inputs.forEach((valor) =>
        this.inputs.push(
          this.fb.group({
            name: [valor.name, Validators.required],
            type: [valor.type, Validators.required],
          })
        )
      );
    if (value.solution.outputs != undefined)
      value.solution.outputs.forEach((valor) =>
        this.outputs.push(
          this.fb.group({
            name: [valor.name, Validators.required],
            type: [valor.type, Validators.required],
          })
        )
      );
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

      function readFile(file) {
        return new Promise((resolve, reject) => {
          var reader = new FileReader();
          reader.readAsText(file);
          reader.onload = function () {
            resolve(this.result);
          };
        });
      }

      readFile(this.fileToUpload).then((data) => {
        typeof data === 'string' ? this.showCode(data) : undefined;
      });
    }
  }

  removeCodeFile() {
    this.archivoCambiado = true;
    this.code = '';
    this.btn_bool = this.editable = false;
    this.fileToUpload = null;
    this.textContent = 'No se ha cargado ningún archivo';
    this.showCode('');
  }

  //Code
  addCodeText(event: any) {
    this.archivoCambiado = true;
    this.code = event;
    if (this.code != '' && this.code != '\n\n\n\n') this.btn_bool = true;
  }

  showCode(data: string) {
    this.code = data;
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

  guardar() {
    let result: Ejercicio = this.form.value;
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
    else {
      result.level = this.ejercicio.level;
      result.created = this.ejercicio.created;
      result.creator = this.ejercicio.creator;
      result.code = this.ejercicio.code;
      if (this.ejercicio.solution.code.slice(-1) === '_') {
        if (this.archivoCambiado) {
          if (this.fileToUpload == null) {
            result.solution.code = this.code;
            console.log(this.ejercicio.created+'-'+this.ejercicio.code+this.ejercicio.solution.code);
            this.us.deleteFile(this.ejercicio.created+'-'+this.ejercicio.code+this.ejercicio.solution.code);
          }
          else {
            result.solution.code = this.fileToUpload.name+"_";
            this.us.deleteFile(this.ejercicio.created + '-' + this.ejercicio.code + this.ejercicio.solution.code).then(() =>
              this.us.uploadFile(this.fileToUpload, result.created + '-' + this.ejercicio.code));
          }
        }
        else {
          result.solution.code = this.ejercicio.solution.code;
        }
      }
      else {
        if (this.archivoCambiado) {
          if (this.fileToUpload == null) {
            result.solution.code = this.code;
          }
          else {
            result.solution.code = this.fileToUpload.name+"_";
            this.us.uploadFile(this.fileToUpload, result.created + '-' + this.ejercicio.code);
          }
        } else {
          result.solution.code = this.ejercicio.solution.code;
        }
       
      }
      this.firebase.editExcercise(result);
      Swal.fire({
        allowOutsideClick: false,
        icon: 'success',
        title: '¡Ejercicio editado con éxito!',
        showConfirmButton: true,
        confirmButtonColor: '#3085d6',
        confirmButtonText: `Aceptar`,
      }).then((result) => {
        if (result.isConfirmed) {
          console.log("Confirmado");
          //redirecciona al home de administradores
          //this.router.navigateByUrl("/home");
        }
      });
    }
  }
}
