import {Position} from "../interface/position";
import {Enemy} from "./enemy";
export class Projectile {
  position!: Position;
  c!: CanvasRenderingContext2D;
  velocity!: Position;
  distance: any;
  enemy!: Enemy;
  radius = 10;
  velocityPower = 5;

  constructor(context: CanvasRenderingContext2D, pos = {x:0, y:0}, enemy : Enemy) {
    this.c = context;
    this.enemy = enemy;
    this.position = pos;
    this.velocity = {x:0,y:0}
  }

  draw = () => {
    this.c.beginPath();
    this.c.arc(this.position.x,this.position.y,this.radius, 0, Math.PI * 2);
    this.c.fillStyle = 'orange';
    this.c.fill();
  }

  update = () => {
    this.draw();
    this.calcVelocity();
    this.calcDistance()
  }

  isColliding = () => {
    return this.calcDistance() < this.enemy.radius;
  }

  calcVelocity = () => {
    const angle = Math.atan2(
      this.enemy.center.y - this.position.y,
      this.enemy.center.x - this.position.x
    )
    this.velocity.x = Math.cos(angle) * this.velocityPower;
    this.velocity.y = Math.sin(angle) * this.velocityPower;

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  private calcDistance = () => {
    const xDifference = this.enemy.center.x - this.position.x;
    const yDifference = this.enemy.center.y - this.position.y;
    return Math.hypot(xDifference, yDifference);
  }
}
