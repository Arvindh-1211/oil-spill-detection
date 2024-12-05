import './index.css';
import "primereact/resources/themes/lara-light-cyan/theme.css";

import React from 'react';
import reportWebVitals from './reportWebVitals';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";

import App from './App';
import routes from './routes/routes';
import { store, persistor } from './store/store';


const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: routes
	},
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
			<Provider store={store}>
				<PersistGate persistor={persistor}>
					<RouterProvider router={router} >
						<App />
					</RouterProvider>
				</PersistGate>
			</Provider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
