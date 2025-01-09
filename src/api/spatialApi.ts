import { FeatureCollection } from "../types/spatialTypes";

const MOCK_API_DELAY = 1000;

export const fetchSpatialData = async (): Promise<{
  points: FeatureCollection;
  polygons: FeatureCollection;
  multiPolygons: FeatureCollection;
}> => {
  await new Promise(resolve => setTimeout(resolve, MOCK_API_DELAY));
  
  return {
    points: {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [-74.006, 40.7128],
            properties: {
              name: 'New York City',
              description: 'The Big Apple'
            }
          },
          properties: {
            name: 'New York City',
            description: 'The Big Apple'
          }
        },
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [-0.1276, 51.5074],
            properties: {
              name: 'London',
              description: 'Capital of England'
            }
          },
          properties: {
            name: 'London',
            description: 'Capital of England'
          }
        }
      ]
    },
    polygons: {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [[
              [-74.0060, 40.7128],
              [-74.0160, 40.7228],
              [-73.9960, 40.7228],
              [-74.0060, 40.7128]
            ]],
            properties: {
              name: 'Manhattan Area',
              area: 87.5
            }
          },
          properties: {
            name: 'Manhattan Area',
            area: 87.5
          }
        }
      ]
    },
    multiPolygons: {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'MultiPolygon',
            coordinates: [
              [[
                [-73.9960, 40.7128],
                [-74.0060, 40.7228],
                [-73.9860, 40.7228],
                [-73.9960, 40.7128]
              ]]
            ],
            properties: {
              name: 'NYC Districts',
              region: 'Northeast'
            }
          },
          properties: {
            name: 'NYC Districts',
            region: 'Northeast'
          }
        }
      ]
    }
  };
};
