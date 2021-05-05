import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ExperienceBarComponent } from './experience-bar.component';

describe('ExperienceBarComponent', () => {
  let component: ExperienceBarComponent;
  let fixture: ComponentFixture<ExperienceBarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ExperienceBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperienceBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
