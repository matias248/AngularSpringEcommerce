import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopSelectorInputComponent } from './shop-selector-input.component';

describe('ShopSelectorInputComponent', () => {
  let component: ShopSelectorInputComponent;
  let fixture: ComponentFixture<ShopSelectorInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopSelectorInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShopSelectorInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
