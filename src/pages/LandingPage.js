import React, { useState } from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { NavLink, Outlet, useNavigate } from "react-router-dom";

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
            default:
                navigate('/')
        }
    };

    return (
        <div>
            {/* <div className='navbar'>
                <NavLink to='/AISdata'><div>AIS Data</div></NavLink>
                <NavLink to='/satellite_data'><div>Satellite</div></NavLink>
            </div> */}
            <Tabs sx={{ width: '30vw' }} value={value} onChange={handleChange} >
                <Tab sx={{ width: '50%' }} label="AIS Data" />
                <Tab sx={{ width: '50%' }} label="Satellite" />
            </Tabs>
            <Outlet />
        </div>
    )
}

export default LandingPage