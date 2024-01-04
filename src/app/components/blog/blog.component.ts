import { Component, HostBinding, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { marked } from 'marked';
import hljs from 'highlight.js';

@Component({
  selector: 'rs-blog',
  standalone: true,
  imports: [CommonModule],
  template: '{{ article }}',
  styleUrl: './blog.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class BlogComponent implements OnInit {
  @HostBinding('innerHTML')
  article = '';

  constructor(private readonly route: ActivatedRoute, private readonly httpClient: HttpClient) {}

  ngOnInit() {
    this.route.queryParams.subscribe((v) => {
      if ('path' in v && v?.['path']) {
        this.httpClient
          .get(`assets/articles/${v['path']}`, {
            responseType: 'text',
          })
          .subscribe(async (response) => {
            this.article = `<main>${await marked(
              response.replace(/---[\s\S\n]*---\n/g, ''),
            )}</main>`.replaceAll('src="imgs/', 'src="assets/articles/imgs/');
            const codes = [...this.article.matchAll(/<code(.*?)>([\s\S\n]*?)<\/code>/g)];
            console.log(codes);
            codes.forEach((code) => {
              const format = [...code[1].matchAll(/class="language-(.+)"/g)]?.[0]?.[1];
              const highlighted = hljs.highlight(code[2], { language: format ?? 'javascript' });
              this.article = this.article.replace(code[0], `<code>${highlighted.value}</code>`);
            });
            console.log(this.article);
          });
      }
    });
  }
}
