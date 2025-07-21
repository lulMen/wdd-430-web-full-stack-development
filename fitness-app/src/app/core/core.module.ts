import { HttpClientModule } from "@angular/common/http";
import { NgModule, Optional, SkipSelf } from "@angular/core";
import { ExerciseService } from "./services/exercise.service";
import { WorkoutService } from "./services/workout.service";
import { LogService } from "./services/log.service";

@NgModule({
    imports: [HttpClientModule],
    providers: [
        ExerciseService,
        WorkoutService,
        LogService
    ]
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parent: CoreModule) {
        if (parent) throw new Error('CoreModule is already loaded.');
    }
}