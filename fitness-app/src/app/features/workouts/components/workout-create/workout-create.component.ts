import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { WorkoutService } from '../../../../core/services/workout.service';
import { Workout } from '../../../../shared/models/workout.model';
import { Exercise } from '../../../../shared/models/exercise.model';
import { ExerciseService } from '../../../../core/services/exercise.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workout-create',
  standalone: false,
  templateUrl: './workout-create.component.html',
  styleUrl: './workout-create.component.css'
})
export class WorkoutCreateComponent implements OnInit {
  allExercises: Exercise[] = [];
  workoutForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private workoutService: WorkoutService,
    private exerciseService: ExerciseService
  ) { }

  ngOnInit(): void {
    this.workoutForm = this.formBuilder.group({
      date: [new Date().toISOString().substring(0, 10), Validators.required],
      exercises: this.formBuilder.array([])
    });

    this.addExercise();

    this.exerciseService
      .getAll()
      .subscribe(exercises => {
        this.allExercises = exercises;
      });
  }

  get exercises() {
    return this.workoutForm.get('exercises') as FormArray;
  }

  addExercise() {
    if (!this.workoutForm) return;

    this.exercises.push(this.formBuilder.group({
      exerciseId: ['', Validators.required],
      sets: [1, [Validators.required, Validators.min(1)]],
      reps: [1, [Validators.required, Validators.min(1)]],
      duration: [0, [Validators.required, Validators.min(0)]]
    }));
  }

  removeExercise(index: number) {
    this.exercises.removeAt(index);
  }

  startWorkout() {
    const raw = this.workoutForm.value as {
      date: string;
      exercises: Array<{
        exerciseId: string;
        sets: number;
        reps: number;
        duration: number
      }>;
    }
    const filtered = raw.exercises.filter(exercise => !!exercise.exerciseId);
    if (!filtered.length) {
      return alert('Please add at least one exercise before starting.');
    }
    const payload = { date: raw.date, exercises: filtered };

    this.workoutService
      .create(payload)
      .subscribe(workout => {
        this.router.navigate(['workouts', 'active', workout.id]);
      });
  }
}
