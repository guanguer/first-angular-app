import { TestBed, async } from '@angular/core/testing';
import { CourseDetailComponent } from './course-detail.component';

describe('Component: ItemDetail', () => {
  let component;

  beforeEach(() => {
    component = new CourseDetailComponent();
  });

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  it('should accept undefined input', () => {
    component.course = null;
    expect(component.originalName).toBe(undefined);
  });

});
