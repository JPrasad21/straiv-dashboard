import { inject, Injectable, signal } from '@angular/core';
import { Dashboard } from '../models/dashboard';
import { StorageService } from '../../core/services/storage.service';
import { Widget } from '../../widgets/models/widget';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  storageService = inject(StorageService);
  
  selectedDashboard = signal<Dashboard | null>(null);
  constructor() { }

  setSelectedDashboard(dashboard: Dashboard) {
    this.selectedDashboard.set(dashboard);
    this.storageService.setItem('selectedDashboard', dashboard);
  }
  getDashboard() {
    const dashboard = this.storageService.getItem('selectedDashboard');
    if (dashboard) {
      this.selectedDashboard.set(dashboard);
    } else {
      this.selectedDashboard.set(null);
    }
  }
  deleteDashboard() {
    this.selectedDashboard.set(null);
    this.storageService.removeItem('selectedDashboard');
  }
  updateDashboardTitle(title: string) {
    const currentDashboard = this.selectedDashboard();
    if (currentDashboard) {
      this.selectedDashboard.set({
        ...currentDashboard,
        title: title
      });
      this.storageService.setItem('selectedDashboard', this.selectedDashboard());
    }
  }
  addWidgetToDashboard(widget: Widget) {
    const currentDashboard = this.selectedDashboard();
    if (currentDashboard) {
      const updatedWidgets = [...currentDashboard.widgets, widget];
      this.selectedDashboard.set({
        ...currentDashboard,
        widgets: updatedWidgets
      });
      this.storageService.setItem('selectedDashboard', this.selectedDashboard());
    }
  }
  removeWidgetFromDashboard(widgetId: string) {
    const currentDashboard = this.selectedDashboard();
    if (currentDashboard) {
      const updatedWidgets = currentDashboard.widgets.filter(widget => widget.id !== widgetId);
      this.selectedDashboard.set({
        ...currentDashboard,
        widgets: updatedWidgets
      });
      this.storageService.setItem('selectedDashboard', this.selectedDashboard());
    }
  }
  updateWidgetsInDashboard(widgets: Widget[]) {
    const currentDashboard = this.selectedDashboard();
    if (currentDashboard) {
      this.selectedDashboard.set({
        ...currentDashboard,
        widgets: widgets
      });
      this.storageService.setItem('selectedDashboard', this.selectedDashboard());
    }
  }
}
