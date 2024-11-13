import { Component, OnInit } from '@angular/core';
import { Blob } from '../../models/blob.model';
import { TranslateModule } from '@ngx-translate/core';
import { gsap } from 'gsap';
@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.scss',
})
export class IntroComponent implements OnInit {
  ngOnInit(): void {
    gsap.set('#introContainer', { opacity: 0, y: -100 });

    // Animate on page load
    gsap.to('#introContainer', {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 0.25,
      ease: 'back.out(1.7)',
    });
  }
}
