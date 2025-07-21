import { NgModule } from "@angular/core";
import { ExerciseListComponent } from "./components/exercise-list/exercise-list.component";
import { ExerciseDetailComponent } from "./components/exercise-detail/exercise-detail.component";
import { ExerciseFormComponent } from "./components/exercise-form/exercise-form.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { ExercisesRoutingModule } from "./exercises-routing.module";

@NgModule({
    declarations: [
        ExerciseListComponent,
        ExerciseDetailComponent,
        ExerciseFormComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ExercisesRoutingModule
    ]
})
export class ExercisesModule { }