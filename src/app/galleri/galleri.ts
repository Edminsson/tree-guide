import { Component } from '@angular/core';
import { Tree } from '../tree/tree';
import { TreeDefault } from '../tree-default/tree-default';

@Component({
  imports: [
    Tree,
    TreeDefault
  ],
  selector: 'app-galleri',
  styleUrl: './galleri.scss',
  templateUrl: './galleri.html',
})
export class Galleri {}
