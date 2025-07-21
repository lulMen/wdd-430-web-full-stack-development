import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExerciseService } from '../../../../core/services/exercise.service';
import { Exercise } from '../../../../shared/models/exercise.model';

@Component({
  selector: 'app-exercise-detail',
  standalone: false,
  templateUrl: './exercise-detail.component.html',
  styleUrl: './exercise-detail.component.css'
})
export class ExerciseDetailComponent implements OnInit {
  exerciseForm!: FormGroup;
  private id!: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private exerciseService: ExerciseService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.exerciseForm = this.formBuilder.group({
      name: ['', Validators.required],
      muscleGroup: ['', Validators.required]
    });

    this.exerciseService
      .getById(this.id)
      .subscribe((exercise: Exercise) => {
        this.exerciseForm.patchValue(exercise);
      });
  }

  save() {
    const updates: Partial<Exercise> = this.exerciseForm.value;
    this.exerciseService
      .update(this.id, updates)
      .subscribe(() => {
        this.router.navigate(['/exercises']);
      });
  }

  delete() {
    this.exerciseService
      .delete(this.id)
      .subscribe(() => {
        this.router.navigate(['/exercises']);
      });
  }
}
