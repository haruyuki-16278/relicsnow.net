import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Article, isArticle } from '../../types/articles.type';

@Component({
  selector: 'rs-list',
  standalone: true,
  imports: [CommonModule],
  providers: [HttpClient],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent implements OnInit {
  articles: Article[] = [];

  constructor(private readonly httpClient: HttpClient) {}

  ngOnInit() {
    this.httpClient
      .get('assets/articles/article-list.json')
      .subscribe((response) => {
        if (Array.isArray(response)) {
          response.forEach(article => {
            if (isArticle(article)) {
              article.created_at = new Date(article.created_at)
              if (article.updated_at) article.updated_at = new Date(article.updated_at)
              this.articles.push(article)
            }
          });
        }
        console.log(this.articles);
      });
  }

  getDateLabel (article: Article): string {
    const createdAt = `${article.created_at.getFullYear()}/${article.created_at.getMonth() + 1}/${article.created_at.getDate()}`
    let updatedAt: string | undefined = undefined
    if (article.updated_at) updatedAt = `${article.updated_at.getFullYear()}/${article.updated_at.getMonth()+1}/${article.updated_at.getDate()}`
    return createdAt + `${updatedAt ? `(更新: ${updatedAt})` : ''}`
  }
}
