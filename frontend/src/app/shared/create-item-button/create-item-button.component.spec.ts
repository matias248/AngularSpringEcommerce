import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateItemButtonComponent } from './create-item-button.component';

describe('CreateItemButtonComponent', () => {
  let component: CreateItemButtonComponent;
  let fixture: ComponentFixture<CreateItemButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateItemButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateItemButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
