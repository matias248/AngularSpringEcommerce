import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopCategoryItemComponent } from './shop-category-item.component';

describe('ShopCategoryItemComponent', () => {
  let component: ShopCategoryItemComponent;
  let fixture: ComponentFixture<ShopCategoryItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopCategoryItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShopCategoryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
