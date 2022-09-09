import {Building} from "../model/building";

export class BuildingManager {
  private buildings: Building[] = [];

  getBuilding = () => {
    return this.buildings;
  }
}
