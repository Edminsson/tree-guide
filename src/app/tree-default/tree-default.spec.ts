import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TreeDefault } from './tree-default';

describe('TreeDefault', () => {
  let component: TreeDefault;
  let fixture: ComponentFixture<TreeDefault>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreeDefault],
    }).compileComponents();

    fixture = TestBed.createComponent(TreeDefault);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
