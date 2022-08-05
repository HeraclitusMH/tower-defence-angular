import {Position} from "../interface/position";
import {Enemy} from "../model/enemy/enemy";
import {DataService} from "../data/waypoint.service";

export class EnemyFactory {

  private readonly context!: CanvasRenderingContext2D;
  enemies!: Enemy[];

  constructor(ctx: CanvasRenderingContext2D, enemies: Enemy[]) {
    this.enemies = enemies;
    this.context = ctx;
  }

  generateEnemy = (pos?:Position): Enemy[] => {
    if(pos){
      this.enemies.push(new Enemy(this.context, pos))
      return this.enemies;
    }
    let startingPosition = {
      x: DataService.waypoints[0].x,
      y: DataService.waypoints[0].y
    }
    this.enemies.push(new Enemy(this.context, startingPosition));
    return this.enemies;
  }

  generateWave = (nOfEnemies: number): Enemy[] => {
    for(let i = 1; i <= nOfEnemies; i ++){
      let position = {
        x: DataService.waypoints[0].x - i*150,
        y: DataService.waypoints[0].y
      }
      this.enemies.push(new Enemy(this.context, position));
    }
    return this.enemies;
  }

}
