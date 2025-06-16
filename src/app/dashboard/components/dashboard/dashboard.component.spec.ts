import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { MatDialog } from '@angular/material/dialog';
import { DashboardService } from '../../services/dashboard.service';
import { Dashboard } from '../../models/dashboard';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let dashboardServiceSpy: jasmine.SpyObj<DashboardService>;

  beforeEach(async () => {
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    dashboardServiceSpy = jasmine.createSpyObj('DashboardService', [
      'getDashboard',
      'selectedDashboard',
      'updateDashboardTitle',
      'addWidgetToDashboard',
      'deleteDashboard'
    ]);
    dashboardServiceSpy.selectedDashboard.and.returnValue(null);

    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        { provide: MatDialog, useValue: dialogSpy },
        { provide: DashboardService, useValue: dashboardServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getDashboard on ngOnInit', () => {
    component.ngOnInit();
    expect(dashboardServiceSpy.getDashboard).toHaveBeenCalled();
  });

  it('should call deleteDashboard', () => {
    component.deleteDashboard();
    expect(dashboardServiceSpy.deleteDashboard).toHaveBeenCalled();
  });

  it('should get selectedTitle from selectedDashboard', () => {
    const dashboard: Dashboard = { id: "1", title: 'Test Dashboard',description: "",  widgets: [] } as Dashboard;
    component.selectedDashboard = dashboard;
    expect(component.selectedTitle).toBe('Test Dashboard');
  });

  it('should return empty string for selectedTitle if no dashboard', () => {
    component.selectedDashboard = null;
    expect(component.selectedTitle).toBe('');
  });

  it('should call updateDashboardTitle when selectedTitle is set', () => {
    component.selectedTitle = 'New Title';
    expect(dashboardServiceSpy.updateDashboardTitle).toHaveBeenCalledWith('New Title');
  });
});
