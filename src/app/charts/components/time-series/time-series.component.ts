import { Component, input } from '@angular/core';

@Component({
  selector: 'app-time-series',
  standalone: true,
  imports: [],
  templateUrl: './time-series.component.html',
  styleUrl: './time-series.component.scss'
})
export class TimeSeriesComponent {
  data = input<string | null>(null);
}
