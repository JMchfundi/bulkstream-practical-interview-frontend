import apiClient from "./axios"; // Pre-configured Axios instance

const officerApi = {
  // Fetch all officers
  getAll() {
    return apiClient.get("api/officer");
  },

  // Fetch a single officer by ID
  getById(id) {
    return apiClient.get(`api/officer/${id}`);
  },

  // Create a new officer with files
  create(officerData, idDocument, passportPhoto) {
    const formData = new FormData();
    formData.append(
      "data",
      new File([JSON.stringify(officerData)], "data.json", { type: "application/json" })
    );
    formData.append("idDocument", idDocument);
    formData.append("passportPhoto", passportPhoto);

    return apiClient.post("api/officer", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  // Update an existing officer with optional file uploads
  update(id, officerData, idDocument = null, passportPhoto = null) {
    const formData = new FormData();
    formData.append(
      "data",
      new File([JSON.stringify(officerData)], "data.json", { type: "application/json" })
    );
    if (idDocument) formData.append("idDocument", idDocument);
    if (passportPhoto) formData.append("passportPhoto", passportPhoto);

    return apiClient.put(`api/officer/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  // Delete an officer by ID
  delete(id) {
    return apiClient.delete(`api/officer/${id}`);
  },

  // ✅ Send credentials to the officer by ID
  sendCredentials(id) {
    return apiClient.post(`api/officer/send-credentials/${id}`);
  }
};

export default officerApi;
