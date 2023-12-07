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
        console.log(response);
        Array(response).forEach(article => {
          if (isArticle(article)) this.articles.push(article)
        });
        console.log(this.articles);
      });
  }
}
