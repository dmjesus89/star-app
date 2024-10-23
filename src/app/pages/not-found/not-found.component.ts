// src/app/pages/not-found/not-found.component.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="not-found">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you're looking for doesn't exist.</p>
      <a routerLink="/" class="home-link">Go to Homepage</a>
    </div>
  `,
  styles: [`
    .not-found {
      height: 60vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;

      h1 {
        font-size: 6rem;
        margin: 0;
        color: #0066cc;
      }

      h2 {
        font-size: 2rem;
        margin: 0;
        color: #333;
      }

      p {
        margin: 1rem 0 2rem;
        color: #666;
      }

      .home-link {
        padding: 0.75rem 1.5rem;
        background: #0066cc;
        color: white;
        text-decoration: none;
        border-radius: 4px;
        transition: background-color 0.3s;

        &:hover {
          background: #0052a3;
        }
      }
    }
  `]
})
export class NotFoundComponent {}