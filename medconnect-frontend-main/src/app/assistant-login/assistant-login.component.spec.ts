import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistantLoginComponent } from './assistant-login.component';

describe('AssistantLoginComponent', () => {
  let component: AssistantLoginComponent;
  let fixture: ComponentFixture<AssistantLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssistantLoginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssistantLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
