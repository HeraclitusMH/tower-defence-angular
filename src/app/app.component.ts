import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Enemy} from "./model/enemy/enemy";
import {EnemyFactory} from "./factory/enemy-factory";
import {Position} from "./interface/position";
import {DataService} from "./data/waypoint.service";
import {PlacementTile} from "./model/placement-tile";
import {PlacementTileFactory} from "./factory/placement-tile-factory/placement-tile-factory.module";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit,AfterViewInit{
  title = 'tower_defense_angular';
  image!: HTMLImageElement;
  canvas!: HTMLCanvasElement;
  canvasContext!: CanvasRenderingContext2D;
  enemies: Enemy[] = [];
  placementTiles: PlacementTile[] = [];
  enemyFactory!: EnemyFactory;
  placementTileFactory!: PlacementTileFactory;
  dataService = new DataService();

  ngOnInit(){
    this.canvas = this.initializeCanvas();
    this.canvasContext = this.canvas.getContext('2d')!;
    this.enemyFactory = new EnemyFactory(this.canvasContext,this.enemies);
    this.
    this.generatePlacementTilesData();

    this.image = new Image();
    this.image.src = '../../assets/map.png';

    this.enemyFactory.generateWave(6);
  }

  ngAfterViewInit(){
    this.animate();
  }

  initializeCanvas = () => {
    const canvas = document.querySelector('canvas')!;
    canvas.width = 1280;
    canvas.height = 768;
    return canvas;
  }

  animate = () => {
    requestAnimationFrame(() => this.animate());
    this.canvasContext.drawImage(this.image,0,0);
    this.enemies.forEach(enemy => {
      enemy.update();
    });
    this.placementTiles.forEach(tile => {
      tile.update();
    })
  }

  generateEnemy = (pos?: Position) => {
    this.enemies = this.enemyFactory.generateEnemy(pos);
  }
}
