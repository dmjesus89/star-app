import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  constructor(
    private title: Title,
    private meta: Meta
  ) {}

  updateTitle(title: string): void {
    this.title.setTitle(`${title} - Star Beachwear`);
  }

  updateMetaTags(tags: { [key: string]: string }): void {
    Object.entries(tags).forEach(([name, content]) => {
      this.meta.updateTag({ name, content });
    });
  }
}