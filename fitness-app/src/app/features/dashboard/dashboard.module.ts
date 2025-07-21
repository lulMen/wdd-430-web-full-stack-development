import { NgModule } from "@angular/core";
import { DashboardComponent } from "./dashboard.component";
import { SummaryChartComponent } from "./components/summary-chart/summary-chart.component";
import { CalendarViewComponent } from "./components/calendar-view/calendar-view.component";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../../shared/shared.module";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardService } from "../../core/services/dashboard.service";
import { FullCalendarModule } from "@fullcalendar/angular";

@NgModule({
    declarations: [
        DashboardComponent,
        SummaryChartComponent,
        CalendarViewComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        DashboardRoutingModule,
        FullCalendarModule
    ],
    providers: [
        DashboardService
    ]
})
export class DashboardModule { }