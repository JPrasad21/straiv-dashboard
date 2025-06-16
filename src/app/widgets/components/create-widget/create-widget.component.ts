import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { WidgetFormat } from '../../models/widget-format';
import { WidgetConfigService } from '../../services/widget-config.service';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { WidgetType } from '../../models/widget-type';
import { ChartType } from '../../models/chart-type';
import { Widget } from '../../models/widget';
import { UtilityHelper } from '../../../shared/utils/utility-helper';
import { WidgetService } from '../../services/widget.service';

@Component({
  selector: 'app-create-widget',
  standalone: true,
  imports: [CommonModule  , FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatRadioModule, MatSelectModule],
  templateUrl: './create-widget.component.html',
  styleUrl: './create-widget.component.scss'
})
export class CreateWidgetComponent {
  widgetConfigService = inject(WidgetConfigService);
  widgetService = inject(WidgetService);
  dialogRef = inject(MatDialogRef<CreateWidgetComponent>);
  widgetForm: FormGroup | null = null;
  selectedFormat: WidgetFormat | null = null;
  selectedWidgetType: WidgetType | null = null;

  widgetTypes: WidgetType[] = [];
  roomTypes: string[] = ['Deluxe', 'Standard', 'Suite', 'Family', 'Economy'];
  chartTypes: ChartType[] = ['Bar', 'TimeSeries'];
  lastDaysOptions = [
    { value: 7, label: 'Last 7 Days' },
    { value: 14, label: 'Last 14 Days' },
    { value: 30, label: 'Last 30 Days' },
  ]

  ngOnInit() {
  }

  selectWidgetFormat(format: WidgetFormat) {
    this.widgetTypes = this.widgetConfigService.getWidgetTypes(format);
    this.widgetForm = null;
  }
  selectWidgetType(type: WidgetType) {
    this.widgetForm = this.widgetConfigService.buildWidgetForm(this.selectedFormat!, type);
  }

  onSubmit() {
    const data = this.widgetForm?.value;
    const newWidget: Widget = {
      id: UtilityHelper.generateId(),
      title: data.title,
      widgetFormat: this.selectedFormat!,
      widgetType: this.selectedWidgetType!,
      chartType: data.chartType,
      config: {
        roomType: data.roomType,
        lastDays: data.lastDays
      },
      x: 0,
      y: 0,
      w: this.selectedFormat === 'Chart' ? 5 : 2,
      h: this.selectedFormat === 'Chart' ? 4 : 2
    }
    this.dialogRef.close(newWidget);
    this.widgetService.newWidgetAdded.set(newWidget);
    console.log('Widget Data:', data);
  }
}

