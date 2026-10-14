import { Component, computed, signal, viewChild } from '@angular/core';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Header } from '../header/header';
import { TreeCustom, TreeItem } from '../tree-custom/tree-custom';

@Component({
  imports: [Header, TreeCustom, MatAutocompleteModule, MatFormFieldModule, MatInputModule],
  selector: 'app-vegetables',
  styleUrl: './vegetables.scss',
  templateUrl: './vegetables.html',
})
export class Vegetables {
  private readonly tree = viewChild.required(TreeCustom);

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
