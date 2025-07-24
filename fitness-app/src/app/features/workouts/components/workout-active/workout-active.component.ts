import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Workout } from '../../../../shared/models/workout.model';
import { WorkoutLog } from '../../../../shared/models/log.model';
import { WorkoutService } from '../../../../core/services/workout.service';
import { ExerciseService } from '../../../../core/services/exercise.service';
import { LogService } from '../../../../core/services/log.service';

@Component({
  selector: 'app-workout-active',
  standalone: false,
  templateUrl: './workout-active.component.html',
  styleUrl: './workout-active.component.css'
})
export class WorkoutActiveComponent implements OnInit {
  workout!: Workout;
  completed: boolean[] = [];
  exerciseMap: Record<string, string> = {};

  constructor(
    private route: ActivatedRoute,
    private workoutService: WorkoutService,
    private exerciseService: ExerciseService,
    private logService: LogService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.workoutService
      .getById(id)
      .subscribe(workout => {
        this.workout = workout;
        this.completed = workout.exercises.map(() => false);
      });

    this.exerciseService
      .getAll()
      .subscribe(exercises => {
        this.exerciseMap = exercises.reduce((match, exercise) => {
          match[exercise.id!] = exercise.name;
          return match;
        }, {} as Record<string, string>);
      });
  }

  toggleDone(index: number) {
    this.completed[index] = !this.completed[index];
  }

  cancel() {
    if (confirm('Cancel workout?')) {
      this.router.navigate(['/workouts']);
    }
  }

  complete() {
    const payload: Omit<WorkoutLog, 'id'> = {
      date: this.workout.date,
      exercises: this.workout.exercises.map(exercise => ({
        exerciseId: exercise.exerciseId,
        name: this.exerciseMap[exercise.exerciseId] || '',
        sets: exercise.sets,
        reps: exercise.reps,
        duration: exercise.duration
      }))
    }

    this.logService
      .create(payload)
      .subscribe({
        next: () => {
          this.router.navigate(['/workouts']);
        },
        error: error => {
          console.error('Failed saving log: ', error);
          alert('Could not save workout log. Please try again.');
        }
      });
  }
}
