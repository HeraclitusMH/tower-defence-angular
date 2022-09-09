import {Position} from "../interface/position";
import {Enemy} from "../model/enemy";
import {DataService} from "../data/waypoint.service";
import {EnemyManager} from "../manager/enemy-manager";

export class EnemyFactory {

  private readonly context!: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D) {
    this.context = ctx;
  }

  generateEnemy = (enemies: Enemy[], pos?:Position): Enemy[] => {
    if(pos){
      enemies.push(new Enemy(this.context, pos))
      return enemies;
    }
    let startingPosition = {
      x: DataService.waypoints[0].x,
      y: DataService.waypoints[0].y
    }
    enemies.push(new Enemy(this.context, startingPosition));
    return enemies;
  }

  generateWave = (nOfEnemies: number, enemyManager: EnemyManager): void => {
    for(let i = 1; i <= nOfEnemies; i ++){
      let position = {
        x: DataService.waypoints[0].x - i*150,
        y: DataService.waypoints[0].y
      }
      enemyManager.getEnemies().push(new Enemy(this.context, position));
      console.log(enemyManager.getEnemies());
    }
  }

}
