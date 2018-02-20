import { TestBed, getTestBed, fakeAsync, tick } from '@angular/core/testing';

import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let injector: TestBed;
  let service: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotificationService]
    });

    injector = getTestBed();
    service = injector.get(NotificationService);
  });

  it('should exist', () => {
    expect(service).toBeTruthy();
  });

  describe('emit method', () => {
    it('should init Observable flow', fakeAsync(() => {
      service.notifications$.subscribe(message => {
        expect(message).toBe('message');
      });
      service.emit('message');
    }));
  });
});
