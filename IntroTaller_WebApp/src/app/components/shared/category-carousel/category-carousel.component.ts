import { Component, OnInit } from '@angular/core';
import { CategoriasInfo } from 'src/app/models/ejercicio.model';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-category-carousel',
  templateUrl: './category-carousel.component.html',
  styleUrls: ['./category-carousel.component.css']
})
export class CategoryCarouselComponent implements OnInit {
  categories:CategoriasInfo[];
  flagLoading: boolean = true;
  
  constructor(
    public _firebaseService: FirebaseService
  ) { 
  }

  ngOnInit() {
    this._firebaseService.getAllCategories().then((data)=>{
      this.categories = data;
      setTimeout(() => { this.flagLoading = false; }, 500);
    });
  }

  getGroups(arr:any, numGroups:number) {
    const perGroup = numGroups;
    return new Array(Math.ceil(arr.length / numGroups))
      .fill('')
      .map((_, i) => arr.slice(i * perGroup, (i + 1) * perGroup));
  }

  listar(categoria:string){
    localStorage.setItem('categoria',categoria);
  }
}
