import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDashboardComponent } from './create-dashboard.component';
import { MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CreateDashboardComponent', () => {
  let component: CreateDashboardComponent;
  let fixture: ComponentFixture<CreateDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateDashboardComponent, BrowserAnimationsModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}
        }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
