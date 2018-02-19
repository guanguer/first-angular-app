import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/of';
import { debounceTime, map, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { CoursesService } from '../../services';

@Component({
  selector: 'app-courses-search',
  templateUrl: 'courses-search.component.html',
  styleUrls: ['courses-search.component.css']
})
export class CoursesSearchComponent implements OnInit {
  @Output() fetch = new EventEmitter();
  searchTerm = new Subject<string>();

  constructor(private coursesService: CoursesService) {}

  search(event) {
    this.searchTerm.next(event);
  }

  ngOnInit() {
    this.searchTerm.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      map((event: any) => event.target.value),
      switchMap(value => this.coursesService.search(value)))
      .subscribe(courses => this.fetch.emit(Observable.of(courses)));
  }

}
