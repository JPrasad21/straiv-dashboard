import { Component, inject, signal } from '@angular/core';
import { Dashboard } from '../../models/dashboard';
import {MatButtonModule} from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CreateDashboardComponent } from '../create-dashboard/create-dashboard.component';
import { StorageService } from '../../../core/services/storage.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  dialog = inject(MatDialog);
  storageService = inject(StorageService);
  selectedDashboard = signal<Dashboard | null>(null);

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
        const dashboard = this.storageService.getItem('selectedDashboard');
        this.selectedDashboard.set(dashboard);
      }
    });
  }
}
