import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { CoursesService } from '../services/courses.service';
import { Course } from '../model/course.model';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses: Observable<Course[]>;

  constructor(private coursesService: CoursesService) {}

  ngOnInit() {
    this.getCourses();
  }

  getCourses() {
    this.courses = this.coursesService.get();
  }
}