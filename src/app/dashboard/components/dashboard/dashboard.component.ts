import { Component, effect, inject, signal } from '@angular/core';
import { Dashboard } from '../../models/dashboard';
import {MatButtonModule} from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CreateDashboardComponent } from '../create-dashboard/create-dashboard.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { DashboardLayoutComponent } from "../dashboard-layout/dashboard-layout.component";
import { CreateWidgetComponent } from '../../../widgets/components/create-widget/create-widget.component';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, MatButtonModule, MatDialogModule, MatIconModule, MatInputModule, DashboardLayoutComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  dialog = inject(MatDialog);
  dashboardService = inject(DashboardService);
  selectedDashboard: Dashboard | null = null;
  isEditMode = signal<boolean>(false);
  dashboardTitle = effect(() => this.selectedDashboard?.title || '');

  get selectedTitle(): string {
    return this.selectedDashboard?.title ?? '';
  }

  set selectedTitle(value: string) {
    this.dashboardService.updateDashboardTitle(value);
  }
  constructor() {
    effect(() => {
      this.selectedDashboard = this.dashboardService.selectedDashboard();
    });
  }
  ngOnInit() {
    this.dashboardService.getDashboard();
  }

  createDashboard() {
    const dialogRef = this.dialog.open(CreateDashboardComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dashboardService.getDashboard();
      }
    });
  }

  addWidget() {
    const dialogRef = this.dialog.open(CreateWidgetComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dashboardService.addWidgetToDashboard(result);
      }
    });
  }
  deleteDashboard() {
    this.dashboardService.deleteDashboard();
  }
}
