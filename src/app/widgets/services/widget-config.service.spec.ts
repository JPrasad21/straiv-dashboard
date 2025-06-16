import { TestBed } from '@angular/core/testing';

import { WidgetConfigService } from './widget-config.service';

describe('WidgetConfigService', () => {
  let service: WidgetConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WidgetConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
