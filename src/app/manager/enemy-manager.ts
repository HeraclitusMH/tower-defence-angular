import {Enemy} from "../model/enemy";

export class EnemyManager {
  c!: CanvasRenderingContext2D;
  private enemies: Enemy[] = [];

  constructor(canvasContext:CanvasRenderingContext2D) {
    this.c = canvasContext;
  }

  getEnemies = () => {
    return this.enemies;
  }

}
