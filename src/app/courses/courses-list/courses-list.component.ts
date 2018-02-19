import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Course } from '../../model';

@Component({
    selector: 'app-courses-list',
    templateUrl: './courses-list.component.html',
    styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent {
    @Input() courses: Observable<Course[]>;
    @Input() readonly: boolean;
    @Output() selected = new EventEmitter();
    @Output() deleted = new EventEmitter();
}
