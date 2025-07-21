import { Component, OnInit } from '@angular/core';
import { WorkoutLog } from '../../../../shared/models/log.model';
import { ActivatedRoute } from '@angular/router';
import { LogService } from '../../../../core/services/log.service';

@Component({
  selector: 'app-workout-log-detail',
  standalone: false,
  templateUrl: './workout-log-detail.component.html',
  styleUrl: './workout-log-detail.component.css'
})
export class WorkoutLogDetailComponent implements OnInit {
  log!: WorkoutLog;

  constructor(
    private route: ActivatedRoute,
    private logService: LogService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.logService
      .getById(id)
      .subscribe(log => {
        this.log = log;
      })
  }
}
