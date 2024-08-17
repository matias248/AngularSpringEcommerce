import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationPageInputsComponent } from './navigation-page-inputs.component';

describe('NavigationPageInputsComponent', () => {
  let component: NavigationPageInputsComponent;
  let fixture: ComponentFixture<NavigationPageInputsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationPageInputsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavigationPageInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
