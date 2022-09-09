import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BehaviorSubject} from 'rxjs';
import {PlacementTile} from "../../model/placement-tile";
import {DataService} from "../../data/waypoint.service";
import {Subject} from "rxjs";
import {Position} from "../../interface/position";

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class PlacementTileFactory {
  private placementTiles: PlacementTile[] = [];
  subject = new BehaviorSubject(null);
  dataService = new DataService();
  c!: CanvasRenderingContext2D;
  activeTile: Subject<PlacementTile | null>;

  constructor(canvasContext:CanvasRenderingContext2D, activeTileSub: Subject<PlacementTile | null>) {
    this.c = canvasContext;
    this.activeTile = activeTileSub
  }

  generatePlacementTilesData = () => {
    this.dataService.getTowerPlacementTiles().forEach((row, y) =>{
      row.forEach((symbol,x) => {
        if (symbol === 14){
          let position: Position = {
            x: x * 64,
            y: y * 64
          }
          this.placementTiles.push(new PlacementTile(this.c,position,this.activeTile))
        }
      })
    })
  }

  getPlacementTiles = () => {
    return this.placementTiles;
  }

}
