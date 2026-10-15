import { Component } from '@angular/core';
import { Header } from '../header/header';
import { MatTabsModule } from '@angular/material/tabs';
import { TreeCustom } from '../tree-custom/tree-custom';

@Component({
  imports: [Header, MatTabsModule, TreeCustom],
  selector: 'app-sticky',
  styleUrl: './sticky.scss',
  templateUrl: './sticky.html',
})
export class Sticky {}
