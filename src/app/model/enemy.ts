import {Position} from "../interface/position";
import {DataService} from "../data/waypoint.service";

export class Enemy {
  position: Position;
  width: number;
  height: number;
  radius: number;
  waypointIndex = 0;
  center!: Position;

  c!: CanvasRenderingContext2D;
  wayPoints! : Position[];

  constructor(context: CanvasRenderingContext2D, pos?: Position, )  {
    this.c = context;
    this.wayPoints = DataService.waypoints;
    pos ? this.position = pos : this.position = { x:0, y:0 }

    this.width = 35;
    this.height = 35;
    this.radius = 35;

    this.center = {
      x: this.position.x + this.width / 2,
      y: this.position.y + this.height / 2
    }
  }

  draw = () => {
    this.c.beginPath();
    this.c.arc(this.center.x,this.center.y, this.radius, 0, Math.PI * 2);
    this.c.fillStyle = 'red';
    this.c.fill()
  }

  update = () => {
    this.draw();
    const wp = this.wayPoints[this.waypointIndex];
    const yDistance = wp.y - this.center.y;
    const xDistance = wp.x - this.center.x;
    const angle = Math.atan2(yDistance,xDistance);
    this.position.x += Math.cos(angle);
    this.position.y += Math.sin(angle);
    this.center = {
      x: this.position.x + this.width / 2,
      y: this.position.y + this.height / 2
    }

    if(Math.round(this.center.x) === Math.round(wp.x) &&
       Math.round(this.center.y) === Math.round(wp.y) &&
       this.waypointIndex < this.wayPoints.length -1){
      this.waypointIndex++;
    }
  }
}
