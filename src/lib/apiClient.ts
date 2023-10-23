import ky from "ky";

const api = ky.create({
	prefixUrl: "http://192.168.1.124:9000/store/",
});

api.extend({
	hooks: {
		beforeRequest: [
			(request) => {
				console.log("Request", request);
			}
		],
		beforeError: [
			(error) => {
				const { response } = error;
				if (response && response.body) {
					error.name = "API call error";
					error.message = `${response.status}; ${response.body}`;
				}

				return error;
			},
		],
	},
});

export default api;