import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CompletedChallengesComponent } from './completed-challenges.component';

describe('CompletedChallengesComponent', () => {
  let component: CompletedChallengesComponent;
  let fixture: ComponentFixture<CompletedChallengesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletedChallengesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedChallengesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
