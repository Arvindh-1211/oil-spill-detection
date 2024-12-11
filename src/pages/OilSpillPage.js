import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import { useDispatch } from "react-redux";
import { setLocation } from "../store/locationSlice";
import { IoCloseCircleOutline } from "react-icons/io5";
import Grow from "@mui/material/Grow";

function OilSpillPage() {
    const dispatch = useDispatch();
    const [AISdata, setAISData] = useState([]);
    const [spillData, setSpillData] = useState(null);
    const [selectedMap, setSelectedMap] = useState(null); // State to store the map path

    useEffect(() => {
        fetch("http://localhost:8000/ais_data")
            .then((response) => response.text())
            .then((csvText) => {
                Papa.parse(csvText, {
                    header: true,
                    complete: (result) => setAISData(result.data),
                    error: (error) => console.error("Error parsing CSV:", error),
                });
            })
            .catch((error) => console.error("Error fetching CSV:", error));
    }, []);

    return (
        <div className="data-container">
            {!spillData && 
                AISdata.map((item, index) => (
                    item.LAT_x && item.LON_x ? (
                        <Grow in={true} timeout={500} style={{ transitionDelay: `${index * 50}ms` }}>
                            <div
                                className="AISdata-container"
                                key={index}
                                onClick={() => {
                                    dispatch(setLocation({ lat: Number(item.LAT_x), lng: Number(item.LON_x) }));
                                    setSpillData(item);
                                    setSelectedMap(null); // Default to the main map
                                }}
                            >
                                <div className="AISdata-date">
                                    <div className="time">
                                        {new Date(item.BaseDateTime).toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            hour12: false,
                                        })}
                                    </div>
                                    <div className="date">
                                        {new Date(item.BaseDateTime).toLocaleDateString([], {
                                            month: "short",
                                            day: "numeric",
                                        })}
                                    </div>
                                </div>
                                <div className="AISdata-info">
                                    <div className="vessel-name">{item.VesselName_x}</div>
                                    <div className="vessel-location">
                                        <span className="value">Lat: {item.LAT_x}</span>
                                        <span className="value">Lon: {item.LON_x}</span>
                                    </div>
                                </div>
                            </div>
                        </Grow>
                    ) : null
                ))
            }
            {spillData && (
                <div className="spill-data">
                    <div className="header">
                        <p>{spillData.VesselName_x}</p>
                        <span onClick={() => setSpillData(null)}>
                            <IoCloseCircleOutline />
                        </span>
                    </div>
                    <div className="info">
                        <img
                            src={`http://localhost:8000/image?path=${spillData.extracted_path}`}
                            width="100%"
                            height="auto"
                            alt="Image not available"
                        />
                        {Object.entries(spillData).map(([key, value], index) =>
                            ["extracted_path", "path"].includes(key) || !value ? null : key === "BaseDateTime" ? (
                                <div key={index}>
                                    <span className="label">
                                        <p>Time</p>
                                    </span>
                                    <span className="value">
                                        <p>
                                            {new Date(value).toLocaleTimeString([], {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                                second: "2-digit",
                                                hour12: false,
                                            })}{" "}
                                            -{" "}
                                            {new Date(value).toLocaleDateString([], {
                                                month: "short",
                                                day: "numeric",
                                                year: "numeric",
                                            })}
                                        </p>
                                    </span>
                                </div>
                            ) : (
                                <div key={key}>
                                    <span className="label">
                                        <p>{key}</p>
                                    </span>
                                    <span className="value">
                                        <p>{value}</p>
                                    </span>
                                </div>
                            )
                        )}
                    </div>
                    <div className="map-switcher">
                        <button
                            onClick={() =>
                                setSelectedMap(
                                    "C:\\SIH_Project\\SIH_FINAL_AIS_SATE\\Final_satellite_intergration - Copy\\extracted_SAR_data88ff\\S1B_IW_GRDH_1SDV_20211003T014927_20211003T014952_028965_0374DA_3EE4.SAFE\\map_spill_ship_249889000.html"
                                )
                            }
                        >
                            View Spill Map
                        </button>
                        <button onClick={() => setSelectedMap(null)}>View Default Map</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default OilSpillPage;
