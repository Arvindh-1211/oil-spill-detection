import './index.css';
// import "primereact/resources/themes/lara-light-cyan/theme.css";

import React from 'react';
import reportWebVitals from './reportWebVitals';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import App from './App';
import routes from './routes/routes';
import { store } from './store/store';


const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: routes
	},
]);

const theme = createTheme({
	palette: {
		secondary: {
            main: '#fff',
        },
	},
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<Provider store={store}>
					<RouterProvider router={router} >
						<App />
					</RouterProvider>
			</Provider>
		</ThemeProvider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
