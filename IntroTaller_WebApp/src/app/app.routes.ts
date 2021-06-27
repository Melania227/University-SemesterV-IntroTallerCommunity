import { RouterModule, Routes } from "@angular/router";
import { CreateCategoryComponent } from "./components/create-category/create-category.component";
import { ExercisesAdminsComponent } from "./components/exercises-admins/exercises-admins.component";
import { CreateExerciseComponent } from "./components/exercises-list-CRUD/create-exercise/create-exercise.component";
import { EditExerciseComponent } from "./components/exercises-list-CRUD/edit-exercise/edit-exercise.component";
import { ExercisesListCRUDComponent } from "./components/exercises-list-crud/exercises-list-crud.component";
import { ExercisesListComponent } from "./components/exercises-list/exercises-list.component";
import { LoginComponent } from "./components/login/login.component";
import { ExercisesDetailsComponent } from "./components/shared/exercises-details/exercises-details.component";
import { HomeComponent } from "./components/shared/home/home.component";
import { SignUpComponent } from "./components/sign-up/sign-up.component";

const APP_ROUTES : Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignUpComponent},
    {path: 'create-category', component: CreateCategoryComponent},
    {path: 'exercises', component: ExercisesListComponent},
    {path: 'exercises-admin', 
        component: ExercisesAdminsComponent,
        children:[
            {path: "", redirectTo: "list", pathMatch: "full"},
            {path: 'list', component: ExercisesListCRUDComponent, },
            {path: 'add', component: CreateExerciseComponent},
            {path: 'edit/:id', component: EditExerciseComponent},
            {path: 'details/:id', component: ExercisesDetailsComponent}        
        ]
    },
    {path: 'details/:id', component: ExercisesDetailsComponent},
    {path: '**', pathMatch: 'full', redirectTo: 'login'} /* PREDETERMINADA */
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {useHash:true});