import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { NotificationService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'First App';
  links = [
    { path: '/home', icon: 'home', label: 'Home' },
    { path: '/courses', icon: 'list', label: 'Courses' }
  ];

  constructor(
    private snackBar: MatSnackBar,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.notificationService.notifications$
      .subscribe(notification => this.showNotification(notification));
  }

  showNotification(notification) {
    this.snackBar.open(notification, 'OK', {
      duration: 3000
    });
  }
}
