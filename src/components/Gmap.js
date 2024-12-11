import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { APIProvider, Map, AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
import { FaMapMarkerAlt } from "react-icons/fa";

const Marker = () => <div style={{ fontSize: "1.2rem", color: "red" }}><FaMapMarkerAlt /></div>;

export default function Gmap({ selectedMap }) {
    const { lat, lng } = useSelector((state) => state.location);
    const [center, setCenter] = useState({ lat, lng });

    useEffect(() => {
        setCenter({ lat, lng });
    }, [lat, lng]);

    return (
        <div style={{ height: "100vh", width: "100vw" }}>
            {selectedMap ? (
                <iframe
                    src={selectedMap}
                    title="Oil Spill Map"
                    width="100%"
                    height="100%"
                />
            ) : (
                <APIProvider apiKey="">
                    <Map
                        defaultZoom={5}
                        center={center}
                        onCameraChanged={(ev) => setCenter(ev.detail.center)}
                        mapId="da37f3254c6a6d1c"
                    >
                        <AdvancedMarker position={{ lat, lng }}>
                            <Pin background={"#f00"} glyphColor={"#000"} borderColor={"#000"} />
                        </AdvancedMarker>
                    </Map>
                </APIProvider>
            )}
        </div>
    );
}
