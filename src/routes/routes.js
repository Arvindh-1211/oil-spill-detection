import { Navigate } from "react-router-dom";
import AISDataPage from "../pages/AISDataPage";
import LandingPage from "../pages/LandingPage";
import SatelliteDataPage from "../pages/SatelliteDataPage";
import OilSpillPage from "../pages/OilSpillPage";

const routes = [
    {
        path: '/',
        element: <LandingPage />,
        children: [
            {
                path: '/',
                element: <Navigate to='/AISdata' />
            },
            {
                path: '/oil_spill',
                element: <OilSpillPage />
            },
            {
                path: '/AISdata',
                element: <AISDataPage />
            },
            {
                path: '/satellite_data',
                element: <SatelliteDataPage />
            },
        ]
    },
]

export default routes;