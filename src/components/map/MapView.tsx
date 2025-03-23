'use client';

import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet/dist/leaflet.css';

import { MapContainer, TileLayer } from 'react-leaflet';

import { MapWaypoint } from './MapWaypoint';

type MapViewProps = {
    waypoints: [number, number][];
};

const ZOOM_LEVEL = 13;
const DEFAULT_LAN_LONG = [22.302711, 114.177216];

/**
 * A component that displays a map
 * @param waypoints - The waypoints to display on the map
 * @returns A component that displays a map
 */
const MapView = ({ waypoints }: MapViewProps) => {
    return (
        <MapContainer
            style={{ height: '100%', minHeight: '100%' }}
            center={waypoints?.[0] ?? DEFAULT_LAN_LONG}
            zoom={ZOOM_LEVEL}
            scrollWheelZoom={false}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />

            {waypoints?.map((position, index) => (
                <MapWaypoint
                    key={index}
                    position={position}
                    order={index + 1}
                />
            ))}
        </MapContainer>
    );
};

export default MapView;
