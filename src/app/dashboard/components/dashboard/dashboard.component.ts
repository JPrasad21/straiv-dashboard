import { Component, effect, inject, signal } from '@angular/core';
import { Dashboard } from '../../models/dashboard';
import {MatButtonModule} from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CreateDashboardComponent } from './create-dashboard/create-dashboard.component';
import { StorageService } from '../../../core/services/storage.service';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, MatButtonModule, MatDialogModule, MatIconModule, MatInputModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  dialog = inject(MatDialog);
  storageService = inject(StorageService);
  selectedDashboard = signal<Dashboard | null>(null);
  isEditMode = signal<boolean>(false);
  dashboardTitle = effect(() => this.selectedDashboard()?.title || '');

  get selectedTitle(): string {
    return this.selectedDashboard()?.title ?? '';
  }

  set selectedTitle(value: string) {
    const current = this.selectedDashboard();
    if (current) {
      this.selectedDashboard.set({
        ...current,
        title: value
      });
      this.storageService.setItem('selectedDashboard', this.selectedDashboard());
    }
  }
  ngOnInit() {
    this.getDashboard();
  }

  getDashboard() {
    const dashboard = this.storageService.getItem('selectedDashboard');
    if (dashboard) {
      this.selectedDashboard.set(dashboard);
    } else {
      this.selectedDashboard.set(null);
    }
  }

  createDashboard() {
    const dialogRef = this.dialog.open(CreateDashboardComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getDashboard();
      }
    });
  }
  addWidget() {

  }
}
