import { Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';

export const routes: Routes = [
  {
    path: 'blogs/:page',
    component: ListComponent,
  },
  {
    path: '',
    redirectTo: '/blogs/1',
    pathMatch: 'full',
  },
];
