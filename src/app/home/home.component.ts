import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { CoursesService } from '../services';
import { Course } from '../model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  courses: Observable<Course[]>;

  constructor(private coursesService: CoursesService) {}

  ngOnInit() {
    this.getCourses();
  }

  getCourses() {
    this.courses = this.coursesService.get();
  }

  handleResults(courses) {
    this.courses = courses;
  }
}
