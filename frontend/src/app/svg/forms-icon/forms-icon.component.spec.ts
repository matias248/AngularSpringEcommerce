import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsIconComponent } from './forms-icon.component';

describe('FormsIconComponent', () => {
  let component: FormsIconComponent;
  let fixture: ComponentFixture<FormsIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsIconComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormsIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
