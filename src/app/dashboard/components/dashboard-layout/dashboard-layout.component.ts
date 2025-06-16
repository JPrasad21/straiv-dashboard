import { Component, effect, inject, input } from '@angular/core';
import { Widget } from '../../../widgets/models/widget';
import { KtdGridLayout, KtdGridModule } from '@katoid/angular-grid-layout';
import { CommonModule } from '@angular/common';
import { WidgetService } from '../../../widgets/services/widget.service';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [KtdGridModule, CommonModule],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss'
})
export class DashboardLayoutComponent {
  widgetService = inject(WidgetService);
  widgets = input<Widget[]>([]);
  layout: KtdGridLayout = [];
  layoutConfig = {
    cols: 10,
    rowHeight: 100,
    preventCollision: false,
    transition: 'transform 500ms ease, width 500ms ease, height 500ms ease'
  }
  constructor() {
    effect(() => {
      const widget = this.widgetService.newWidgetAdded();
      if(widget) {
        this.addItemToLayout(widget);
      }
    });
  }

  ngOnInit() {
    this.generateLayout();
  }

  generateLayout() {
    this.layout = [...this.widgets()];
    console.log('layout', this.layout);
  }

  addItemToLayout(widget: Widget) {
    // const newLayoutItem = this.convertToGridLayoutItem(widget);

    this.layout = [
        widget,
        ...this.layout
    ];
  }
  stopEventPropagation(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }

  removeItem(id: string) {
    this.layout = this.layout.filter(x => x.id !== id);
  }

  // convertToGridLayoutItem(widget: Widget): KtdGridLayoutItem {
  //   return {
  //     id: widget.id,
  //     x: widget.x,
  //     y: widget.y,
  //     w: widget.w,
  //     h: widget.h
  //   };
  // }
}
