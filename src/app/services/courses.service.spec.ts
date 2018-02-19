import { TestBed, getTestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { CoursesService } from './courses.service';

const dummyCourses = [
  { id: 1, name: 'Angular', description: 'Angular Rocks!' },
  { id: 2, name: 'Redux', description: 'Redux Rules!' }
];

const newCourse = {id: null, name: 'Reactive Angular', description: 'Reactive Angular Forms'};

describe('Service: Courses', () => {
  let injector: TestBed;
  let service: CoursesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CoursesService]
    });

    injector = getTestBed();
    service = injector.get(CoursesService);
    httpMock = injector.get(HttpTestingController);
  });

  it('should exist', () => {
    expect(service).toBeTruthy();
  });

  describe('Service: get method', () => {
    afterEach(() => {
      httpMock.verify();
    });

    it('should return a Courses Observable', () => {
      service.get().subscribe(courses => {
        expect(courses.length).toBe(2);
        expect(courses).toEqual(dummyCourses);
      });

      const req = httpMock.expectOne(`${service.API_URL}`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyCourses);
    });

    it('should handle error while getting courses', () => {
      service.get().subscribe(
        () => {},
        err => {
          expect(err.status).toBe(404);
        }
      );

      const req = httpMock.expectOne(`${service.API_URL}`);
      expect(req.request.method).toBe('GET');
      req.error(null, { status: 404, statusText: 'Not Found Error' });
    });
  });

  describe('Service: create method', () => {
    afterEach(() => {
      httpMock.verify();
    });

    it('should allow course creation', () => {
      service.create(newCourse).subscribe(res => {
        expect(res).toBeDefined();
      });

      const req = httpMock.expectOne(`${service.API_URL}`);
      expect(req.request.method).toBe('POST');
    });
  });

  describe('Service: update method', () => {
    afterEach(() => {
      httpMock.verify();
    });

    it('should allow course update', () => {
      const course = dummyCourses[0];
      service.update(course).subscribe(res => {
        expect(res).toBeDefined();
      });

      const req = httpMock.expectOne(`${service.API_URL}${course.id}`);
      expect(req.request.method).toBe('PUT');
    });
  });

  describe('Service: delete method', () => {
    afterEach(() => {
      httpMock.verify();
    });

    it('should allow course deletion', () => {
      const course = dummyCourses[0];
      service.delete(course).subscribe(res => {
        expect(res).toBeDefined();
      });

      const req = httpMock.expectOne(`${service.API_URL}${course.id}`);
      expect(req.request.method).toBe('DELETE');
    });
  });

  describe('Service: search method', () => {
    afterEach(() => {
      httpMock.verify();
    });

    it('should allow search with params', () => {
      const searchTerm = 'Angular';
      service.search(searchTerm).subscribe(courses => {
        expect(courses).toEqual(dummyCourses);
      });

      const req = httpMock.expectOne(`${service.API_URL}?q=${searchTerm}`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyCourses);
    });
  });
});
