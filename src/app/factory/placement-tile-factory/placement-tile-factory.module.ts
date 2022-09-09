import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BehaviorSubject} from 'rxjs';
import {PlacementTile} from "../../model/placement-tile";
import {DataService} from "../../data/waypoint.service";
import {Subject} from "rxjs";
import {Position} from "../../interface/position";
import {PlacementTilesManager} from "../../manager/placement-tiles-manager";

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class PlacementTileFactory {
  subject = new BehaviorSubject(null);
  dataService = new DataService();
  c!: CanvasRenderingContext2D;

  constructor(canvasContext:CanvasRenderingContext2D) {
    this.c = canvasContext;
  }

  generatePlacementTilesData = (placementTilesManager: PlacementTilesManager) => {
    this.dataService.getTowerPlacementTiles().forEach((row, y) =>{
      row.forEach((symbol,x) => {
        if (symbol === 14){
          let position: Position = {
            x: x * 64,
            y: y * 64
          }
          placementTilesManager.getPlacementTiles().push(new PlacementTile(this.c,position,placementTilesManager))
        }
      })
    })
  }
}
