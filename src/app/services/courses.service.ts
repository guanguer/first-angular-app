import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/map';

import { Course } from '../model/course.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class CoursesService {
  readonly API_URL = 'http://localhost:3000/courses/';

  constructor(private httpClient: HttpClient) {}

  get() {
    return this.httpClient.get<Course[]>(this.API_URL);
  }

  create(course: Course) {
    return this.httpClient.post(
      this.API_URL,
      JSON.stringify(course),
      httpOptions
    );
  }

  update(course: Course) {
    return this.httpClient.put(
      `${this.API_URL}${course.id}`,
      JSON.stringify(course),
      httpOptions
    );
  }

  delete(course: Course) {
    return this.httpClient.delete(
      `${this.API_URL}${course.id}`
    );
  }
}
