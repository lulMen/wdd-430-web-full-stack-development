import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { AppHeaderComponent } from "./components/app-header/app-header/app-header.component";
import { DurationPipe } from "./pipes/duration.pipe";
import { ExerciseFilterPipe } from './pipes/exercise-filter.pipe';

@NgModule({
    declarations: [
        AppHeaderComponent,
        DurationPipe,
        ExerciseFilterPipe
    ],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [
        CommonModule,
        RouterModule,
        AppHeaderComponent,
        DurationPipe,
        ExerciseFilterPipe
    ]
})
export class SharedModule { }