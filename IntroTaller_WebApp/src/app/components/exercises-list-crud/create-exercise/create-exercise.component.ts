import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CodeEditorModule, CodeModel } from '@ngstack/code-editor';

@Component({
  selector: 'app-create-exercise',
  templateUrl: './create-exercise.component.html',
  styleUrls: ['./create-exercise.component.css']
})
export class CreateExerciseComponent implements OnInit {

  form : FormGroup;
  fileToUpload: File | null = null;
  
  constructor(private fb:FormBuilder) { 
    this.createForm();
    console.log(this.inputs);
    console.log(this.outputs);
    console.log(this.examples);
  }

  ngOnInit(): void {
  }

  get solution(){
    return this.form.get("solution") as FormGroup;
  }

  get examples(){
    return this.form.get("examples") as FormArray;
  }

  get inputs(){
    return this.form.get('solution')['controls'].inputs as FormArray;
  }

  get outputs(){
    return this.form.get('solution')['controls'].outputs as FormArray;
  }

  get nombreInvalido(){
    return this.form.get('nombre').invalid && this.form.get('nombre').touched ;
  }

  createForm(){
    this.form = this.fb.group(
      {
        call: ['', Validators.required],
        examples: this.fb.array([]),
        solution: this.fb.group(
          {
            inputs:  this.fb.array([]),
            code: [ '', Validators.required],
            outputs:  this.fb.array([]),
          }
        ),
        name: ['', Validators.required],
        section: ['', Validators.required],
        details: ['', Validators.required]
      }
    );
    this.inputs.push(this.fb.group({
      name: '',
      type: ''    }));
    this.outputs.push(this.fb.group({
      name: '',
      type: ''    }));
    this.examples.push(this.fb.group({
      call: ['', Validators.required],
      result: ['', Validators.required],
      comment: [''],
    }));
  }
  
  //Ejemplos dinamicos
  addExample() {
    this.examples.push(this.fb.group({
      call: ['', Validators.required],
      result: ['', Validators.required],
      comment: [''],
    }));
  }

  removeExample(i:number) {
    this.examples.removeAt(i);
  }

  //Inputs dinamicos
  addInput() {
    this.inputs.push(this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required]
    }));
  }

  removeInput(i:number) {
    console.log(this.inputs.at(i));
    this.inputs.removeAt(i);
  }

   //Outputs dinamicos
  addOutput() {
    this.outputs.push(this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required]
    }));
  }

  removeOutput(i:number) {
    this.outputs.removeAt(i);
  }



 
  change(event:any) {
    console.log(event.target.files);
    document.getElementById('file-chosen').textContent = "hola";

  }



  

  codeModel: CodeModel = {
    language: 'python',
    uri: '',
    value: "",
    dependencies: ['@types/node', '@ngstack/translate', '@ngstack/code-editor']
  };




  guardar(){
    if(this.form.invalid){
      Object.values( this.form.controls ).forEach (control =>{
        if (control instanceof FormGroup){
             Object.values(control.controls).forEach (innerControl =>{
              innerControl.markAllAsTouched();
             })

        }else {
          control.markAsTouched();
        }
        
      })
      
    }

    console.log(this.form);

  }


}