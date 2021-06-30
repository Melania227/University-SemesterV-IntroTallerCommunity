import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Ejercicio } from 'src/app/models/ejercicio.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { MessageService } from 'src/app/services/messages.service';
import { NavegadorService } from 'src/app/services/navegador.service';
@Component({
  selector: 'app-navbar-student',
  templateUrl: './navbar-student.component.html',
  styleUrls: ['./navbar-student.component.css']
})
export class NavbarStudentComponent implements OnInit {

  @Input() filterTerm: string;
  permiso: boolean = true;

  constructor(public firebase: FirebaseService, private router: Router, private searchService: MessageService, private navService: NavegadorService) {
    this.navService.statusUpdated.subscribe(
      (status:string) =>
      { 
        if (this.navService.router == "false") this.permiso = false;
        else  this.permiso = true;
      } );
  }

  ngOnInit(): void {
  }

  search(){   
    this.searchService.changeData(this.filterTerm);
    //this.loggingService.logStatusChange(status);
    this.searchService.statusUpdated.emit("GATITOS GORDOS");
  }
}
