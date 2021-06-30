
import { Injectable, EventEmitter } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  public filterTerm =  "gato";
  statusUpdated = new EventEmitter<string>();

  
  changeData(data: string) {
    this.filterTerm = data;
  }

}


