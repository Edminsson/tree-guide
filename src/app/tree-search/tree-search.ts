import { Component, computed, input, signal } from '@angular/core';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TreeCustom, TreeItem } from '../tree-custom/tree-custom';

/** Autocomplete search over the nodes of a TreeCustom; selecting a match reveals it in the tree. */
@Component({
  selector: 'app-tree-search',
  imports: [MatAutocompleteModule, MatFormFieldModule, MatInputModule],
  template: `
    <mat-form-field>
      <mat-label>Search the tree</mat-label>
      <input matInput type="text" [matAutocomplete]="auto" [value]="query()" (input)="onInput($event)">
      <mat-autocomplete #auto="matAutocomplete" [displayWith]="displayItem" (optionSelected)="onSelected($event)">
        @for (item of matches(); track item.node) {
          <mat-option [value]="item">{{ item.label }}</mat-option>
        }
      </mat-autocomplete>
    </mat-form-field>
  `,
  styles: `
    :host {
      display: block;
    }

    mat-form-field {
      width: 100%;
    }
  `,
})
export class TreeSearch {
  readonly tree = input.required<TreeCustom>();

  protected readonly query = signal('');

  protected readonly matches = computed(() => {
    const query = this.query().trim().toLowerCase();
    return this.tree()
      .items()
      .filter((item) => item.node.name.toLowerCase().includes(query));
  });

  protected displayItem = (item: TreeItem | string | null) =>
    typeof item === 'string' ? item : (item?.node.name ?? '');

  protected onInput(event: Event) {
    this.query.set((event.target as HTMLInputElement).value);
  }

  protected onSelected(event: MatAutocompleteSelectedEvent) {
    this.tree().reveal(event.option.value as TreeItem);
  }
}
