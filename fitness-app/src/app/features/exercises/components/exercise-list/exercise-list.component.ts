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
  filterTerm: string = '';
  selectedToDelete?: Exercise;
  showConfirm = false;

  constructor(private exerciseService: ExerciseService) { }

  load() {
    this.exerciseService.getAll().subscribe({
      next: (list) => this.exercises = list,
      error: (error) => console.error('Could not load exercises', error)
    });
  }

  ngOnInit(): void {
    this.load();
  }

  onDelete(exercise: Exercise) {
    const ok = window.confirm(`Delete "${exercise.name}"?`);
    if (!ok) return;

    this.exerciseService
      .delete(exercise.id)
      .subscribe({
        next: () => this.load(),
        error: error => console.error('Delete failed:', error)
      });
  }
}
