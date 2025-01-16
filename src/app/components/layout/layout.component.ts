import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  template: `
    <nav class="flex items-center justify-between">
      <h1 class="bg-marker-main text-3xl font-bold md:text-4xl">
        <a routerLink="/">relicsnow.net</a>
      </h1>

      <div class="flex gap-2">
        <a class="link-marker" href="https://github.com/haruyuki-16278" target="_blank">github</a>
        <a class="link-marker" href="https://twitter.com/haruyuki_16278" target="_blank"> Χ </a>
      </div>
    </nav>

    <main class="container-base">
      <router-outlet />
    </main>

    <footer class="flex items-center justify-center gap-2">
      <small class="w-72 shrink-0 text-text-sub">
        当サイトの内容は、特別に表記がない限り<br /><a
          href="https://creativecommons.org/licenses/by/4.0/deed.ja"
          >クリエイティブ・コモンズ 表示 4.0 ライセンス</a
        ><br />の下に提供されています。
      </small>
      <a class="non-underline" href="https://creativecommons.org/licenses/by/4.0/deed.ja">
        <img
          class="w-20"
          src="https://mirrors.creativecommons.org/presskit/buttons/88x31/svg/by.svg"
        />
      </a>
    </footer>
  `,
})
export class LayoutComponent {}
