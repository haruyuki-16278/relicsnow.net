import { Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { BlogComponent } from './components/blog/blog.component';

export const routes: Routes = [
  {
    path: 'blogs/:page',
    component: ListComponent,
  },
  {
    path: 'blog',
    component: BlogComponent,
  },
  {
    path: '',
    redirectTo: '/blogs/1',
    pathMatch: 'full',
  },
];
