import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSwitchFormComponent } from './input-switch-form.component';

describe('InputSwitchFormComponent', () => {
  let component: InputSwitchFormComponent;
  let fixture: ComponentFixture<InputSwitchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputSwitchFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputSwitchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
