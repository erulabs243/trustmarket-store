import ky from "ky";

const prod = import.meta.env.PROD;
// const storeHost = import.meta.env.VITE_STORE_HOST;
// const storeHost = "https://admin.trustmarket.store";
const storeHost = "http://192.168.43.134:9000";

// const api = ky.create({
// 	prefixUrl: prod ? `${storeHost}/store/` : "http://192.168.43.134:9000/store/",
// });
const api = ky.create({
	prefixUrl: `${storeHost}/store/`,
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
