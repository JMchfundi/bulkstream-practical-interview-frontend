// ============================
// API Client: stationApi.js
// ============================
import apiClient from "./axios"; // Import the Axios instance

const stationApi = {
  // Fetch all stations
  getAll() {
    return apiClient.get("api/stations");
  },

  // Fetch a single station by ID
  getById(id) {
    return apiClient.get(`api/stations/${id}`);
  },

  // Create a new station (with optional file)
  create(stationData, file = null) {
    const formData = new FormData();
    formData.append("station", new Blob([JSON.stringify(stationData)], { type: "application/json" }));

    if (file) {
      formData.append("document", file);
    }

    return apiClient.post("api/stations", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  // Update an existing station (with optional file)
  update(id, stationData, file = null) {
    const formData = new FormData();
    formData.append("station", new Blob([JSON.stringify(stationData)], { type: "application/json" }));

    if (file) {
      formData.append("document", file);
    }

    return apiClient.put(`api/stations/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  // Delete a station by ID
  delete(id) {
    return apiClient.delete(`api/stations/${id}`);
  },
};

export default stationApi;