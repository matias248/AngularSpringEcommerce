import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputStringFormComponent } from './input-string-form.component';

describe('InputStringFormComponent', () => {
  let component: InputStringFormComponent;
  let fixture: ComponentFixture<InputStringFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputStringFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputStringFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
