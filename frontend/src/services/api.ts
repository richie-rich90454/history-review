import ky from "ky";

const api = ky.create({
	prefixUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api",
	hooks: {
		beforeRequest: [
			(state) => {
				const token = localStorage.getItem("token");
				if (token) {
					state.request.headers.set("Authorization", `Bearer ${token}`);
				}
			},
		],
		afterResponse: [
			async (state) => {
				if (state.response.status === 401) {
					localStorage.removeItem("token");
					window.location.href = "/login";
				}
				return state.response;
			},
		],
	},
});

export default api;
