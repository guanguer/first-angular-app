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
      service.get().subscribe(() => {}, err => {
        expect(err.status).toBe(404);
      });

      const req = httpMock.expectOne(`${service.API_URL}`);
      expect(req.request.method).toBe('GET');
      req.error(null, {status: 404, statusText: 'Not Found Error'});
    });
  });
});
