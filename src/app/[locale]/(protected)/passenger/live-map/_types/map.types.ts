export interface ICoordinate {
  lat: number;
  lng: number;
}

export interface IRoutePath {
  routeId: number;
  path: ICoordinate[];
}
