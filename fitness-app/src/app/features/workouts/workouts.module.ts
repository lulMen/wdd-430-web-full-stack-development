import { NgModule } from "@angular/core";
import { WorkoutCreateComponent } from "./components/workout-create/workout-create.component";
import { WorkoutLogListComponent } from "./components/workout-log-list/workout-log-list.component";
import { WorkoutLogDetailComponent } from "./components/workout-log-detail/workout-log-detail.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { WorkoutsRoutingModule } from "./workouts-routing.module";

@NgModule({
    declarations: [
        WorkoutCreateComponent,
        WorkoutLogListComponent,
        WorkoutLogDetailComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        WorkoutsRoutingModule
    ]
})
export class WorkoutsModule { }