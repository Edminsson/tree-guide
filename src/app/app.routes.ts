import { Routes } from '@angular/router';
import { Tree } from './tree/tree';

export const routes: Routes = [
  { path: 'tree', component: Tree },
  { path: '', redirectTo: '/tree', pathMatch: 'full' }
];
