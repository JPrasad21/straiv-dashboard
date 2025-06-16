import { Component, inject, input, output } from '@angular/core';
import { Widget } from '../../models/widget';
import { CommonModule } from '@angular/common';
import { TextWidgetComponent } from "../../../charts/components/text-widget/text-widget.component";
import { BarChartComponent } from "../../../charts/components/bar-chart/bar-chart.component";
import { TimeSeriesComponent } from "../../../charts/components/time-series/time-series.component";
import { WidgetData } from '../../models/widget-data';
import { ChartRenderService } from '../../../charts/services/chart-render.service';
import { WidgetType } from '../../models/widget-type';

@Component({
  selector: 'app-widget-core',
  standalone: true,
  imports: [CommonModule, TextWidgetComponent, BarChartComponent, TimeSeriesComponent],
  templateUrl: './widget-core.component.html',
  styleUrl: './widget-core.component.scss'
})
export class WidgetCoreComponent {
  chartRenderService = inject(ChartRenderService);
  widget = input<Widget>();
  remove = output<string>();

  chartData: WidgetData | null = null;
  constructor() {}

  ngOnInit() {
    this.getChartData();
  }

  // Get the hardcoded chart data based on the widget type
  // This can be replaced with a service call to fetch real data
  getChartData() {
    const widget = this.widget();
    if (!widget) return;
    let data = this.chartRenderService.getChartData(widget.widgetType as WidgetType);
    data = this.filterData(data, widget);
    if(widget.widgetFormat === 'Chart') {
      this.chartData = this.getChartDataModel(data);
    } else {
      if(['Most Popular Day', 'Most Popular Room Type'].includes(widget.widgetType)) {
        const maxData = data.reduce((prev, current) => (prev.data > current.data) ? prev : current);
        this.chartData = {
          labels: [maxData.label],
          datasets: [{
            label: maxData.label,
            data: [`${maxData.label}(${maxData.data})`],
            backgroundColor: [maxData.backgroundColor],
            borderColor: [maxData.backgroundColor],
            borderWidth: 1
          }]
        };
      } else if(widget.widgetType === 'Overall Checkin Count') {
        this.chartData = {
          labels: ['Overall Checkin Count'],
          datasets: [{
            label: 'Overall Checkin Count',
            data: [data.reduce((sum, ds) => sum + ds.data, 0)],
            backgroundColor: ['#42A5F5'],
            borderColor: ['#42A5F5'],
            borderWidth: 1
          }]
        };
      }
    }
    console.log('Widget Data:', this.chartData);
  }
  filterData(data: { label: string; data: number; backgroundColor: string; }[], widget: Widget) {
    if(widget.config.roomType && widget.config.roomType.length) {
      data = data.filter(ds => widget.config.roomType?.includes(ds.label));
    }
    if(widget.config.lastDays) {
      const today = new Date();
      const lastNDays = new Date(today);
      lastNDays.setDate(today.getDate() - widget.config.lastDays);
      data = data.filter(ds => new Date(ds.label) >= lastNDays);
    }
    return data;
  }

  getChartDataModel(filteredDatasets: { label: string; data: number; backgroundColor: string; }[]) {
    return {
      labels: filteredDatasets.map((ds) => ds.label),
      datasets: [
        {
          label: 'Dataset',
          data: filteredDatasets.map((ds) => ds.data),
          backgroundColor: filteredDatasets.map((ds) => ds.backgroundColor),
          borderColor: filteredDatasets.map((ds) => ds.backgroundColor),
        }
      ]
    };
  }
  
  stopEventPropagation(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }

  removeItem(id?: string) {
    this.remove.emit(id!);
  }
}
