import { afterNextRender, Component, ElementRef, signal, viewChild } from '@angular/core';
import { Header } from '../header/header';
import { MatTabsModule } from '@angular/material/tabs';
import { TreeCustom } from '../tree-custom/tree-custom';
import { RightPanel } from '../right-panel/right-panel';
import { TreeSearch } from '../tree-search/tree-search';

@Component({
  imports: [Header, MatTabsModule, TreeCustom, TreeSearch, RightPanel],
  selector: 'app-sticky',
  styleUrl: './sticky.scss',
  templateUrl: './sticky.html',
  host: {
    '(window:scroll)': 'updateLeftHeight()',
    '(window:resize)': 'updateLeftHeight()',
  },
})
export class Sticky {
  private readonly left = viewChild<ElementRef<HTMLElement>>('left');

  /** Height of .left in px: from its top edge to the bottom of the viewport. */
  protected readonly leftHeight = signal<number | null>(null);

  constructor() {
    afterNextRender(() => this.updateLeftHeight());
  }

  /**
   * Until the header has scrolled away, .left starts further down the page; shrinking it to the
   * space below its top edge keeps the search box and the whole tree inside the viewport.
   */
  protected updateLeftHeight() {
    const left = this.left()?.nativeElement;
    if (left) {
      const top = Math.max(left.getBoundingClientRect().top, 0);
      this.leftHeight.set(window.innerHeight - top);
    }
  }
}
