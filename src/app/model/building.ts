import {Position} from "../interface/position";

export class Building {
  position!: Position;
  c!: CanvasRenderingContext2D;

  constructor(context: CanvasRenderingContext2D, pos = {x:0, y:0}) {
    this.c = context;
    this.position = pos;
  }

  draw = () => {
    this.c.fillStyle = 'blue';

  }
}
