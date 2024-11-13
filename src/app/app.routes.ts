import { Routes } from '@angular/router';
import { map } from 'rxjs';
import { MapboxComponent } from './components/mapbox/mapbox.component';
import { IntroComponent } from './components/intro/intro.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: IntroComponent },
  { path: 'map', component: MapboxComponent },
];
