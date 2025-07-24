import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { WorkoutsRoutingModule } from "./workouts-routing.module";

import { WorkoutsComponent } from "./workouts.component";
import { WorkoutCreateComponent } from "./components/workout-create/workout-create.component";
import { WorkoutLogListComponent } from "./components/workout-log-list/workout-log-list.component";
import { WorkoutLogDetailComponent } from "./components/workout-log-detail/workout-log-detail.component";
import { WorkoutActiveComponent } from './components/workout-active/workout-active.component';
import { SharedModule } from "../../shared/shared.module";

@NgModule({
    declarations: [
        WorkoutsComponent,
        WorkoutCreateComponent,
        WorkoutLogListComponent,
        WorkoutLogDetailComponent,
        WorkoutActiveComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        SharedModule,
        WorkoutsRoutingModule
    ]
})
export class WorkoutsModule { }