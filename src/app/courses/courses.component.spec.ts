import { TestBed, getTestBed } from '@angular/core/testing';
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

const mockData = new MockData();
const courses = mockData.getCourses();
const course = mockData.getCourse();
const response = mockData.getSuccessResponse();

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let service: CoursesService;
  let injector: TestBed;
  let spyGet: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppMaterialModule, FormsModule, BrowserAnimationsModule],
      declarations: [CoursesComponent, CoursesListComponent, CourseDetailComponent],
      providers: [{provide: CoursesService, useClass: CoursesServiceStub}]
    });

    injector = getTestBed();
    service = injector.get(CoursesService);
    spyGet = spyOn(service, 'get').and.returnValue(courses);

    const fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create the courses component', () => {
    expect(component).toBeTruthy();
    expect(component.courses).toBe(courses);
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
      const newCourse = Object.assign({}, course, {id: null});
      spySave = spyOn(service, 'create').and.returnValue(response);
      component.save(newCourse);
      expect(service.create).toHaveBeenCalled();
    });

    it('should update an existing course', () => {
      spySave = spyOn(service, 'update').and.returnValue(response);
      component.save(course);
      expect(service.update).toHaveBeenCalled();
    });
  });

  describe('Course delete', () => {
    let spyDelete: any;
    it('should delete a course', () => {
      spyDelete = spyOn(service, 'delete').and.returnValue(response);
      component.delete(course);
      expect(service.delete).toHaveBeenCalled();
    });
  });

});
