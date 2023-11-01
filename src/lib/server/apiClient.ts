import ky from "ky";
import { STORE_HOST } from "$env/static/private";

const api = ky.create({
	prefixUrl: `${STORE_HOST}/store/` ?? "http://192.168.1.124:9000/store/",
});

api.extend({
	hooks: {
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
