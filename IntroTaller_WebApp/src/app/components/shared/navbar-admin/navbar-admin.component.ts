import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Ejercicio } from 'src/app/models/ejercicio.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { MessageService } from 'src/app/services/messages.service';
import { NavegadorService } from 'src/app/services/navegador.service';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.css'],
  //providers: [MessageService]
})
export class NavbarAdminComponent implements OnInit {

  @Input() filterTerm: string;
  permiso: boolean = true;
  
  constructor(public firebase: FirebaseService, private router: Router, private searchService: MessageService,  private navService: NavegadorService) {
    this.navService.statusUpdated.subscribe(
      (status:string) =>
      { 
        if (this.navService.router == "false") this.permiso = false;
        else  this.permiso = true;
      } );
  }

  ngOnInit(): void {
  
  }
 
  logout(){
    localStorage.clear();
    this.router.navigate(['/home']);
  }

  search(){
    this.searchService.changeData(this.filterTerm);
    //this.loggingService.logStatusChange(status);
    this.searchService.statusUpdated.emit("GATITOS GORDOS");
  }
}
