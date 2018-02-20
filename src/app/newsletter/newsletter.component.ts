import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscriber } from '../model';
import { NotificationService } from '../services';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.css']
})
export class NewsletterComponent implements OnInit {
  subscriber: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.subscriber = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])]
    });
  }

  subscribe({ value, valid }: { value: Subscriber; valid: boolean }) {
    this.notificationService.emit(`${value.name} just subscribed!`);
    this.reset();
  }

  reset() {
    this.subscriber.reset({
      name: '',
      email: ''
    });
  }
}
