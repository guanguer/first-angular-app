import { TestBed, ComponentFixture } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { AppMaterialModule } from './app-material.module';
import { AppComponent } from './app.component';
import { NotificationService } from './services';
import { NotificationServiceStub } from '../../test-helpers/stubs';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AppMaterialModule,
        BrowserAnimationsModule,
        RouterTestingModule
      ],
      declarations: [AppComponent],
      providers: [
        { provide: NotificationService, useClass: NotificationServiceStub }
      ]
    });
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
});
