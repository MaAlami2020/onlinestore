import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewClothesComponent } from './new-clothes.component';

describe('NewClothesComponent', () => {
  let component: NewClothesComponent;
  let fixture: ComponentFixture<NewClothesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewClothesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewClothesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
