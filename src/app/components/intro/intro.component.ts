import { Component, OnInit } from '@angular/core';
import { Blob } from '../../models/blob.model';
import { TranslateModule } from '@ngx-translate/core';
import { gsap } from 'gsap';
import { StepsComponent } from '../steps/steps.component';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [TranslateModule, StepsComponent, RouterModule],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.scss',
})
export class IntroComponent implements OnInit {
  constructor(private router: Router) {}

  scrollToSteps() {
    const stepsSection = document.querySelector('#stepsContainer');
    if (stepsSection) {
      stepsSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  ngOnInit(): void {
    gsap.set('#introContainer', { opacity: 0, y: -100 });

    gsap.to('#introContainer', {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 0.25,
      ease: 'back.out(1.7)',
    });
  }
}
