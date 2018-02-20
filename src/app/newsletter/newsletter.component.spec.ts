import { ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';

import { NewsletterComponent } from './newsletter.component';
import { AppMaterialModule } from '../app-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NotificationService } from '../services';
import { NotificationServiceStub } from '../../../test-helpers/stubs';

describe('NewsletterComponent', () => {
  let component: NewsletterComponent;
  let fixture: ComponentFixture<NewsletterComponent>;
  let service: NotificationService;
  let injector: TestBed;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppMaterialModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule],
      declarations: [ NewsletterComponent ],
      providers: [{provide: NotificationService, useClass: NotificationServiceStub}]
    });

    injector = getTestBed();
    service = injector.get(NotificationService);

    fixture = TestBed.createComponent(NewsletterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('subscribe method', () => {
    it('should call notificationService.emit', () => {
      const spy = spyOn(service, 'emit');
      component.subscribe(component.subscriber);
      expect(service.emit).toHaveBeenCalled();
    });
  });

  describe('reset method', () => {
    it('should reset formGroup', () => {
      component.reset();
      expect(component.subscriber.value.name).toBeFalsy();
      expect(component.subscriber.value.mail).toBeFalsy();
    });
  });
});
