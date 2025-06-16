import { Component, inject, input } from '@angular/core';
import { WidgetData } from '../../../widgets/models/widget-data';
import { ChartRenderService } from '../../services/chart-render.service';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-time-series',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './time-series.component.html',
  styleUrl: './time-series.component.scss'
})
export class TimeSeriesComponent {
  chartRenderService = inject(ChartRenderService);
  data = input<WidgetData | null>(null);
  chartOptions = this.chartRenderService.updateChartOptions();
}
