import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopProductImageGalleryComponent } from './shop-product-image-gallery.component';

describe('ShopProductImageGalleryComponent', () => {
  let component: ShopProductImageGalleryComponent;
  let fixture: ComponentFixture<ShopProductImageGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopProductImageGalleryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShopProductImageGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
