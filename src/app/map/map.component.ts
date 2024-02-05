import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import { MAP_ACTION, MAP_MODE } from './map.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  map?: mapboxgl.Map;
  draw?: MapboxDraw;

  MAP_ACTION = MAP_ACTION;
  MAP_MODE = MAP_MODE;
  selectedMode = this.MAP_MODE.SIMPLE;

  ngOnInit() {
    this.initializeMap();
    this.initializeDraw();
    this.selectedMode = this.MAP_MODE.DEFAULT;
  }

  initializeMap() {
    this.map = new mapboxgl.Map({
      accessToken: 'pk.eyJ1IjoibWFyb29uZWRpb25lIiwiYSI6ImNqdmp0MzB1azBpcDAzem1naHZwMjNndGIifQ.65nvvRg9QeFUV2c6b9W4Vw',
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [0, 0],
      zoom: 2
    });
  }

  initializeDraw() {
    this.draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true
      }
    });

    this.map?.addControl(this.draw);
  }

  useAction(mode: string) {
    this.draw?.changeMode(mode);
  }

  changeMode(mode: any) {
    switch (mode) {
      case MAP_MODE.DEFAULT:
        this.map?.setStyle('mapbox://styles/mapbox/streets-v11');
        break;
      case MAP_MODE.NATURAL:
        this.map?.setStyle('mapbox://styles/mapbox/satellite-streets-v11');
        break;
      case MAP_MODE.SIMPLE:
        this.map?.setStyle('mapbox://styles/mapbox/outdoors-v11');
        break;
    }
  }

  changeExtrudeHeight() {
    const newHeight = prompt("Enter new extrude height:");
    if (newHeight) {
      this.setExtrudeHeight(+newHeight);
    }
  }

  setExtrudeHeight(newHeight: number) {
    if (this.map && this.map.getLayer('extrusion-layer')) {
      this.map.setPaintProperty('extrusion-layer', 'fill-extrusion-height', newHeight);
    }
  }
}
