import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { ExercisesComponent } from "./exercises.component";
import { ExerciseListComponent } from "./components/exercise-list/exercise-list.component";
import { ExerciseDetailComponent } from "./components/exercise-detail/exercise-detail.component";
import { ExerciseFormComponent } from "./components/exercise-form/exercise-form.component";

import { ExercisesRoutingModule } from "./exercises-routing.module";
import { SharedModule } from "../../shared/shared.module";

@NgModule({
    declarations: [
        ExercisesComponent,
        ExerciseListComponent,
        ExerciseDetailComponent,
        ExerciseFormComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        SharedModule,
        ExercisesRoutingModule,
    ]
})
export class ExercisesModule { }