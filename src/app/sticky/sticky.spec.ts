import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Sticky } from './sticky';

describe('Sticky', () => {
  let component: Sticky;
  let fixture: ComponentFixture<Sticky>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sticky],
    }).compileComponents();

    fixture = TestBed.createComponent(Sticky);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
