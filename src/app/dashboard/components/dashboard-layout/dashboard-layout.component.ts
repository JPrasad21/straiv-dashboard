import { Component, effect, inject, input } from '@angular/core';
import { Widget } from '../../../widgets/models/widget';
import { KtdDragEnd, KtdGridLayout, KtdGridModule } from '@katoid/angular-grid-layout';
import { CommonModule } from '@angular/common';
import { WidgetService } from '../../../widgets/services/widget.service';
import { WidgetCoreComponent } from "../../../widgets/components/widget-core/widget-core.component";
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [KtdGridModule, CommonModule, WidgetCoreComponent],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss'
})
export class DashboardLayoutComponent {
  dashboardService = inject(DashboardService);
  widgetService = inject(WidgetService);
  widgets = input<Widget[]>([]);
  layout: any[] = [];
  layoutConfig = {
    cols: 10,
    rowHeight: 80,
    gap: 20,
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
  }

  addItemToLayout(widget: Widget) {
    this.layout = [widget, ...this.layout];
  }

  removeItem(id: string) {
    this.layout = this.layout.filter(x => x.id !== id);
    this.dashboardService.removeWidgetFromDashboard(id);
  }

  onLayoutUpdated(layout: KtdGridLayout) {
    const newWidgets = layout.map(item => {
      const widget = this.layout.find(w => w.id === item.id);
      if (widget) {
        return {
          ...widget,
          x: item.x,
          y: item.y,
          w: item.w,
          h: item.h
        };
      }
      return null;
    }).filter((w): w is Widget => w !== null);
    this.dashboardService.updateWidgetsInDashboard(newWidgets);
  }
}
