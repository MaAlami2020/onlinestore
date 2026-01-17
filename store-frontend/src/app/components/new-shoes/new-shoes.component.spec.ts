import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewShoesComponent } from './new-shoes.component';

describe('NewShoesComponent', () => {
  let component: NewShoesComponent;
  let fixture: ComponentFixture<NewShoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewShoesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewShoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
