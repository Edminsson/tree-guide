import { Component } from '@angular/core';
import { Tree } from '../tree/tree';
import { TreeDefault } from '../tree-default/tree-default';
import { TreeCustom } from '../tree-custom/tree-custom';
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';

@Component({
  imports: [
    Tree,
    TreeCustom,
    TreeDefault,
    RouterLink,
    MatButton
],
  selector: 'app-galleri',
  styleUrl: './galleri.scss',
  templateUrl: './galleri.html',
})
export class Galleri {}
