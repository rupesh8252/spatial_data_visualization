import React, { useEffect, useRef } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import OSM from 'ol/source/OSM';
import GeoJSON from 'ol/format/GeoJSON';
import { fromLonLat } from 'ol/proj';
import Style from 'ol/style/Style';
import Circle from 'ol/style/Circle';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import { Feature, FeatureCollection } from '../../types/spatialTypes';

interface MapContainerProps {
    pointData: FeatureCollection;
    polygonData: FeatureCollection;
    multiPolygonData: FeatureCollection;
    onFeatureClick: (feature: Feature) => void;
}

const MapContainer: React.FC<MapContainerProps> = ({
    pointData,
    polygonData,
    multiPolygonData,
    onFeatureClick,
}) => {
    const mapElement = useRef<HTMLDivElement>(null);
    const mapRef = useRef<Map | null>(null);

    useEffect(() => {
        if (!mapElement.current) return;

        // Create vector sources
        const pointSource = new VectorSource({
            features: new GeoJSON().readFeatures(pointData, {
                featureProjection: 'EPSG:3857'
            })
        });

        const polygonSource = new VectorSource({
            features: new GeoJSON().readFeatures(polygonData, {
                featureProjection: 'EPSG:3857'
            })
        });

        const multiPolygonSource = new VectorSource({
            features: new GeoJSON().readFeatures(multiPolygonData, {
                featureProjection: 'EPSG:3857'
            })
        });

        // Create vector layers
        const pointLayer = new VectorLayer({
            source: pointSource,
            style: new Style({
                image: new Circle({
                    radius: 8,
                    fill: new Fill({ color: '#007cbf' }),
                    stroke: new Stroke({ color: '#ffffff', width: 2 })
                })
            })
        });

        const polygonLayer = new VectorLayer({
            source: polygonSource,
            style: new Style({
                fill: new Fill({ color: 'rgba(0, 128, 255, 0.5)' }),
                stroke: new Stroke({ color: '#0080ff', width: 2 })
            })
        });

        const multiPolygonLayer = new VectorLayer({
            source: multiPolygonSource,
            style: new Style({
                fill: new Fill({ color: 'rgba(255, 128, 0, 0.5)' }),
                stroke: new Stroke({ color: '#ff8000', width: 2 })
            })
        });

        // Create map
        mapRef.current = new Map({
            target: mapElement.current,
            layers: [
                new TileLayer({
                    source: new OSM()
                }),
                polygonLayer,
                multiPolygonLayer,
                pointLayer
            ],
            view: new View({
                center: fromLonLat([-74.006, 40.7128]),
                zoom: 12
            })
        });

        // Add click handler
        mapRef.current.on('click', (event) => {
            const feature = mapRef.current?.forEachFeatureAtPixel(
                event.pixel,
                (feature) => feature
            );

            if (feature) {
                const geoJSONFeature = new GeoJSON().writeFeatureObject(feature);
                onFeatureClick(geoJSONFeature as Feature);
            }
        });

        return () => {
            if (mapRef.current) {
                mapRef.current.setTarget(undefined);
            }
        };
    }, [pointData, polygonData, multiPolygonData, onFeatureClick]);

    return (
        <div ref={mapElement} className="w-full h-[600px] rounded-lg shadow-lg" />
    );
};

export default MapContainer;