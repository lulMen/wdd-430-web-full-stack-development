import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ExerciseService } from '../../../../core/services/exercise.service';
import { Exercise } from '../../../../shared/models/exercise.model';

@Component({
  selector: 'app-exercise-form',
  standalone: false,
  templateUrl: './exercise-form.component.html',
  styleUrl: './exercise-form.component.css'
})
export class ExerciseFormComponent implements OnInit {
  exerciseForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private exerciseService: ExerciseService
  ) { }

  ngOnInit(): void {
    this.exerciseForm = this.formBuilder.group({
      name: ['', Validators.required],
      muscleGroup: ['', Validators.required]
    });
  }

  create() {
    const payload: Omit<Exercise, 'id'> = this.exerciseForm.value;
    this.exerciseService
      .create(payload)
      .subscribe(() => {
        this.router.navigate(['/exercises']);
      });
  }
}
