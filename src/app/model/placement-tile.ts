import {Position} from "../interface/position";
import {OnInit} from "@angular/core";
import {Subject,Subscription,fromEvent} from "rxjs";
import {PlacementTileFactory} from "../factory/placement-tile-factory.module";
import {PlacementTilesManager} from "../manager/placement-tiles-manager";

export class PlacementTile {
  position!: Position;
  c!: CanvasRenderingContext2D;
  mouse!: Position;
  size = 64;
  color = 'rgba(255,255,255,0.2)';
  placementTileManager: PlacementTilesManager;
  isOccupied = false;

  constructor(context: CanvasRenderingContext2D, pos = {x:0, y:0},
              placementTileManager: PlacementTilesManager) {
    this.c = context;
    this.position = pos;
    this.mouse = { x:0, y:0 }
    this.placementTileManager = placementTileManager;

    fromEvent<MouseEvent>(document, 'mousemove').subscribe((e: MouseEvent) => {
          this.mouse.x = e.clientX;
          this.mouse.y = e.clientY;
    });
  }

  update = () => {
    this.draw();
    if(this.mouse){
      if(this.mouse.x > this.position.x &&
        this.mouse.x < this.position.x + this.size &&
        this.mouse.y > this.position.y &&
        this.mouse.y < this.position.y + this.size){
        this.placementTileManager.activeTile = this;
        this.color = 'rgba(255,255,255,1)';
      } else {
        if(this === this.placementTileManager.getActiveTile()){
          this.placementTileManager.activeTile = null;
        }
        this.color = 'rgba(255,255,255,0.2)';
      }
    }
  }

  draw = () => {
    this.c.fillStyle = this.color;
    this.c.fillRect(this.position.x, this.position.y,this.size, this.size);
  }
}
