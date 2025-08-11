import { Injectable, Renderer2, RendererFactory2, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;
  private currentTheme: 'light' | 'dark' = 'light';

  constructor(rendererFactory: RendererFactory2, @Inject(PLATFORM_ID) private platformId: Object) {
    this.renderer = rendererFactory.createRenderer(null, null);
    if (isPlatformBrowser(this.platformId)) {
      this.initializeTheme(); 
    }
  }

  private initializeTheme() {
    const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.currentTheme = storedTheme || (prefersDark ? 'dark' : 'light');
    this.renderer.addClass(document.documentElement, this.currentTheme);
  }

  toggleTheme() {
    const oldTheme = this.currentTheme;
    this.currentTheme = oldTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', this.currentTheme);
    this.renderer.removeClass(document.documentElement, oldTheme);
    this.renderer.addClass(document.documentElement, this.currentTheme);
  }

  getTheme(): 'light' | 'dark' {
    return this.currentTheme;
  }
}