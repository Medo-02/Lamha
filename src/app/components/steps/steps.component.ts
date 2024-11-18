import { Component, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
@Component({
  selector: 'app-steps',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './steps.component.html',
  styleUrl: './steps.component.scss'
})
export class StepsComponent implements OnInit {
  constructor(private translateService: TranslateService) { }
  
  ngOnInit(): void {
    const isArabic = this.translateService.currentLang === 'ar';
    gsap.registerPlugin(ScrollTrigger);

    //step 1 animation
    gsap.set('#step1', { opacity: 0, x: isArabic ? -250 : 250 });
    gsap.to('#step1', {
      scrollTrigger: {
        trigger: '#step1',
        start: 'top center',
        toggleActions: 'play none none none',
      },
      opacity: 1,
      x: 0,
      duration: 1,
      ease: 'back.out(1.7)',
    });

    //step 2 animation
    gsap.set('#step2', { opacity: 0, x: isArabic ? 250 : -250 });
    gsap.to('#step2', {
      scrollTrigger: {
        trigger: '#step2',
        start: 'top center',
        toggleActions: 'play none none none',
      },
      opacity: 1,
      x: 0,
      duration: 1,
      ease: 'back.out(1.7)',
    });

    //step 3 animation
    gsap.set('#step3', { opacity: 0, x: isArabic ? -250 : 250 });
    gsap.to('#step3', {
      scrollTrigger: {
        trigger: '#step3',
        start: 'top center',
        toggleActions: 'play none none none',
      },
      opacity: 1,
      x: 0,
      duration: 1,
      ease: 'back.out(1.7)',
    });
  }
  
}
