import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../../../../core/services/exercise.service';
import { Exercise } from '../../../../shared/models/exercise.model';

@Component({
  selector: 'app-exercise-list',
  standalone: false,
  templateUrl: './exercise-list.component.html',
  styleUrl: './exercise-list.component.css'
})
export class ExerciseListComponent implements OnInit {
  exercises: Exercise[] = [];

  constructor(private exerciseService: ExerciseService) { }

  ngOnInit(): void {
    this.exerciseService.getAll().subscribe({
      next: (list) => this.exercises = list,
      error: (error) => console.error('Could not load exercises', error)
    });
  }
}
