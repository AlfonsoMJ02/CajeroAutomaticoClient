import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbrirCuenta } from './abrir-cuenta';

describe('AbrirCuenta', () => {
  let component: AbrirCuenta;
  let fixture: ComponentFixture<AbrirCuenta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbrirCuenta],
    }).compileComponents();

    fixture = TestBed.createComponent(AbrirCuenta);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
