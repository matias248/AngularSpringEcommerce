import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateButtonComponent } from './validate-button.component';

describe('ValidateButtonComponent', () => {
  let component: ValidateButtonComponent;
  let fixture: ComponentFixture<ValidateButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidateButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ValidateButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
