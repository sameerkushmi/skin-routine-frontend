import axios from "axios";

// Create axios instance
const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
    withCredentials: true, // IMPORTANT for cookies
});

api.interceptors.response.use(
    (res) => res,
    async (error) => {

        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url.includes("/auth/refresh")
        ) {

            originalRequest._retry = true;

            try {

                const { data } = await api.post("/auth/refresh");
                console.log("token refreshed : ", data.message)

                return api(originalRequest);

            } catch (err) {
                console.log('refresh error : ', err)
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);

export default api;