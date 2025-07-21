import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ConfirmationDialogComponent } from './shared/components/confirmation-dialog/confirmation-dialog.component';
import { DurationPipe } from './shared/pipes/duration.pipe';
import { ExercisesComponent } from './features/exercises/exercises.component';
import { WorkoutsComponent } from './features/workouts/workouts.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { AppHeaderComponent } from './shared/components/app-header/app-header/app-header.component';

@NgModule({
  declarations: [
    AppComponent,
    ConfirmationDialogComponent,
    DurationPipe,
    ExercisesComponent,
    WorkoutsComponent,
    DashboardComponent,
    AppHeaderComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
