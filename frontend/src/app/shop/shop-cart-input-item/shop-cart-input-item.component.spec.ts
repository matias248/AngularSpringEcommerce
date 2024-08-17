import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopCartInputItemComponent } from './shop-cart-input-item.component';

describe('ShopCartInputItemComponent', () => {
  let component: ShopCartInputItemComponent;
  let fixture: ComponentFixture<ShopCartInputItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopCartInputItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShopCartInputItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
