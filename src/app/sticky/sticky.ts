import { Component } from '@angular/core';
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
})
export class Sticky {}
