import {Position} from "../interface/position";
import {OnInit} from "@angular/core";
import {Subject,Subscription,fromEvent} from "rxjs";

export class PlacementTile {
  position!: Position;
  c!: CanvasRenderingContext2D;
  mouse!: Position;
  size = 64;
  color = 'rgba(255,255,255,0.2)';
  activeTile: Subject<PlacementTile | null>

  constructor(context: CanvasRenderingContext2D, pos = {x:0, y:0},
              activeTileSub: Subject<PlacementTile | null>) {
    this.c = context;
    this.activeTile = activeTileSub;
    this.position = pos;
    this.mouse = { x:0, y:0 }

    fromEvent<MouseEvent>(document, 'mousemove').subscribe((e: MouseEvent) => {
          this.mouse.x = e.clientX;
          this.mouse.y = e.clientY;
    });
  }

  draw = () => {
    this.c.fillStyle = this.color;
    this.c.fillRect(this.position.x, this.position.y,this.size, this.size);
  }

  update = (activeTileExt: Subject<PlacementTile | null>) => {
    this.draw();
    if(this.mouse){
      if(this.mouse.x > this.position.x &&
        this.mouse.x < this.position.x + this.size &&
        this.mouse.y > this.position.y &&
        this.mouse.y < this.position.y + this.size){
        this.activeTile.next(this);
        activeTileExt.next(this);
        this.color = 'rgba(255,255,255,1)';
      } else {
        this.activeTile.next(null);
        this.color = 'rgba(255,255,255,0.2)';
      }
    }
  }
}
