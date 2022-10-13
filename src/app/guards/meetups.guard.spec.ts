import { TestBed } from '@angular/core/testing';

import { MeetupsGuard } from './meetups.guard';

describe('MeetupsGuard', () => {
  let guard: MeetupsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MeetupsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
