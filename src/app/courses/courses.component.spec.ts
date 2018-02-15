import { TestBed, async, getTestBed } from '@angular/core/testing';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { AppMaterialModule } from '../app-material.module';
import { CoursesComponent } from './courses.component';
import { CoursesService } from '../services/courses.service';
import { Course } from '../model/course.model';

const courses: Observable<Course[]> = Observable.of([]);

class CoursesServiceStub {
  get() {
    return courses;
  }
}

describe('CoursesComponent', () => {
  let injector: TestBed;
  let service: CoursesServiceStub;
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [AppMaterialModule],
        declarations: [CoursesComponent],
        providers: [
          {provide: CoursesService, useClass: CoursesServiceStub}
        ]
      }).compileComponents();
      injector = getTestBed();
      service = injector.get(CoursesService);
    })
  );

  it(
    'should create the courses component',
    async(() => {
      const fixture = TestBed.createComponent(CoursesComponent);
      const component = fixture.debugElement.componentInstance;
      fixture.detectChanges();
      expect(component).toBeTruthy();
      expect(component.courses).toBe(courses);
    })
  );
});
