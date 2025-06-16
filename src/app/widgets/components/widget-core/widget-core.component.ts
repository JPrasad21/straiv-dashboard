import { Component, input, output } from '@angular/core';
import { Widget } from '../../models/widget';
import { CommonModule } from '@angular/common';
import { TextWidgetComponent } from "../../../charts/components/text-widget/text-widget.component";
import { BarChartComponent } from "../../../charts/components/bar-chart/bar-chart.component";
import { TimeSeriesComponent } from "../../../charts/components/time-series/time-series.component";

@Component({
  selector: 'app-widget-core',
  standalone: true,
  imports: [CommonModule, TextWidgetComponent, BarChartComponent, TimeSeriesComponent],
  templateUrl: './widget-core.component.html',
  styleUrl: './widget-core.component.scss'
})
export class WidgetCoreComponent {

  widget = input<Widget>();
  remove = output<string>();

  stopEventPropagation(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }

  removeItem(id?: string) {
    this.remove.emit(id!);
  }
}
