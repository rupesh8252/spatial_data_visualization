import React from 'react';
import { Feature } from '../../types/spatialTypes';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';

interface FeatureCardProps {
    feature: Feature | null;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature }) => {
    if (!feature) return null;

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle>{feature.properties.name}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    <p className="text-sm text-gray-600">Type: {feature.geometry.type}</p>
                    {feature.properties.description && (
                        <p className="text-sm">{feature.properties.description}</p>
                    )}
                    {feature.properties.area && (
                        <p className="text-sm">Area: {feature.properties.area} sq km</p>
                    )}
                    {feature.properties.region && (
                        <p className="text-sm">Region: {feature.properties.region}</p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default FeatureCard;