import {Injectable, OnInit} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService implements OnInit{
  static waypoints = [
    {
      "x":-103.69696969697,
      "y":547.151515151515
    },
    {
      "x":353.878787878788,
      "y":541.090909090909
    },
    {
      "x":350.848484848485,
      "y":98.6666666666667
    },
    {
      "x":799.333333333333,
      "y":101.69696969697
    },
    {
      "x":799.333333333333,
      "y":410.787878787879
    },
    {
      "x":617.515151515152,
      "y":407.757575757576
    },
    {
      "x":614.484848484848,
      "y":671.393939393939
    },
    {
      "x":1059.93939393939,
      "y":662.30303030303
    },
    {
      "x":1059.93939393939,
      "y":292.606060606061
    },
    {
      "x":1356.90909090909,
      "y":292.606060606061
    }]
  private towerPlacementTilesOneD =
    [0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0, 14, 0, 14, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    14, 0, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0,
    0, 14, 0, 14, 0, 14, 0, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 14, 0, 14, 0, 14, 0, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0]

  constructor() {}

  ngOnInit(){
  }

  getTowerPlacementTiles = () => {
    return this.generate2dMap(this.towerPlacementTilesOneD,20);
  }

  generate2dMap = (one_dim_arr: any[], mapDimension: number) => {
    let two_dim_arr = [];
    for(let i = 0; i < one_dim_arr.length; i += mapDimension){
      two_dim_arr.push(one_dim_arr.slice(i,i+mapDimension))
    }
    return two_dim_arr;
  }



}
