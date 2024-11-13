import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent implements OnInit {
  constructor(private router: Router) {}

  navigateToMap() {
    this.router.navigate(['/map']);
  }

  ngOnInit(): void {
    gsap.set('#projectsContainer', { opacity: 0, y: 100 });

    gsap.to('#projectsContainer', {
      scrollTrigger: '#projectsContainer',
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 0.25,
      ease: 'power2.inOut',
    });
  }
}
