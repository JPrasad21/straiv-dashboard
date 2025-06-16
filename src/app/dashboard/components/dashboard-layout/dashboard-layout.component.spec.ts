import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardLayoutComponent } from './dashboard-layout.component';
import { WidgetService } from '../../../widgets/services/widget.service';
import { DashboardService } from '../../services/dashboard.service';
import { Widget } from '../../../widgets/models/widget';
import { KtdGridLayout } from '@katoid/angular-grid-layout';

describe('DashboardLayoutComponent', () => {
  let component: DashboardLayoutComponent;
  let fixture: ComponentFixture<DashboardLayoutComponent>;
  let widgetServiceSpy: jasmine.SpyObj<WidgetService>;
  let dashboardServiceSpy: jasmine.SpyObj<DashboardService>;

  beforeEach(async () => {
    widgetServiceSpy = jasmine.createSpyObj('WidgetService', ['newWidgetAdded']);
    dashboardServiceSpy = jasmine.createSpyObj('DashboardService', [
      'removeWidgetFromDashboard',
      'updateWidgetsInDashboard'
    ]);

    await TestBed.configureTestingModule({
      imports: [DashboardLayoutComponent],
      providers: [
        { provide: WidgetService, useValue: widgetServiceSpy },
        { provide: DashboardService, useValue: dashboardServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add item to layout', () => {
    const widget: Widget = { id: '3', title: 'Widget 3', x: 0, y: 0, w: 2, h: 2 } as Widget;
    component.layout = [];
    component.addItemToLayout(widget);
    expect(component.layout[0]).toEqual(widget);
  });

  it('should remove item from layout and call dashboardService', () => {
    const widgets: Widget[] = [
      { id: '1', title: 'Widget 1', x: 0, y: 0, w: 2, h: 2 } as Widget,
      { id: '2', title: 'Widget 2', x: 2, y: 0, w: 2, h: 2 } as Widget
    ];
    component.layout = [...widgets];
    component.removeItem('1');
    expect(component.layout.length).toBe(1);
    expect(component.layout[0].id).toBe('2');
    expect(dashboardServiceSpy.removeWidgetFromDashboard).toHaveBeenCalledWith('1');
  });

  it('should update widgets in dashboard on layout update', () => {
    const widgets: Widget[] = [
      { id: '1', title: 'Widget 1', x: 0, y: 0, w: 2, h: 2 } as Widget,
      { id: '2', title: 'Widget 2', x: 2, y: 0, w: 2, h: 2 } as Widget
    ];
    component.layout = [...widgets];
    const newLayout: KtdGridLayout = [
      { id: '1', x: 1, y: 1, w: 3, h: 3 },
      { id: '2', x: 4, y: 2, w: 2, h: 2 }
    ];
    component.onLayoutUpdated(newLayout);
    expect(dashboardServiceSpy.updateWidgetsInDashboard).toHaveBeenCalledWith([
      { ...widgets[0], x: 1, y: 1, w: 3, h: 3 },
      { ...widgets[1], x: 4, y: 2, w: 2, h: 2 }
    ]);
  });

  it('should not update widgets if layout ids do not match', () => {
    component.layout = [
      { id: '1', title: 'Widget 1', x: 0, y: 0, w: 2, h: 2 } as Widget
    ];
    const newLayout: KtdGridLayout = [
      { id: '2', x: 1, y: 1, w: 3, h: 3 }
    ];
    component.onLayoutUpdated(newLayout);
    expect(dashboardServiceSpy.updateWidgetsInDashboard).toHaveBeenCalledWith([]);
  });
});
