import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/map';

import { Course } from '../model/course.model';

@Injectable()
export class CoursesService {
    readonly API_URL = 'http://localhost:3000/courses/';

    constructor(private httpClient: HttpClient) {}

    get() {
        return this.httpClient.get<Course[]>(this.API_URL);
    }

}
