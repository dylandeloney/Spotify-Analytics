import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NavBar, Tracks, Artists } from "./components";
import { accessToken } from "./spotify";

function App() {
	const [token, setToken] = useState(null);

	useEffect(() => {
		setToken(accessToken);
	}, []);

	return (
		<div className="App">
			<BrowserRouter>
				<NavBar token={token} />
				<div className="myContainer">
					{
						<Routes>
							<Route element={<Tracks token={token} />} path="/tracks" />
							<Route element={<Artists token={token} />} path="/artists" />
						</Routes>
					}
				</div>
			</BrowserRouter>
		</div>
	);
}

export default App;
