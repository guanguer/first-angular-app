import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

export class MockData {
  getCourses() {
    return Observable.of([this.getCourse()]);
  }

  getCourse() {
    return {
      id: 1,
      name: 'Testing Angular',
      description: 'Testing Angular Applications'
    };
  }

  getSuccessResponse() {
    return Observable.of({ status: 200 });
  }
}
