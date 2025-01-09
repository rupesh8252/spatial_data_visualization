export interface Point {
    type: 'Point';
    coordinates: [number, number];
    properties: {
      name: string;
      description: string;
    };
  }
  
  export interface Polygon {
    type: 'Polygon';
    coordinates: number[][][];
    properties: {
      name: string;
      area: number;
    };
  }
  
  export interface MultiPolygon {
    type: 'MultiPolygon';
    coordinates: number[][][][];
    properties: {
      name: string;
      region: string;
    };
  }
  
  export type Feature = {
    type: 'Feature';
    geometry: Point | Polygon | MultiPolygon;
    properties: any;
  };
  
  export interface FeatureCollection {
    type: 'FeatureCollection';
    features: Feature[];
  }

  export interface Point {
    type: 'Point';
    coordinates: [number, number];
    properties: {
      name: string;
      description: string;
    };
  }
  
  export interface Polygon {
    type: 'Polygon';
    coordinates: number[][][];
    properties: {
      name: string;
      area: number;
    };
  }
  
  export interface MultiPolygon {
    type: 'MultiPolygon';
    coordinates: number[][][][];
    properties: {
      name: string;
      region: string;
    };
  }
  

  
  export interface FeatureCollection {
    type: 'FeatureCollection';
    features: Feature[];
  }
  