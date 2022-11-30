import {AfterViewInit, Component, OnInit,ViewChild,Output,EventEmitter } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {MatPaginator} from '@angular/material/paginator';
import {MatTable} from '@angular/material/table';
import { Notyf } from 'notyf';
import { Observable } from 'rxjs';
import { AppModule } from 'src/app/app.module';
import { CrudServiceService } from 'src/app/services/crud-service.service';



const ELEMENT_DATA: any = [];

@Component({
  selector: 'app-list-crud',
  templateUrl: './list-crud.component.html',
  styleUrls: ['./list-crud.component.css']
})


export class ListCrudComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'lastName', 'calification','actions'];
  dataSource = ELEMENT_DATA;
  students:any[]=[];
  notyf = new Notyf();
  @ViewChild(MatTable) table!: MatTable<any>;
  constructor(private studentService:CrudServiceService) { 
  
  }


  ngOnInit(): void {

 this.getStudent();
  }

getStudent(){
  
  this.studentService.getStudents().subscribe(res=>{
    this.students=[];
    res.forEach((element:any) => {
     this.students.push({
      id:element.payload.doc.id,
      ...element.payload.doc.data()
     })
    });

    this.dataSource=this.students;
    
  })
}

deleteStudent(id:string){
 
  this.studentService.deleteStuden(id).then(()=>{
    this.notyf.error({ 
      message: '--Usuario Eliminado con Exito--',
     duration: 2500,
     icon: false,
     position: {
      x: 'right',
      y: 'top',
    }, 
   
    })

  })

}



}
