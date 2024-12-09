import React, { useEffect, useState } from "react";
import Papa from "papaparse"
import { useDispatch } from 'react-redux';
import { setLocation } from '../store/locationSlice';
import { IoCloseCircleOutline } from "react-icons/io5";
import Grow from '@mui/material/Grow';


function OilSpillPage() {
    const dispatch = useDispatch();

    const [AISdata, setAISData] = useState([]);
    const [spillData, setSpillData] = useState(null);

    useEffect(() => {
        // Fetch the CSV file from the public folder
        fetch("http://localhost:8000/ais_data")  // Path to the CSV file in the public folder
            .then((response) => response.text())  // Read response as text
            .then((csvText) => {
                // Parse the CSV text
                Papa.parse(csvText, {
                    header: true,  // Set to true if the first row contains headers
                    complete: (result) => {
                        setAISData(result.data);
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
                    item.LAT_x && item.LON_x ?
                        <Grow in={true} timeout={500} style={{ transitionDelay: `${index * 50}ms` }}>
                            <div
                                className="AISdata-container"
                                key={index}
                                onClick={() => {
                                    dispatch(setLocation({ lat: Number(item.LAT_x), lng: Number(item.LON_x) }))
                                    setSpillData(item)
                                }}
                            >
                                <div className="AISdata-date">
                                    <div className="time">
                                        {new Date(item.BaseDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                                    </div>
                                    <div className="date">
                                        {new Date(item.BaseDateTime).toLocaleDateString([], { month: 'short', day: 'numeric' })}
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
                        :
                        <></>
                ))
            }
            {
                spillData &&
                <div className="spill-data">
                    <div className="header">
                        <p>{spillData.VesselName_x}</p>
                        <span onClick={() => { setSpillData(null) }}><IoCloseCircleOutline /></span>
                    </div>
                    <div className="info">
                        <img src={`http://localhost:8000/image?path=${spillData.extracted_path.replace('G:', 'D:\\VSCode')}`} width='100%' height='auto' alt="Image not available" />
                        {
                            Object.entries(spillData).map(([key, value], index) => (
                                ['extracted_path', 'path'].includes(key) || !value ?
                                    <></>
                                    :
                                    key === 'BaseDateTime' ?
                                        <div>
                                            <span className="label"><p>Time</p></span><span className="value">
                                                <p>
                                                    {new Date(value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}
                                                    {' - '}
                                                    {new Date(value).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </p>
                                            </span>
                                        </div>
                                        :
                                        <div key={key}>
                                            <span className="label"><p>{key}</p></span><span className="value"><p>{value}</p></span>
                                        </div>
                            ))
                        }
                    </div>
                </div>
            }
        </div >
    )
}

export default OilSpillPage
