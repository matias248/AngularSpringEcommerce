import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoImageSetComponent } from './no-image-set.component';

describe('NoImageSetComponent', () => {
  let component: NoImageSetComponent;
  let fixture: ComponentFixture<NoImageSetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoImageSetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoImageSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
