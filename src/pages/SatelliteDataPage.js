import React, { useEffect, useState } from "react";
import Papa from "papaparse"
import { useDispatch } from 'react-redux';
import { setLocation } from '../store/locationSlice';
import { IoCloseCircleOutline } from "react-icons/io5";

function SatelliteDataPage() {
    const dispatch = useDispatch();

    const [AISdata, setAISData] = useState([]);
    const [spillData, setSpillData] = useState(null);

    useEffect(() => {
        // Fetch the CSV file from the public folder
        fetch("/satellite.csv")  // Path to the CSV file in the public folder
            .then((response) => response.text())  // Read response as text
            .then((csvText) => {
                // Parse the CSV text
                Papa.parse(csvText, {
                    header: true,  // Set to true if the first row contains headers
                    complete: (result) => {
                        setAISData(result.data);  // Set parsed AISdata to state
                    },
                    error: (error) => {
                        console.error("Error parsing CSV:", error);
                    }
                });
            })
            .catch((error) => {
                console.error("Error fetching CSV:", error);
            });
    }, []);

    return (
        <div className='data-container'>
            {!spillData &&
                AISdata.map((item, index) => (
                    <div
                        className="AISdata-container"
                        key={index}
                        onClick={() => {
                            dispatch(setLocation({ lat: Number(item.LAT), lng: Number(item.LON) }))
                            setSpillData(item)
                        }}
                    >
                        <div className="AISdata-date">
                            {/* {item.BaseDateTime} */}
                            <div className="time">
                                {new Date(item.BaseDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                            </div>
                            <div className="date">
                                {new Date(item.BaseDateTime).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                            </div>
                        </div>
                        <div className="AISdata-info">
                            <div className="vessel-name">{item.VesselName}</div>
                            <div className="vessel-location">
                                <span>Lat: {item.LAT}</span>
                                <span>Lon: {item.LON}</span>
                            </div>
                        </div>
                    </div>
                ))
            }
            {spillData &&
                <div className="spill-data">
                    <div className="header">
                        <h2>{spillData.VesselName}</h2>
                        <span onClick={() => { setSpillData(null) }}><IoCloseCircleOutline /></span>
                    </div>
                    <div className="info">
                        {
                            Object.entries(spillData).map(([key, value]) => (
                                key === 'ImagePath' ?
                                    <img key={key} src={value} width='100%' height='auto' alt="Image not available" />
                                    : key === 'BaseDateTime' ?
                                        <div className="datetime" key={key}>
                                            <div>
                                                <span className="label">Time</span><span className="value">{new Date(value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit',second: '2-digit' , hour12: false })}</span>
                                            </div>
                                            <div>
                                                <span className="label">Date</span><span className="value">{new Date(value).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                            </div>
                                        </div>
                                        :
                                        <div key={key}>
                                            <span className="label">{key}</span><span className="value">{value}</span>
                                        </div>
                            ))
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default SatelliteDataPage