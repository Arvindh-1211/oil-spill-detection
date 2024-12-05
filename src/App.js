import './App.css';
import { Outlet } from "react-router-dom";
import Gmap from './components/Gmap';

function App() {
	return (
		<div className="App">
			<Outlet />
			<div className='map-container'>
				<Gmap />
			</div>
		</div>
	);
}

export default App;
