import { TestBed, getTestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { AppMaterialModule } from '../app-material.module';
import { CoursesComponent } from './courses.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { CoursesService } from '../services/courses.service';
import { Course } from '../model/course.model';
import { CoursesServiceStub, MockData } from '../../../test-helpers';
import { NotificationService } from '../services';
import { NotificationServiceStub } from '../../../test-helpers/stubs';

const mockData = new MockData();
const course = mockData.getCourse();
const courses$ = mockData.getCourses();
const response$ = mockData.getSuccessResponse();

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let courseService: CoursesService;
  let injector: TestBed;
  let spyGet: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppMaterialModule, FormsModule, BrowserAnimationsModule],
      declarations: [
        CoursesComponent,
        CoursesListComponent,
        CourseDetailComponent
      ],
      providers: [
        { provide: CoursesService, useClass: CoursesServiceStub },
        { provide: NotificationService, useClass: NotificationServiceStub }
      ]
    });

    injector = getTestBed();
    courseService = injector.get(CoursesService);
    spyGet = spyOn(courseService, 'get').and.returnValue(courses$);

    const fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create the courses component', () => {
    expect(component).toBeTruthy();
    expect(component.courses$).toBe(courses$);
  });

  describe('Course selection', () => {
    it('should allow course selection', () => {
      component.select(course);
      expect(component.selectedCourse).toBe(course);
    });
  });

  describe('Course reset', () => {
    it('should allow reset selection', () => {
      component.select(course);
      expect(component.selectedCourse).toBe(course);
      component.reset();
      expect(component.selectedCourse.id).toBe(null);
    });
  });

  describe('Course save', () => {
    let spySave: any;
    it('should create a new course', () => {
      const newCourse = Object.assign({}, course, { id: null });
      spySave = spyOn(courseService, 'create').and.returnValue(response$);
      component.save(newCourse);
      expect(courseService.create).toHaveBeenCalled();
    });

    it('should update an existing course', () => {
      spySave = spyOn(courseService, 'update').and.returnValue(response$);
      component.save(course);
      expect(courseService.update).toHaveBeenCalled();
    });
  });

  describe('Course delete', () => {
    it('should delete a course', () => {
      const spyDelete = spyOn(courseService, 'delete').and.returnValue(response$);
      component.delete(course);
      expect(courseService.delete).toHaveBeenCalled();
    });
  });
});
