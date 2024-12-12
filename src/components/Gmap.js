import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import {
    APIProvider,
    Map,
    AdvancedMarker,
    Pin
} from '@vis.gl/react-google-maps';
import { FaMapMarkerAlt } from "react-icons/fa";

const Marker = () => <div style={{ fontSize: '1.2rem', color: 'red' }}><FaMapMarkerAlt /></div>;

export default function Gmap() {
    const { lat, lng, nearbyShips } = useSelector((state) => state.location);
    const [center, setCenter] = useState({ lat: lat, lng: lng });

    useEffect(() => {
        setCenter({ lat: lat, lng: lng });
    }, [lat, lng]);

    return (
        <div style={{ height: '100vh', width: '100vw' }}>
            <APIProvider apiKey=''>
                <Map
                    defaultZoom={5}
                    center={center}
                    onCameraChanged={(ev) => setCenter(ev.detail.center)}
                    mapId='da37f3254c6a6d1c'
                >
                    <AdvancedMarker position={{ lat: lat, lng: lng }}>
                        <Pin background={'#f00'} glyphColor={'#000'} borderColor={'#000'} />
                    </AdvancedMarker>

                    {nearbyShips &&
                        nearbyShips.map((ship, index) => (
                            <AdvancedMarker
                                key={index}
                                position={{ lat: parseFloat(ship.lat), lng: parseFloat(ship.lon) }}
                            >
                                <Pin background={'#00f'} glyphColor={'#000'} borderColor={'#000'} />
                            </AdvancedMarker>
                        ))}
                </Map>
            </APIProvider>
        </div>
    );
}
