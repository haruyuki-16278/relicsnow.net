import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './layout.component.html',
  styles: `
    :host {
      @apply flex min-h-full flex-col;
    }
  `,
})
export class LayoutComponent {}
