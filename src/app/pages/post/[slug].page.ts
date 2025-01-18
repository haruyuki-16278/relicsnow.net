import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { injectContent, MarkdownComponent } from '@analogjs/content';

import PostAttributes from '../../post-attributes';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [AsyncPipe, MarkdownComponent],
  template: `
    @if (post$ | async; as post) {
      <article class="px-4 py-8">
        <img class="mx-auto max-h-[40vh]" [src]="post.attributes.coverImage" />
        <analog-markdown [content]="post.content" />
      </article>
    }
  `,
})
export default class BlogPostComponent {
  readonly post$ = injectContent<PostAttributes>('slug');
}
