import { Component, OnInit } from '@angular/core';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core';
import { Router } from '@angular/router';
import dayGridPlugin from '@fullcalendar/daygrid';

import { CalendarEvent, DashboardService } from '../../../../core/services/dashboard.service';

@Component({
  selector: 'app-calendar-view',
  standalone: false,
  templateUrl: './calendar-view.component.html',
  styleUrl: './calendar-view.component.css'
})
export class CalendarViewComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    timeZone: 'UTC',
    events: []
  }

  constructor(
    private dashboardService: DashboardService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.dashboardService.getCalendarEvents()
      .subscribe((events: CalendarEvent[]) => {
        this.calendarOptions = {
          ...this.calendarOptions,
          events,
          eventClick: (arg: EventClickArg) => this.onEventClick(arg)
        }
      });
  }

  private onEventClick(arg: EventClickArg) {
    const logId = arg.event.extendedProps['logId'];
    if (logId) {
      this.router.navigate(['/workouts', logId]);
    }
  }
}
