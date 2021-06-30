import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Ejercicio } from 'src/app/models/ejercicio.model';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.css']
})
export class NavbarAdminComponent implements OnInit {

  filterTerm: string;

  constructor(public firebase: FirebaseService, private router: Router) {
  
  }

  ngOnInit(): void {
    
  }
 
  logout(){
    localStorage.clear();
    this.router.navigate(['/home']);
  }

}
