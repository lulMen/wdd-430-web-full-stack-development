import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ExercisesComponent } from './exercises.component';
import { ExerciseListComponent } from './components/exercise-list/exercise-list.component';
import { ExerciseFormComponent } from './components/exercise-form/exercise-form.component';
import { ExerciseDetailComponent } from './components/exercise-detail/exercise-detail.component';

const routes: Routes = [
  {
    path: '',
    component: ExercisesComponent,
    children: [
      { path: '', component: ExerciseListComponent },
      { path: 'new', component: ExerciseFormComponent },
      { path: ':id', component: ExerciseDetailComponent },
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
export class ExercisesRoutingModule { }
