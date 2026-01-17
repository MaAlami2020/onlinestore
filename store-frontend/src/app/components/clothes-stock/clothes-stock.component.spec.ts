import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClothesStockComponent } from './clothes-stock.component';

describe('ClothesStockComponent', () => {
  let component: ClothesStockComponent;
  let fixture: ComponentFixture<ClothesStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClothesStockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClothesStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
