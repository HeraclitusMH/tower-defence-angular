import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BehaviorSubject} from 'rxjs';
import {PlacementTile} from "../../model/placement-tile";
import {DataService} from "../../data/waypoint.service";

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class PlacementTileFactory {
  subject = new BehaviorSubject(null);
  dataService = new DataService();
  placementTiles: PlacementTile[] = [];
  c!: CanvasRenderingContext2D;
  constructor() {
  }

  generatePlacementTilesData = () => {
    this.dataService.getTowerPlacementTiles().forEach((row, y) =>{
      row.forEach((symbol,x) => {
        if (symbol === 14){
          this.placementTiles.push(new PlacementTile(this.c,
            {
              x: x * 64,
              y: y * 64
            }))
        }
      })
    })
  }
}
