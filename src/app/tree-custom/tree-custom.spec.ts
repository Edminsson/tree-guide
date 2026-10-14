import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTree } from '@angular/material/tree';
import { MockInstance } from 'vitest';
import { TreeCustom } from './tree-custom';

describe('TreeCustom', () => {
  let component: TreeCustom;
  let fixture: ComponentFixture<TreeCustom>;
  let expandAll: MockInstance<MatTree<unknown>['expandAll']>;

  beforeEach(async () => {
    expandAll = vi.spyOn(MatTree.prototype, 'expandAll');

    await TestBed.configureTestingModule({
      imports: [TreeCustom],
    }).compileComponents();

    fixture = TestBed.createComponent(TreeCustom);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  afterEach(() => {
    expandAll.mockRestore();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call expandAll on the tree after the data has rendered', () => {
    expect(expandAll).toHaveBeenCalledTimes(1);
    // Nodes only exist once rendered, so this fails if expandAll runs too early.
    fixture.detectChanges();
    const toggles = fixture.nativeElement.querySelectorAll('mat-tree-node mat-icon');
    const icons = Array.from<HTMLElement>(toggles).map(i => i.textContent?.trim());
    expect(icons).toEqual(Array(4).fill('expand_more'));
  });
});
