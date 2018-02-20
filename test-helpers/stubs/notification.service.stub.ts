import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

export class NotificationServiceStub {
  notifications$ = Observable.of({});
  emit(notification) {}
}
