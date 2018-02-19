import { TestBed, getTestBed, tick, fakeAsync } from '@angular/core/testing';
import { AppMaterialModule } from '../../app-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs/Observable';

import { CoursesSearchComponent } from './courses-search.component';
import { CoursesService } from '../../services';
import { CoursesServiceStub, MockData } from '../../../../test-helpers';

const mockData = new MockData();
const courses = mockData.getCourses();
const event = { target: { value: 'Angular' } };

describe('CoursesSearchComponent', () => {
  let component: CoursesSearchComponent;
  let service: CoursesService;
  let injector: TestBed;
  let fixture;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppMaterialModule, BrowserAnimationsModule],
      declarations: [CoursesSearchComponent],
      providers: [{provide: CoursesService, useClass: CoursesServiceStub}]
    });

    injector = getTestBed();
    service = injector.get(CoursesService);

    fixture = TestBed.createComponent(CoursesSearchComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create the home component', () => {
    expect(component).toBeTruthy();
  });

  describe('search method', () => {
    let spySearch: any;
    it('should call CoursesService search method', fakeAsync(() => {
      spySearch = spyOn(service, 'search').and.returnValue(courses);
      component.search(event);
      tick(500);
      expect(service.search).toHaveBeenCalled();
    }));
  });

});
