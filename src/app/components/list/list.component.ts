import { Component, HostBinding, Inject, OnInit } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Article, isArticle } from '../../types/articles.type';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'rs-list',
  standalone: true,
  imports: [CommonModule],
  providers: [HttpClient],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent implements OnInit {
  articlesPerPage = 10;
  page: number = 1
  articleCount: number = 0;
  articles: Article[] = [];

  @HostBinding('style.minHeight')
  minHeight: string = '0'

  get showNextLink (): boolean {
    return this.page < Math.ceil(this.articleCount / 10)
  }

  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly route: ActivatedRoute,
    private readonly httpClient: HttpClient
  ) {}

  ngOnInit() {
    this.route.params.subscribe(v => {
      if (v?.['page'] < 1) {
        window.location.href='/blogs/1'
      }
      this.page = Number(v?.['page'])
    })

    this.httpClient
      .get('assets/articles/article-list.json')
      .subscribe((response) => {
        if (Array.isArray(response)) {
          this.articleCount = response.length
          const start = (this.page - 1) * this.articlesPerPage
          response.slice(start, start + this.articlesPerPage).forEach(article => {
            if (isArticle(article)) {
              article.created_at = new Date(article.created_at)
              if (article.updated_at) article.updated_at = new Date(article.updated_at)
              this.articles.push(article)
            }
          });
        }
      });

    const headerHeight = this.document.querySelector('rs-header')?.clientHeight ?? 0
    const footerHeight = this.document.querySelector('rs-footer')?.clientHeight ?? 0
    this.minHeight = `calc(100vh - ${headerHeight}px - ${footerHeight}px)`
  }

  getDateLabel (article: Article): string {
    const createdAt = `${article.created_at.getFullYear()}/${article.created_at.getMonth() + 1}/${article.created_at.getDate()}`
    let updatedAt: string | undefined = undefined
    if (article.updated_at) updatedAt = `${article.updated_at.getFullYear()}/${article.updated_at.getMonth()+1}/${article.updated_at.getDate()}`
    return createdAt + `${updatedAt ? `(更新: ${updatedAt})` : ''}`
  }
}
