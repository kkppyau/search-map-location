import { LatLngTuple } from 'leaflet';
import { useEffect } from 'react';
import { Marker, Tooltip, useMap } from 'react-leaflet';

type MapWaypointProps = {
    position: LatLngTuple;
    order: number;
};

/**
 * A component that displays a waypoint on the map
 * @param position - The position of the waypoint
 * @param order - The order of the waypoint
 * @returns A component that displays a waypoint on the map
 */
export const MapWaypoint = ({ position, order }: MapWaypointProps) => {
    const map = useMap();

    // Fly to the waypoint when it's the first one
    useEffect(() => {
        if (order > 1) return;
        map.flyTo(position, map.getZoom());
    }, [order, position]);

    return (
        <Marker position={position}>
            {/* Show the order of the waypoint */}
            <Tooltip direction='right' offset={[0, 0]} opacity={1} permanent>
                {order.toString()}
            </Tooltip>
        </Marker>
    );
};
