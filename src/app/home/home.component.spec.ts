import { TestBed, getTestBed } from '@angular/core/testing';
import { AppMaterialModule } from '../app-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HomeComponent } from './home.component';
import { CoursesSearchComponent } from '../courses/courses-search/courses-search.component';
import { CoursesService } from '../services';
import { CoursesServiceStub, MockData } from '../../../test-helpers';
import { CoursesListComponent } from '../courses/courses-list/courses-list.component';

const mockData = new MockData();
const courses = mockData.getCourses();

describe('HomeComponent', () => {
  let component: HomeComponent;
  let service: CoursesService;
  let injector: TestBed;
  let spyGet: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppMaterialModule, BrowserAnimationsModule],
      declarations: [HomeComponent, CoursesSearchComponent, CoursesListComponent],
      providers: [{provide: CoursesService, useClass: CoursesServiceStub}]
    });

    injector = getTestBed();
    service = injector.get(CoursesService);
    spyGet = spyOn(service, 'get').and.returnValue(courses);

    const fixture = TestBed.createComponent(HomeComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create the home component', () => {
    expect(component).toBeTruthy();
    expect(component.courses).toBe(courses);
  });

  describe('handle results', () => {
    it('should set courses property', () => {
      component.handleResults(courses);
      expect(component.courses).toBe(courses);
    });
  });

});
