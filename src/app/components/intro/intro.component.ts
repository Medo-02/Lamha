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
export class IntroComponent implements OnInit{
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
  private posX: number = 0;
  private posY: number = 0;
  private speed: number = 0.2;

  animateBlobs() {
    const blobsEls = document.querySelectorAll('.blob');
    const blobs = Array.from(blobsEls).map((blobEl) => new Blob(blobEl));

    function update() {
      blobs.forEach((blob) => {
        blob.update();
        blob.move();
      });
      requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }
}
