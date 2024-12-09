import React, { useState } from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Outlet, useNavigate } from "react-router-dom";

function LandingPage() {
    const navigate = useNavigate()
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        switch (newValue) {
            case 0:
                navigate('/AISData')
                break;
            case 1:
                navigate('/satellite_data')
                break;
            case 2:
                navigate('/oil_spill')
                break;
            default:
                navigate('/')
        }
    };

    return (
        <div className="outlet">
            <div className="navbar">
                <Tabs sx={{ width: '30vw' }} value={value} indicatorColor="secondary" textColor="secondary" onChange={handleChange} >
                    <Tab sx={{ width: '33%', color: 'black' }} label="AIS Data" />
                    <Tab sx={{ width: '33%', color: 'black' }} label="Satellite" />
                    <Tab sx={{ width: '33%', color: 'black' }} label="Oil Spill" />
                </Tabs>
            </div>
            <Outlet />
        </div>
    )
}

export default LandingPage