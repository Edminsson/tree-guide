import { Routes } from '@angular/router';
import { Galleri } from './galleri/galleri';
import { Vegetables } from './vegetables/vegetables';
import { Sticky } from './sticky/sticky';

export const routes: Routes = [
  { path: 'galleri', component: Galleri },
  { path: 'vegetables', component: Vegetables },
  { path: 'sticky', component: Sticky },
  { path: '', redirectTo: '/sticky', pathMatch: 'full' }
];
