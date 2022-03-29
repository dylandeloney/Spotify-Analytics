import React, { useState, useEffect } from "react";
import axios from "axios";
import { TracksTable } from "./index";

function Tracks(props) {
	const [data, setData] = useState(null);
	const [quantity, setQuantity] = useState(25);
	const [duration, setDuration] = useState({
		key: 0,
		display: "1 month",
		query: "short_term",
	});

	// fetch data from spotify
	useEffect(() => {
		axios({
			method: "get",
			url: `https://api.spotify.com/v1/me/top/tracks?limit=${quantity}&time_range=${duration.query}`,
			headers: {
				"content-type": "application/application/json",
				Authorization: `Bearer ${props.token}`,
			},
		})
			.then(function (response) {
				const resData = response.data.items;
				let trackList = [];
				for (let i = 0; i < resData.length; i++) {
					const newTrack = {
						rank: i + 1,
						albumCover: resData[i].album.images[0].url,
						track: resData[i].name,
						artists: resData[i].artists[0].name,
						album: resData[i].album.name,
					};
					trackList.push(newTrack);
				}

				setData(trackList);
			})
			.catch(function (error) {});
	}, [props.token, quantity, duration.query]);

	const handleOnChange = (e) => {
		switch (e.target.value) {
			case "0":
				setDuration({
					key: 0,
					display: "1 month",
					query: "short_term",
				});
				break;
			case "1":
				setDuration({
					key: 1,
					display: "6 months",
					query: "medium_term",
				});
				break;
			case "2":
				setDuration({
					key: 2,
					display: "Several years",
					query: "long_term",
				});
				break;
			default:
				console.log("no bueno");
		}
	};

	if (data === null) {
		return <div>Waiting</div>;
	}

	return (
		<div>
			<h1 className="pageHeaders">Your Favorite Tracks!</h1>
			<div className="slideInputs">
				<label>
					Number of tracks:
					<input
						onChange={(e) => setQuantity(e.target.value)}
						type="range"
						min="10"
						max="40"
						step="5"
						defaultValue={quantity}
					/>
					<p>{quantity}</p>
				</label>
				<label>
					Time lapse:
					<input
						onChange={handleOnChange}
						min="0"
						max="2"
						step="1"
						type="range"
						defaultValue={duration.key}
					/>
					<p>{duration.display}</p>
				</label>
			</div>

			<TracksTable data={data} />
		</div>
	);
}

export default Tracks;
