import { AfterViewInit, Component, ElementRef, ViewChild, } from '@angular/core';
import { Chart } from 'chart.js/auto';

import { DashboardService, VolumePoint } from '../../../../core/services/dashboard.service';

@Component({
  selector: 'app-summary-chart',
  standalone: false,
  templateUrl: './summary-chart.component.html',
  styleUrl: './summary-chart.component.css'
})
export class SummaryChartComponent implements AfterViewInit {
  @ViewChild('chartCanvas') canvas!: ElementRef<HTMLCanvasElement>;
  chart!: Chart;

  constructor(private dashboardService: DashboardService) { }

  ngAfterViewInit(): void {
    this.dashboardService.getWeeklyVolume().subscribe((data: VolumePoint[]) => {
      const labels = data.map(data => data.date);
      const values = data.map(data => data.totalReps);

      this.chart = new Chart(this.canvas.nativeElement, {
        type: 'bar',
        data: {
          labels,
          datasets: [{ label: 'Reps', data: values }]
        },
        options: { responsive: true }
      });
    });
  }
}
