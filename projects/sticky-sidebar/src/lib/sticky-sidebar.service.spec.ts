import { TestBed } from '@angular/core/testing';

import { StickySidebarService } from './sticky-sidebar.service';

describe('StickySidebarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StickySidebarService = TestBed.get(StickySidebarService);
    expect(service).toBeTruthy();
  });
});
