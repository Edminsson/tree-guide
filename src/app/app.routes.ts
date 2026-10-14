import { Routes } from '@angular/router';
import { Galleri } from './galleri/galleri';
import { Vegetables } from './vegetables/vegetables';

export const routes: Routes = [
  { path: 'galleri', component: Galleri },
  { path: 'vegetables', component: Vegetables },
  { path: '', redirectTo: '/galleri', pathMatch: 'full' }
];
