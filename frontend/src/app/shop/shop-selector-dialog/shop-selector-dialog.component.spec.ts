import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopSelectorDialogComponent } from './shop-selector-dialog.component';

describe('ShopSelectorDialogComponent', () => {
  let component: ShopSelectorDialogComponent;
  let fixture: ComponentFixture<ShopSelectorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopSelectorDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShopSelectorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
