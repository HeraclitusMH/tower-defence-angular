import {Position} from "../interface/position";
import {Projectile} from "./projectile";
import {Enemy} from "./enemy";
import {EnemyManager} from "../manager/enemy-manager";

export class Building {
  private readonly position!: Position;
  private readonly center!: Position;
  c!: CanvasRenderingContext2D;
  projectiles: Projectile[] = [];
  width: number = 64;
  rangeRadius = 250;
  target!: Enemy;
  frames: number = 0;

  constructor(context: CanvasRenderingContext2D, pos = {x:0, y:0}) {
    this.c = context;
    this.position = pos;
    this.center = {
      x: this.position.x + this.width / 2,
      y: this.position.y + this.width / 2
    }
  }

  draw = () => {
    this.c.fillStyle = 'blue';
    this.c.fillRect(this.position.x,this.position.y,this.width,this.width)
    this.showRadius();
  }

  update = () => {
    this.draw();
    if(this.frames % 100 === 0 && this.target){
      console.log(this.center);
      this.projectiles.push(new Projectile(this.c,
        {
          x:this.center.x,
          y:this.center.y
        },this.target))
    }
    this.frames++;
  }

  showRadius = () => {
    this.c.beginPath();
    this.c.arc(this.position.x,this.position.y, this.rangeRadius, 0, Math.PI * 2);
    this.c.fillStyle = 'rgba(0,0,255,0.2)';
    this.c.fill()
  }

  getPosition = () => {
    return this.position;
  }

  getCenter = () => {
    return this.center;
  }

  getValidEnemy = (enemyManager: EnemyManager): Enemy => {
    return this.getValidEnemies(enemyManager)[0];
  }

  private getValidEnemies = (enemyManager: EnemyManager) => {
    return enemyManager.getEnemies().filter(enemy => {
      const xDifference = enemy.center.x - this.getCenter().x;
      const yDifference = enemy.center.y - this.getCenter().y;
      const distance = Math.hypot(xDifference,yDifference);
      return distance < enemy.radius + this.rangeRadius
    });
  }
}
