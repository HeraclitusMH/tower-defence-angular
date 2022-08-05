import {Position} from "../interface/position";
import {OnInit} from "@angular/core";

export class PlacementTile{
  position!: Position;
  c!: CanvasRenderingContext2D;
  mouse!: Position;
  size = 64;
  color = 'rgba(255,255,255,0.2)';


  constructor(context: CanvasRenderingContext2D, pos = {x:0, y:0}) {
    this.c = context;
    this.position = pos;
    window.addEventListener('mousemove',(event) => {
      this.mouse = { x: event.clientX, y: event.clientY }
    })
  }

  draw = () => {
    this.c.fillStyle = this.color;
    this.c.fillRect(this.position.x, this.position.y,this.size, this.size);
  }

  update = () => {
    this.draw();
    if(this.mouse.x > this.position.x &&
       this.mouse.x < this.position.x + this.size &&
       this.mouse.y > this.position.y &&
       this.mouse.y < this.position.y + this.size){
      this.color = 'rgba(255,255,255,1)';
    } else {
      this.color = 'rgba(255,255,255,0.2)';
    }
  }


}
