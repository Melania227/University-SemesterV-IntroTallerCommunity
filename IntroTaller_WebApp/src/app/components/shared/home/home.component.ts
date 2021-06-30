import { Component, OnInit } from '@angular/core';
import { LevelInfo } from 'src/app/models/ejercicio.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { NavegadorService } from 'src/app/services/navegador.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  home: boolean = true;
  levels: LevelInfo[];
  flagLoading = true;

  constructor(public firebaseService: FirebaseService,
    private navService: NavegadorService) { 
    this.navService.changeData("true");
    //this.loggingService.logStatusChange(status);
    this.navService.statusUpdated.emit("GATITOS GORDOS");
  }

  ngOnInit(): void {
    this.firebaseService.getAllLevels().then((data)=>{
      this.levels = data;
      console.log(this.levels);
      this.flagLoading = false;
    });
  }

}
