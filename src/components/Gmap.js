import React from "react";
import { useSelector } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import { FaMapMarkerAlt } from "react-icons/fa";

const Marker = () => <div style={{ fontSize: '1.2rem', color: 'red' }}><FaMapMarkerAlt /></div>;

export default function Gmap() {
    const {lat, lng} = useSelector((state) => state.location)

    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "" }}
                center={{ lat: lat, lng: lng }}
                defaultZoom={5}
            >
                <Marker
                    lat={lat}
                    lng={lng}
                />
            </GoogleMapReact>
        </div>
    );
}