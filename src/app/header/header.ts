import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  template: `
    <header>
      <span class="title">Simple Material2</span>
      <button class="knappfarger" mat-button routerLink="/galleri">Galleri</button>
    </header>`,
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
    .knappfarger {
      --mat-button-text-label-text-color: white;
    }
  `,
  imports: [RouterLink, MatButton],
})
export class Header {}
