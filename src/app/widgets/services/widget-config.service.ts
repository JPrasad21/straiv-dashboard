import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { WidgetFormat } from '../models/widget-format';
import { WidgetType } from '../models/widget-type';
import { ChartType } from '../models/chart-type';

@Injectable({
  providedIn: 'root'
})
export class WidgetConfigService {

  formbuilder = inject(FormBuilder);
  constructor() { }

  buildWidgetForm(widgetFormat: WidgetFormat, widgetType: WidgetType) {
    const commonControls = {
      format: new FormControl<WidgetFormat>(widgetFormat),
      type: new FormControl<WidgetType>(widgetType),
      title: new FormControl<string>(widgetType, Validators.required),
    }
    let additionalControls = {};
    if(widgetFormat === 'Chart') {
      additionalControls = this.getChartControls(widgetType);
    } else {
      additionalControls = this.getTextControls(widgetType);
    }
    return this.formbuilder.group({
      ...commonControls,
      ...additionalControls,
    });
  }

  getChartControls(widgetType: WidgetType) {
    switch (widgetType) {
      case 'Occupancy by Room Types':
        return {
          roomType: new FormControl<string>('', Validators.required),
          chartType: new FormControl<ChartType>('Bar', Validators.required),
        };
      case 'Checkin Count':
        return {
          chartType: new FormControl<ChartType>('Bar', Validators.required)
        };
      case 'Daily Checkins':
        return {
          lastDays: new FormControl<number | null>(null, Validators.required),
          chartType: new FormControl<ChartType>('TimeSeries', Validators.required),
        };
      default:
        return {
          chartType: new FormControl<ChartType>('Bar', Validators.required),
        };
    }
  }

  getTextControls(widgetType: WidgetType) {
    switch (widgetType) {
      case 'Most Popular Room Type':
        return {};
      case 'Most Popular Day':
        return {};
      case 'Overall Checkin Count':
        return {
          lastDays: new FormControl<number | null>(null, Validators.required),
        };
      default:
        return {};
    }
  }
  getWidgetTypes(format: WidgetFormat): WidgetType[] {
    switch (format) {
      case 'Chart':
        return ['Occupancy by Room Types', 'Checkin Count', 'Daily Checkins'];
      case 'Text':
        return ['Most Popular Room Type', 'Most Popular Day', 'Overall Checkin Count'];
      default:
        return [];
    }
  }
}
