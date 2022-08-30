import { TestBed } from '@angular/core/testing';

import { PublisherAuthGuard } from './publisher-auth.guard';

describe('PublisherAuthGuard', () => {
  let guard: PublisherAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PublisherAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
