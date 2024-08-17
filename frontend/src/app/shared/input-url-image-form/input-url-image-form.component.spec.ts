import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputUrlImageFormComponent } from './input-url-image-form.component';

describe('InputUrlImageFormComponent', () => {
  let component: InputUrlImageFormComponent;
  let fixture: ComponentFixture<InputUrlImageFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputUrlImageFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputUrlImageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
