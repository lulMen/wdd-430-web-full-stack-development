import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
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
    events: []
  }

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.dashboardService.getCalendarEvents()
      .subscribe((event: CalendarEvent[]) => {
        this.calendarOptions = {
          ...this.calendarOptions,
          events: event
        }
      });
  }
}
