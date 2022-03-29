const express = require("express");
const config = require("config");
const { default: axios } = require("axios");

const router = express.Router();

function generateRandomString(length) {
	let result = "";
	const characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	const charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

router.get("/login", function (req, res) {
	const state = generateRandomString(16);
	const scope = "user-top-read";

	res.redirect(
		"https://accounts.spotify.com/authorize?" +
			new URLSearchParams({
				response_type: "code",
				client_id: config.get("CLIENT_ID"),
				scope: scope,
				redirect_uri: config.get("redirect_uri"),
				state: state,
			})
	);
});

router.get("/callback", function (req, res) {
	var code = req.query.code || null;
	var state = req.query.state || null;

	axios({
		method: "post",
		url: "https://accounts.spotify.com/api/token",
		data: new URLSearchParams({
			code: code,
			redirect_uri: config.get("redirect_uri"),
			grant_type: "authorization_code",
		}),
		headers: {
			"content-type": "application/x-www-form-urlencoded",
			Authorization:
				"Basic " +
				Buffer.from(
					config.get("CLIENT_ID") + ":" + config.get("CLIENT_SECRET")
				).toString("base64"),
		},
	})
		.then((response) => {
			if (response.status == 200) {
				const { access_token, refresh_token, expires_in } = response.data;

				const queryParams = new URLSearchParams({
					access_token,
					refresh_token,
					expires_in,
				});

				res.redirect(
					`https://spotifyanalytics.netlify.app/tracks/?${queryParams}`
				);
			} else {
				res.redirect(error);
			}
		})
		.catch((error) => {
			res.send(
				`/?${new URLSearchParams({
					access_token,
					refresh_token,
				})}`
			);
		});
});

router.get("/refresh_token", function (req, res) {
	var refresh_token = req.query.refresh_token;
	const scope = "user-top-read";

	axios({
		method: "post",
		url: "https://accounts.spotify.com/api/token",
		data: new URLSearchParams({
			grant_type: "refresh_token",
			scope: scope,
			refresh_token: refresh_token,
		}),
		headers: {
			"content-type": "application/x-www-form-urlencoded",
			Authorization:
				"Basic " +
				Buffer.from(
					config.get("CLIENT_ID") + ":" + config.get("CLIENT_SECRET")
				).toString("base64"),
		},
	})
		.then((response) => {
			res.send(response.data);
			console.log("response");
		})
		.catch((error) => {
			res.send(error);
			console.log("error 1");
		});
});

module.exports = router;
