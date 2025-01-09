import React, { useEffect, useState } from 'react';
import MapContainer from './components/mapContainer';
import FeatureCard from './components/featureCard';
import { fetchSpatialData } from './api/spatialApi';
import { Feature, FeatureCollection } from './types/spatialTypes';

const App: React.FC = () => {
  const [spatialData, setSpatialData] = useState<{
    points: FeatureCollection;
    polygons: FeatureCollection;
    multiPolygons: FeatureCollection;
  } | null>(null);
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchSpatialData();
        setSpatialData(data);
      } catch (err) {
        setError('Failed to load spatial data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (error || !spatialData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">{error || 'Something went wrong'}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Spatial Data Visualization</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MapContainer
            pointData={spatialData.points}
            polygonData={spatialData.polygons}
            multiPolygonData={spatialData.multiPolygons}
            onFeatureClick={setSelectedFeature}
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Selected Feature</h2>
          <FeatureCard feature={selectedFeature} />
        </div>
      </div>
    </div>
  );
};

export default App;