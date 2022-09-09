import {Position} from "../interface/position";
import {DataService} from "../data/waypoint.service";
import {EnemyManager} from "../manager/enemy-manager";

export class Enemy {
  position: Position;
  enemyManager!: EnemyManager;
  width: number;
  height: number;
  radius: number;
  waypointIndex = 0;
  center!: Position;
  healt = 100;

  c!: CanvasRenderingContext2D;
  wayPoints! : Position[];

  constructor(context: CanvasRenderingContext2D, enemyManager: EnemyManager, pos?: Position)  {
    this.c = context;
    this.wayPoints = DataService.waypoints;
    this.enemyManager = enemyManager;

    pos ? this.position = pos : this.position = { x:0, y:0 }

    this.width = 100;
    this.height = 100;
    this.radius = 50;

    this.center = {
      x: this.position.x + this.width / 2,
      y: this.position.y + this.height / 2
    }
  }

  draw = () => {
    if(this.healt <= 0){
      const index = this.enemyManager.getEnemies().findIndex(enemy => {
        return enemy === this;
      })
      this.enemyManager.getEnemies().splice(index,1);
    }
    this.c.beginPath();
    this.c.arc(this.center.x,this.center.y, this.radius, 0, Math.PI * 2);

    this.c.fillStyle = 'red';
    this.c.fill()

    // Healtbar
    this.c.fillStyle = 'red';
    this.c.fillRect(this.position.x, this.position.y -15, this.width, 10);

    this.c.fillStyle = 'green';
    this.c.fillRect(this.position.x, this.position.y -15, this.width * this.healt / 100, 10);

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
