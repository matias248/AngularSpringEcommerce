import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifIconComponent } from './verif-icon.component';

describe('VerifIconComponent', () => {
  let component: VerifIconComponent;
  let fixture: ComponentFixture<VerifIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifIconComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerifIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
