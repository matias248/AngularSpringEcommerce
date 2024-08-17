import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopCategoryListComponent } from './shop-category-list.component';

describe('ShopCategoryListComponent', () => {
  let component: ShopCategoryListComponent;
  let fixture: ComponentFixture<ShopCategoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopCategoryListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShopCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
