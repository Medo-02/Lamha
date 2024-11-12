import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import MapboxDraw from '@mapbox/mapbox-gl-draw';

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

  ngOnInit() {
    mapboxgl.accessToken =
      'REMOVED';
    mapboxgl.setRTLTextPlugin(
      'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.3.0/mapbox-gl-rtl-text.js',
      null,
      true // Lazy load the plugin
    );
    const map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/traffic-night-v2',
      center: [46.7219, 24.6877], // Riyadh coordinates

      zoom: 9, // starting zoom
    });

    // Add navigation controls to the map
    this.map.addControl(new mapboxgl.NavigationControl());


    this.draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true, // Enable the polygon drawing tool
        trash: true, // Enable the delete tool
      },
    });
    this.map.addControl(this.draw);

    // Event listener for when a polygon is created or updated
    this.map.on('draw.create', this.updatePolygonCoordinates.bind(this));
    this.map.on('draw.update', this.updatePolygonCoordinates.bind(this));
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
