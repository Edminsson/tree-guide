import { Routes } from '@angular/router';
import { Galleri } from './galleri/galleri';

export const routes: Routes = [
  { path: 'galleri', component: Galleri },
  { path: '', redirectTo: '/galleri', pathMatch: 'full' }
];
