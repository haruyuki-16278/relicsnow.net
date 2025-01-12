import { injectContentFiles } from '@analogjs/content';
import { RouteMeta } from '@analogjs/router';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import PostAttributes from '../post-attributes';

export const routeMeta: RouteMeta = {
  title: 'ブログ記事一覧',
  meta: [
    {
      name: 'description',
      content: 'RelicSnow.netのブログ記事一覧ページです'
    },
    {
      property: 'og:title',
      content: 'ブログ記事一覧 | RelicSnow.net'
    }
  ]
};

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [RouterLink],
  templateUrl: "./index.page.html"
})
export default class IndexComponent {
  readonly posts = injectContentFiles<PostAttributes>();
}
