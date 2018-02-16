import { TestBed } from '@angular/core/testing';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { AppMaterialModule } from '../app-material.module';
import { CoursesComponent } from './courses.component';
import { CoursesService } from '../services/courses.service';
import { Course } from '../model/course.model';

const course: Course = {
  id: 1,
  name: 'Testing Angular',
  description: 'Testing Angular Applications'
};
const courses: Observable<Course[]> = Observable.of([course]);

class CoursesServiceStub {
  get() {
    return courses;
  }
}

describe('CoursesComponent', () => {
  let component: CoursesComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppMaterialModule],
      declarations: [CoursesComponent],
      providers: [{ provide: CoursesService, useClass: CoursesServiceStub }]
    });

    const fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create the courses component', () => {
    expect(component).toBeTruthy();
    expect(component.courses).toBe(courses);
  });

  it('should allow course selection', () => {
    component.selectCourse(course);
    expect(component.selectedCourse).toBe(course);
  });

  it('should allow reset selection', () => {
    component.selectCourse(course);
    expect(component.selectedCourse).toBe(course);
    component.resetCourse();
    expect(component.selectedCourse.id).toBe(null);
  });
});
