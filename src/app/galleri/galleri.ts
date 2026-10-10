import { Component } from '@angular/core';
import { Tree } from '../tree/tree';
import { TreeDefault } from '../tree-default/tree-default';
import { TreeCustom } from '../tree-custom/tree-custom';

@Component({
  imports: [
    Tree,
    TreeCustom,
    TreeDefault
  ],
  selector: 'app-galleri',
  styleUrl: './galleri.scss',
  templateUrl: './galleri.html',
})
export class Galleri {}
