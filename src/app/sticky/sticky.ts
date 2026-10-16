import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { Header } from '../header/header';
import { RightPanel } from '../right-panel/right-panel';
import { TreeCustom } from '../tree-custom/tree-custom';
import { TreeSearch } from '../tree-search/tree-search';

@Component({
  imports: [
    Header,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatTabsModule,
    TreeCustom,
    TreeSearch,
    RightPanel,
  ],
  selector: 'app-sticky',
  styleUrl: './sticky.scss',
  templateUrl: './sticky.html',
})
export class Sticky {}
