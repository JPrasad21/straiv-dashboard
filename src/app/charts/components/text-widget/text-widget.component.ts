import { Component, input } from '@angular/core';

@Component({
  selector: 'app-text-widget',
  standalone: true,
  imports: [],
  templateUrl: './text-widget.component.html',
  styleUrl: './text-widget.component.scss'
})
export class TextWidgetComponent {

  data = input<string | null>(null);
}
