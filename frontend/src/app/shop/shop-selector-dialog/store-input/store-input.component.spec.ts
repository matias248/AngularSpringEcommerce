import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreInputComponent } from './store-input.component';

describe('StoreInputComponent', () => {
  let component: StoreInputComponent;
  let fixture: ComponentFixture<StoreInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StoreInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
