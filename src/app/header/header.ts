import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `<header><span class="title">Simple Material</span></header>`,
  styles: `
    :host {
      display: block;
    }

    header {
      padding: 16px 24px;
      background-color: var(--mat-sys-primary);
      color: var(--mat-sys-on-primary);
      font: var(--mat-sys-title-large);
    }
  `,
})
export class Header {}
