import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCourComponent } from './test-cour.component';

describe('TestCourComponent', () => {
  let component: TestCourComponent;
  let fixture: ComponentFixture<TestCourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestCourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestCourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
