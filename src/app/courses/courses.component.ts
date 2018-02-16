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
  selectedCourse: Course;
  selectedName: string;

  constructor(private coursesService: CoursesService) {}

  ngOnInit() {
    this.reset();
    this.getCourses();
  }

  getCourses() {
    this.courses = this.coursesService.get();
  }

  select(course: Course) {
    this.selectedCourse = Object.assign({}, course);
    this.selectedName = course.name;
  }

  reset() {
    this.selectedCourse = {id: null, name: '', description: ''};
    this.selectedName = '';
  }

  save(course: Course) {
    if (!course.id) {
      this.create(course);
    } else {
      this.update(course);
    }
  }

  create(course: Course) {
    this.coursesService.create(course)
      .subscribe(res => {
        this.getCourses();
        this.reset();
      });
  }

  update(course: Course) {
    this.coursesService.update(course)
      .subscribe(res => {
        this.getCourses();
        this.reset();
      });
  }

  delete(course: Course) {
    this.coursesService.delete(course)
      .subscribe(res => {
        this.getCourses();
        this.reset();
      });
  }
}
