import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import { MAP_MODE } from './map.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  map?: mapboxgl.Map;
  draw?: MapboxDraw;

  ngOnInit() {
    this.map = new mapboxgl.Map({
      accessToken: 'pk.eyJ1IjoibWFyb29uZWRpb25lIiwiYSI6ImNqdmp0MzB1azBpcDAzem1naHZwMjNndGIifQ.65nvvRg9QeFUV2c6b9W4Vw',
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [0, 0],
      zoom: 2
    });


    this.draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true
      }
    });

    this.map.addControl(this.draw);
  }

  changeMode(mode: MAP_MODE) {
    this.draw?.changeMode(mode);
  }

  protected readonly MAP_MODE = MAP_MODE;
}
