import { Component, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TreeCustom } from '../tree-custom/tree-custom';
import { TreeSearch } from './tree-search';

@Component({
  imports: [TreeCustom, TreeSearch],
  template: `
    <app-tree-search [tree]="tree" />
    <app-tree-custom #tree />
  `,
})
class Host {
  readonly search = viewChild.required(TreeSearch);
}

describe('TreeSearch', () => {
  let fixture: ComponentFixture<Host>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Host],
    }).compileComponents();

    fixture = TestBed.createComponent(Host);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(fixture.componentInstance.search()).toBeTruthy();
  });
});
