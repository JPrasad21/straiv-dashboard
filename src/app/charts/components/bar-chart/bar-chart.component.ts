import { Component, effect, inject, input } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { ChartRenderService } from '../../services/chart-render.service';
import { WidgetData } from '../../../widgets/models/widget-data';
@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss'
})
export class BarChartComponent {
  chartRenderService = inject(ChartRenderService);
  data = input<WidgetData | null>(null);
  chartOptions = this.chartRenderService.updateChartOptions();
}
