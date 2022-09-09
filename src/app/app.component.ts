import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Enemy} from "./model/enemy/enemy";
import {EnemyFactory} from "./factory/enemy-factory";
import {Position} from "./interface/position";
import {DataService} from "./data/waypoint.service";
import {PlacementTile} from "./model/placement-tile";
import {PlacementTileFactory} from "./factory/placement-tile-factory/placement-tile-factory.module";
import {BehaviorSubject, Subject, fromEvent, switchMap, exhaustMap, mergeMap, tap} from "rxjs";
import {take} from "rxjs/operators";
import {Building} from "./model/building";
import {PlacementTilesManager} from "./manager/placement-tiles-manager";

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
  buildings: Building[] = [];
  enemyFactory!: EnemyFactory;
  placementTileFactory!: PlacementTileFactory;
  dataService = new DataService();
  activeTile: PlacementTile | null = null;
  click$ = fromEvent(document, 'click');

  placementTilesManager!: PlacementTilesManager;

  ngOnInit(){
    this.canvas = this.initializeCanvas();
    this.canvasContext = this.canvas.getContext('2d')!;
    this.enemyFactory = new EnemyFactory(this.canvasContext,this.enemies);
    this.placementTileFactory = new PlacementTileFactory(this.canvasContext);
    this.placementTilesManager = new PlacementTilesManager(this.canvasContext)

    this.image = new Image();
    this.image.src = '../../assets/map.png';

    this.enemyFactory.generateWave(6);
    this.placementTileFactory.generatePlacementTilesData(this.placementTilesManager);
    this.subToClick();
  }

  subToClick = () => {
    this.click$.subscribe(x => {
      console.log(this.placementTilesManager.getActiveTile());
    })
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
    this.placementTilesManager.getPlacementTiles().forEach(tile => {
      tile.update();
    })
    this.buildings.forEach(build => {
      build.draw();
    })
  }

  generateEnemy = (pos?: Position) => {
    this.enemies = this.enemyFactory.generateEnemy(pos);
  }
}
