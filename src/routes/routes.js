import { Navigate } from "react-router-dom";
import AISDataPage from "../pages/AISDataPage";
import LandingPage from "../pages/LandingPage";
import SatelliteDataPage from "../pages/SatelliteDataPage";

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