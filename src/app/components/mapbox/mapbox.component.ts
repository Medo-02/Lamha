import { Component, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import ZoomControl from '@mapbox-controls/zoom';

// Import required CSS
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import '@mapbox-controls/zoom/src/index.css';
import { CommonModule } from '@angular/common';
import { ThemeControlService } from '../../services/theme-control.service';
import { StatisticsService } from '../../services/statistics.service';

@Component({
  selector: 'app-mapbox',
  standalone: true,
  imports: [TranslateModule, CommonModule],
  templateUrl: './mapbox.component.html',
  styleUrl: './mapbox.component.scss',
})
export class MapboxComponent implements OnInit {
  parseInt(arg0: any) {
    throw new Error('Method not implemented.');
  }
  map!: mapboxgl.Map;
  draw!: MapboxDraw;
  mapBoxStyle!: string;
  temp: any;
  data: any;
  dataKeys = [
    'traffic',
    'frequencyOfIncidences',
    'typesOfIncidences',
    'magnitudeOfTraffic',
    'timesOfIncidences',
  ];

  constructor(
    protected themeControl: ThemeControlService,
    private statisticsService: StatisticsService,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.mapBoxStyle = this.themeControl.isDarkTheme
      ? 'mapbox://styles/mapbox/traffic-night-v2'
      : 'mapbox://styles/mapbox/light-v10';
    // Set access token
    mapboxgl.accessToken =
      'REMOVED';

    // Set RTL text plugin
    mapboxgl.setRTLTextPlugin(
      'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.3.0/mapbox-gl-rtl-text.js',
      null,
      true
    );

    // Initialize map
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.mapBoxStyle,
      center: [46.7219, 24.6877],
      zoom: 9,
    });

    // Initialize draw after map is loaded
    this.map.on('load', () => {
      // Initialize MapboxDraw
      this.draw = new MapboxDraw({
        displayControlsDefault: false,
        controls: {
          polygon: true,
          trash: true,
        },
        defaultMode: 'draw_polygon',
      });

      // Add draw control to map
      this.map.addControl(this.draw);

      // Add zoom control
      this.map.addControl(new ZoomControl(), 'bottom-right');

      // Add geocoder control
      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl as any, // Type assertion needed for TypeScript
        placeholder: 'Search for a location...',
        proximity: {
          longitude: 46.7219,
          latitude: 24.6877,
        }, // Bias results toward Riyadh
        language: 'ar', // Set to Arabic
        countries: 'sa', // Limit to Saudi Arabia
      });

      this.map.addControl(geocoder, 'top-left');

      // Optional: Handle geocoder result
      geocoder.on('result', (event) => {
        console.log('Selected location:', event.result);
      });

      // Add event listeners for draw
      this.map.on('draw.create', this.updatePolygonCoordinates.bind(this));
      this.map.on('draw.update', this.updatePolygonCoordinates.bind(this));
    });
  }

  updatePolygonCoordinates(event: any): void {
    // Get all drawn features
    const data = this.draw.getAll();

    // Find the coordinates of the last drawn polygon
    if (data.features.length) {
      const coordinates = data.features[0].geometry;
      this.temp = coordinates;
      this.statisticsService.getStatistics(this.temp.coordinates[0]).subscribe({
        next: (response) => {
          this.data = response;
          console.log('Statistics:', response);
        },
        error: (error) => {
          console.error('Error fetching statistics:', error);
        },
      });
      console.log('Polygon Coordinates:', this.temp.coordinates[0]);
    }
  }
  getTrafficMagnitudeEntries(magnitude: any): [string, number][] {
    if (!magnitude || typeof magnitude !== 'object') {
      return [];
    }
    return Object.entries(magnitude).map(([key, value]) => {
      return [
        this.translateService.instant(`mapbox.types.${key}.description`),
        value as number,
      ];
    });
  }
}
