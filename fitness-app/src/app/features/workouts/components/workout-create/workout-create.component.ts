import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WorkoutService } from '../../../../core/services/workout.service';
// import { ExerciseService } from '../../../../core/services/exercise.service';
// import { Exercise } from '../../../../shared/models/exercise.model';
import { Workout } from '../../../../shared/models/workout.model';

@Component({
  selector: 'app-workout-create',
  standalone: false,
  templateUrl: './workout-create.component.html',
  styleUrl: './workout-create.component.css'
})
export class WorkoutCreateComponent implements OnInit {
  workoutForm!: FormGroup;
  // allExercises: Exercise[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private workoutService: WorkoutService,
    // private exerciseService: ExerciseService
  ) { }

  ngOnInit(): void {
    // this.exerciseService
    //   .getAll()
    //   .subscribe(exercises => {
    //     this.allExercises = exercises;
    //   });

    this.workoutForm = this.formBuilder.group({
      date: ['', Validators.required],
      exercises: this.formBuilder.array([])
    });
  }

  get exerciseControls() {
    return this.workoutForm.get('exercises') as FormArray;
  }

  addExercise() {
    this.exerciseControls.push(this.formBuilder.group({
      exerciseId: ['', Validators.required],
      sets: [1, [Validators.required, Validators.min(1)]],
      reps: [1, [Validators.required, Validators.min(1)]],
      duration: [0, [Validators.required, Validators.min(0)]]
    }));
  }

  removeExercise(index: number) {
    this.exerciseControls.removeAt(index);
  }

  startWorkout() {
    const payload: Omit<Workout, 'id'> = this.workoutForm.value;
    this.workoutService
      .create(payload)
      .subscribe(() => {
        /* navigate or give feedback */
      });
  }
}
