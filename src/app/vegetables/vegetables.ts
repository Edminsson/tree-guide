import { Component } from '@angular/core';
import { Header } from '../header/header';
import { TreeCustom } from '../tree-custom/tree-custom';

@Component({
  imports: [Header, TreeCustom],
  selector: 'app-vegetables',
  styleUrl: './vegetables.scss',
  templateUrl: './vegetables.html',
})
export class Vegetables {}
