import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from "../environments/environment";
import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { HomeComponent } from './components/shared/home/home.component';
import { NavbarStudentComponent } from './components/shared/navbar-student/navbar-student.component';
import { NavbarAdminComponent } from './components/shared/navbar-admin/navbar-admin.component';
import { ExercisesDetailsComponent } from './components/shared/exercises-details/exercises-details.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { ExercisesListComponent } from './components/exercises-list/exercises-list.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ExercisesListCRUDComponent } from './components/exercises-list-crud/exercises-list-crud.component';
import { CreateExerciseComponent } from './components/exercises-list-CRUD/create-exercise/create-exercise.component';
import { EditExerciseComponent } from './components/exercises-list-CRUD/edit-exercise/edit-exercise.component';
import { CreateCategoryComponent } from './components/create-category/create-category.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarStudentComponent,
    NavbarAdminComponent,
    ExercisesDetailsComponent,
    FooterComponent,
    ExercisesListComponent,
    LoginComponent,
    SignUpComponent,
    ExercisesListCRUDComponent,
    CreateExerciseComponent,
    EditExerciseComponent,
    CreateCategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
