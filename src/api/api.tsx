import axios from "axios";


const getAuthHeaders = () => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    return user && user.token ? { Authorization: `Bearer ${user.token}` } : {};
};

export const apiService = {
    get: async (url: string) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/${url}`, {
                headers: getAuthHeaders(),
            });
            return response.data;
        } catch (error) {
            console.error("Error in GET request:", error);
            throw error;
        }
    },

    create: async <T extends object>(url: string, data?: T) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/${url}`, data, {
                headers: getAuthHeaders()
            });
            return response.data;
        } catch (error) {
            console.error("Error in POST request:", error);
            throw error;
        }
    },

    update: async <T extends object>(url: string, data: T) => {  // ✅ Use generic instead of `any`
        try {
            const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/${url}`, data, {
                headers: getAuthHeaders(),
            });
            return response.data;
        } catch (error) {
            console.error("Error in PUT request:", error);
            throw error;
        }
    },

    delete: async (url: string) => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/${url}`, {
                headers: getAuthHeaders(),
            });
            return response.data;
        } catch (error) {
            console.error("Error in DELETE request:", error);
            throw error;
        }
    },
};
