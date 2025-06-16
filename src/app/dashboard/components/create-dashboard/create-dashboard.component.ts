import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { StorageService } from '../../../core/services/storage.service';
import { Dashboard } from '../../models/dashboard';
import { MatDialogRef } from '@angular/material/dialog';
import { UtilityHelper } from '../../../utils/utililty-helper';
@Component({
  selector: 'app-create-dashboard',
  standalone: true,
  imports: [CommonModule  , FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './create-dashboard.component.html',
  styleUrl: './create-dashboard.component.scss'
})
export class CreateDashboardComponent {
  storageService = inject(StorageService);
  dialogRef = inject(MatDialogRef<CreateDashboardComponent>);
  dashboardForm!: FormGroup;

  ngOnInit() {
    this.dashboardForm = new FormGroup({
      title: new FormControl('Hotel Analytics', Validators.required),
      description: new FormControl('')
    });
  }

  onSubmit() {
    const data = this.dashboardForm.value;
    const newDashboard: Dashboard = {
      id: UtilityHelper.generateId(),
      title: data.title,
      description: data.description || '',
      widgets: []
    }
    this.storageService.setItem('selectedDashboard', newDashboard);
    this.dialogRef.close(true);
  }
}
