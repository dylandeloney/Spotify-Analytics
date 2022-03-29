import React from "react";
import { NavLink } from "react-router-dom";
import { logout } from "../spotify";

function NavBar(props) {
	const navTextStyles = { color: "#c4c4c4", textDecoration: "none" };
	const activeNavText = { color: "#5289bf", textDecoration: "none" };

	return (
		<div className="">
			<div className="w-full mb-2 bg-green-500"></div>
			<nav className="flex">
				<NavLink
					to="/tracks"
					className="navBtns"
					style={({ isActive }) => (isActive ? activeNavText : navTextStyles)}>
					Tracks
				</NavLink>
				<NavLink
					to="/artists"
					className="navBtns"
					style={({ isActive }) => (isActive ? activeNavText : navTextStyles)}>
					Artists
				</NavLink>
				{!props.token ? (
					<a className="navBtns" href="http://localhost:5000/login">
						Log in to Spotify
					</a>
				) : (
					<button onClick={logout} className="navBtns">
						Log Out
					</button>
				)}{" "}
			</nav>
		</div>
	);
}

export default NavBar;
