import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoesStockComponent } from './shoes-stock.component';

describe('ShoesStockComponent', () => {
  let component: ShoesStockComponent;
  let fixture: ComponentFixture<ShoesStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoesStockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShoesStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
