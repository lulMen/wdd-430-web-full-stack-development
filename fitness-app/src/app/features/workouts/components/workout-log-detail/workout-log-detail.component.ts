import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { WorkoutLog } from '../../../../shared/models/log.model';
import { LogService } from '../../../../core/services/log.service';

@Component({
  selector: 'app-workout-log-detail',
  standalone: false,
  templateUrl: './workout-log-detail.component.html',
  styleUrl: './workout-log-detail.component.css'
})
export class WorkoutLogDetailComponent implements OnInit {
  log?: WorkoutLog;
  private id!: string;

  constructor(
    private route: ActivatedRoute,
    private logService: LogService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.logService
      .getById(this.id)
      .subscribe(log => {
        this.log = log;
      })
  }

  delete() {
    if (!this.log?.id || !confirm('Delete this log?')) return;
    this.logService
      .delete(this.log.id)
      .subscribe(() => {
        this.router.navigate(['/workouts']);
      })
  }
}
