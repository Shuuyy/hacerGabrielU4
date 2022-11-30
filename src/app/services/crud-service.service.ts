import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudServiceService {

  constructor(private firestore:AngularFirestore) { }

  saveStudent(student:any):Promise<any>{
    return this.firestore.collection('students').add(student);
  }

  getStudents():Observable<any>{
    return this.firestore.collection('students',ref=>ref.orderBy("date","desc")).snapshotChanges();
  }

  deleteStuden(id:string):Promise<any>{
    return this.firestore.collection('students').doc(id).delete();
  }
}
