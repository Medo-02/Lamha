import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {

  navbarScrolled: boolean = false;
  isDarkTheme = false; // Default is light theme

  constructor(private translateService: TranslateService, private cookieService: CookieService) {}
  toggleLang() {
    const currentLang = this.translateService.currentLang;
    const newLang = currentLang === 'ar' ? 'en' : 'ar';
    this.translateService.use(newLang);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollOffset =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    this.navbarScrolled = scrollOffset > 0;
  }

  ngOnInit() {
    const darkThemeCookie = this.cookieService.get('darkTheme');
    this.isDarkTheme = darkThemeCookie === 'true';
    this.applyTheme();
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    this.applyTheme();
    this.cookieService.set('darkTheme', String(this.isDarkTheme), { expires: 9999 });
  }

  applyTheme() {
    if (this.isDarkTheme) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }
}
