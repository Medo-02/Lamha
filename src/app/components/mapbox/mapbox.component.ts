import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import ZoomControl from '@mapbox-controls/zoom';
import '@mapbox-controls/zoom/src/index.css';

@Component({
  selector: 'app-mapbox',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './mapbox.component.html',
  styleUrl: './mapbox.component.scss',
})
export class MapboxComponent implements OnInit {
  map!: mapboxgl.Map;
  draw!: MapboxDraw;

  constructor() {
    // Move MapboxDraw initialization to ngOnInit
  }

  ngOnInit() {
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
      style: 'mapbox://styles/mapbox/traffic-night-v2',
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
      this.map.addControl(new ZoomControl(), 'bottom-right');
      // Add event listeners
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
