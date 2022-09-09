import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Enemy} from "./model/enemy";
import {EnemyFactory} from "./factory/enemy-factory";
import {Position} from "./interface/position";
import {DataService} from "./data/waypoint.service";
import {PlacementTile} from "./model/placement-tile";
import {PlacementTileFactory} from "./factory/placement-tile-factory/placement-tile-factory.module";
import {BehaviorSubject, Subject, fromEvent, switchMap, exhaustMap, mergeMap, tap} from "rxjs";
import {take} from "rxjs/operators";
import {Building} from "./model/building";
import {PlacementTilesManager} from "./manager/placement-tiles-manager";
import {EnemyManager} from "./manager/enemy-manager";

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
  buildings: Building[] = [];
  enemyFactory!: EnemyFactory;
  enemyManager!: EnemyManager;
  placementTileFactory!: PlacementTileFactory;
  dataService = new DataService();
  activeTile: PlacementTile | null = null;
  click$ = fromEvent(document, 'click');

  placementTilesManager!: PlacementTilesManager;

  ngOnInit(){
    this.canvas = this.initializeCanvas();
    this.canvasContext = this.canvas.getContext('2d')!;
    this.enemyFactory = new EnemyFactory(this.canvasContext);
    this.enemyManager = new EnemyManager(this.canvasContext);
    this.placementTileFactory = new PlacementTileFactory(this.canvasContext);
    this.placementTilesManager = new PlacementTilesManager(this.canvasContext)

    this.image = new Image();
    this.image.src = '../../assets/map.png';

    this.enemyFactory.generateWave(6,this.enemyManager);
    this.placementTileFactory.generatePlacementTilesData(this.placementTilesManager);
    this.clickListener();
  }

  clickListener = () => {
    this.click$.subscribe(x => {
      this.buildConstructor();
    })
  }

  buildConstructor = () => {
    if(this.placementTilesManager.getActiveTile() && !this.placementTilesManager.getActiveTile()?.isOccupied){
      this.buildings.push(new Building(this.canvasContext,this.placementTilesManager.getActiveTile()?.position))
      this.placementTilesManager.getActiveTile()!.isOccupied = true;
    }
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
    this.enemyManager.getEnemies().forEach(enemy => {
      enemy.update();
    });
    this.placementTilesManager.getPlacementTiles().forEach(tile => {
      tile.update();
    })
    this.buildings.forEach(build => {
      build.update();
      const validEnemy = this.enemyManager.getEnemies().filter(enemy => {
        const xDifference = enemy.center.x - build.getCenter().x;
        const yDifference = enemy.center.y - build.getCenter().y;
        const distance = Math.hypot(xDifference,yDifference);
        return distance < enemy.radius + build.rangeRadius
      })
      build.target = validEnemy[0];
      for(let i = build.projectiles.length - 1 ; i>=0; i--){
        const projectile = build.projectiles[i];
        projectile.update();
        if(projectile.isColliding()){
          console.log(this.buildings[0].getPosition());
          build.projectiles.splice(i,1);
        }
      }
    })
  }
}
