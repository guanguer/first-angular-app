import { Component, Output, EventEmitter, Input } from '@angular/core';

import { Course } from '../../model';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent {
  originalName: string;
  selectedCourse: Course;
  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();

  @Input()
  set course(course: Course) {
      if (course) {
          this.originalName = course.name;
      }
      this.selectedCourse = Object.assign({}, course);
  }
}
