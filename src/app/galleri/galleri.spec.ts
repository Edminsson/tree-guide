import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Galleri } from './galleri';

describe('Galleri', () => {
  let component: Galleri;
  let fixture: ComponentFixture<Galleri>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Galleri],
    }).compileComponents();

    fixture = TestBed.createComponent(Galleri);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
