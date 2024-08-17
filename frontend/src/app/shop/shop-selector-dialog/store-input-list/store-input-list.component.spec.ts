import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreInputListComponent } from './store-input-list.component';

describe('StoreInputListComponent', () => {
  let component: StoreInputListComponent;
  let fixture: ComponentFixture<StoreInputListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreInputListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StoreInputListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
