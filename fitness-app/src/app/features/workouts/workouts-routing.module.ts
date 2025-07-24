import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { WorkoutsComponent } from './workouts.component';
import { WorkoutLogListComponent } from './components/workout-log-list/workout-log-list.component';
import { WorkoutLogDetailComponent } from './components/workout-log-detail/workout-log-detail.component';
import { WorkoutCreateComponent } from './components/workout-create/workout-create.component';
import { WorkoutActiveComponent } from './components/workout-active/workout-active.component';

const routes: Routes = [
  {
    path: '',
    component: WorkoutsComponent,
    children: [
      { path: '', component: WorkoutLogListComponent },
      { path: 'new', component: WorkoutCreateComponent },
      { path: 'active/:id', component: WorkoutActiveComponent },
      { path: ':id', component: WorkoutLogDetailComponent }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class WorkoutsRoutingModule { }
