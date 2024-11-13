import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import ZoomControl from '@mapbox-controls/zoom';

// Import required CSS
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import '@mapbox-controls/zoom/src/index.css';
import { CommonModule } from '@angular/common';
import { ThemeControlService } from '../../services/theme-control.service';

@Component({
  selector: 'app-mapbox',
  standalone: true,
  imports: [TranslateModule, CommonModule],
  templateUrl: './mapbox.component.html',
  styleUrl: './mapbox.component.scss',
})
export class MapboxComponent implements OnInit {
  map!: mapboxgl.Map;
  draw!: MapboxDraw;
  mapBoxStyle!: string;

  data = {
    frequencyOfIncidences: 4,
    typesOfIncidences: {
      6: 11,
      8: 4,
      9: 3,
    },
    magnitudeOfTraffic: 'high',
    timesOfIncidences: [
      ['2024-08-10T22:38:30+00:00', null],
      ['2024-11-11T21:00:00+00:00', '2024-11-19T20:59:59+00:00'],
    ],
    center_of_coordinates: [
      [46.69172686215, 24.76148111095],
      [46.69172686215, 24.76148111095],
      [46.6919491502375, 24.7659692785875],
      [46.6926683175, 24.759975719042856],
      [46.692853964696425, 24.739667938517858],
      [46.69692971652941, 24.762196891605882],
      [46.7013419109125, 24.74729556745],
      [46.699870232786274, 24.75085987939804],
      [46.70429623002, 24.745039562680002],
      [46.70435367058462, 24.742218146707692],
      [46.71435824455, 24.765574576190907],
      [46.716784952833336, 24.740961541133334],
      [46.717331229433334, 24.7600002937],
      [46.67995367820444, 24.734381121221112],
      [46.721126890449995, 24.752813215475],
    ],
  };
  dataKeys = [
    'traffic',
    'frequencyOfIncidences',
    'typesOfIncidences',
    'magnitudeOfTraffic',
    'timesOfIncidences',
  ];

  constructor(protected themeControl: ThemeControlService) {}

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
      console.log('Polygon Coordinates:', coordinates);
    }
  }
}
