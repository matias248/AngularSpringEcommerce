import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcIconComponent } from './ec-icon.component';

describe('EcIconComponent', () => {
  let component: EcIconComponent;
  let fixture: ComponentFixture<EcIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EcIconComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EcIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
