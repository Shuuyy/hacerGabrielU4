import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { Notyf } from 'notyf';
import { CrudServiceService } from 'src/app/services/crud-service.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

 
  createStudent:FormGroup;
  submitted =false;
   notyf = new Notyf();
   @ViewChild(MatTable) table!: MatTable<any>;
  constructor(

    private fb: FormBuilder,
    private studentService : CrudServiceService) {
    this.createStudent =this.fb.group({
      name:['',[Validators.required]],
      lastName:['',[Validators.required]],
      calification:['',[Validators.required]],
      
    })

   }

  ngOnInit(): void {
    

  }


  saveStudent(){

   this.submitted=true;
   const buttons = document.getElementById('btns');
    if(buttons){
      buttons.style.display="none";
    }
   const student: any={
    name:this.createStudent.value.name,
    lastName:this.createStudent.value.lastName,
    calification:this.createStudent.value.calification,
    date:new Date(),
    updateDate:new Date(),
   }

 
   this.studentService.saveStudent(student).then(()=>{
    this.notyf.success({ 
      message: '--Usuario Guardado con Exito--',
     duration: 2500,
     icon: false,
     position: {
      x: 'right',
      y: 'top',
    }, 
   
    })
    this.submitted=false;
    if(buttons){
      buttons.style.display="block";
    }
   this.createStudent.reset();
  
   }).catch(error =>{

   })
   
  }

  


  reset(){
    this.createStudent.reset()
  }
}
