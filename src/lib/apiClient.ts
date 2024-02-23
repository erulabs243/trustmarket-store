import ky from "ky";

const prod = import.meta.env.PROD;
const publicHost = import.meta.env.VITE_PUBLIC_HOST;

// const api = ky.create({
// 	prefixUrl: prod
// 		? `${publicHost}/store/`
// 		: "http://192.168.43.134:9000/store/",
// });
const api = ky.create({
	prefixUrl: `${publicHost}/store/`,
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
