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
import { ExercisesAdminsComponent } from './components/exercises-admins/exercises-admins.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CodeEditorModule } from '@ngstack/code-editor';
import { ModalModule } from 'ngb-modal';

import { APP_ROUTING } from './app.routes';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchFilterPipe } from './search-filter.pipe';
import { CategoryCarouselComponent } from './components/shared/category-carousel/category-carousel.component';

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
    ExercisesAdminsComponent,
    CategoryCarouselComponent,
    SearchFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    FormsModule,
    ModalModule,
    HttpClientModule,
    CodeEditorModule.forRoot(),
    APP_ROUTING,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }