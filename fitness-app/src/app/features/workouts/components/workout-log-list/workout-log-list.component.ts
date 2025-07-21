import { Component, OnInit } from '@angular/core';
import { WorkoutLog } from '../../../../shared/models/log.model';
import { LogService } from '../../../../core/services/log.service';

@Component({
  selector: 'app-workout-log-list',
  standalone: false,
  templateUrl: './workout-log-list.component.html',
  styleUrl: './workout-log-list.component.css'
})
export class WorkoutLogListComponent implements OnInit {
  logs: WorkoutLog[] = [];

  constructor(private logService: LogService) { }

  ngOnInit(): void {
    this.logService
      .getAll()
      .subscribe(logs => {
        this.logs = logs
      });
  }
}
