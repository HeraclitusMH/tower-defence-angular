import {PlacementTile} from "../model/placement-tile";

export class PlacementTilesManager {
  c!: CanvasRenderingContext2D;
  activeTile: PlacementTile | null = null;
  private placementTiles: PlacementTile[] = [];

  constructor(canvasContext:CanvasRenderingContext2D) {
    this.c = canvasContext;
  }

  getPlacementTiles = () => {
    return this.placementTiles;
  }

  getActiveTile = () => {
    return this.activeTile;
  }
}
