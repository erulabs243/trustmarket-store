import ky from "ky";
import { PUBLIC_HOST, PUBLIC_PORT } from "$env/static/public";

const api = ky.create({
	prefixUrl:
		`${PUBLIC_HOST}:${PUBLIC_PORT}/store/` ??
		"http://192.168.1.124:9000/store/",
});

api.extend({
	hooks: {
		beforeRequest: [
			(request) => {
				console.log("Request", request);
			},
		],
		beforeError: [
			(error) => {
				const { response } = error;
				if (response?.body) {
					error.name = "API call error";
					error.message = `${response.status}; ${response.body}`;
				}

				return error;
			},
		],
	},
});

export default api;
