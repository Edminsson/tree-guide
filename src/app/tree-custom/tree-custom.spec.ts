import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TreeCustom } from './tree-custom';

describe('TreeCustom', () => {
  let component: TreeCustom;
  let fixture: ComponentFixture<TreeCustom>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreeCustom],
    }).compileComponents();

    fixture = TestBed.createComponent(TreeCustom);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
