
import { Injectable, EventEmitter } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavegadorService {

  public router =  "gato";
  statusUpdated = new EventEmitter<string>();

  
  changeData(data: string) {
    this.router = data;
  }

}
