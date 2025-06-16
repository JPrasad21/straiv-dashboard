import { Component, input } from '@angular/core';
import { WidgetData } from '../../../widgets/models/widget-data';

@Component({
  selector: 'app-text-widget',
  standalone: true,
  imports: [],
  templateUrl: './text-widget.component.html',
  styleUrl: './text-widget.component.scss'
})
export class TextWidgetComponent {

  data = input<WidgetData | null>(null);
}
