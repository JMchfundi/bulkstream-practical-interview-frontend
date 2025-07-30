import apiClient from "./axios"; // Pre-configured Axios instance

const officerApi = {
  // Fetch all officers
  getAll() {
    return apiClient.get("api/officers");
  },

  // Fetch a single officer by ID
  getById(id) {
    return apiClient.get(`api/officers/${id}`);
  },

  // Create a new officer with multiple file uploads
  create(officerData, files = []) {
    const formData = new FormData();
    // *** FIX: Changed "request" to "officer" to match Spring Boot Controller's @RequestPart("officer") ***
    formData.append("officer", JSON.stringify(officerData));

    // Append each file under the key "files" which matches @RequestPart(value = "files")
    files.forEach(file => {
      formData.append("files", file);
    });

    return apiClient.post("api/officers", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
  },

  // Update an existing officer, now handling file uploads
  update(id, officerData, files = []) { // Added files parameter
    const formData = new FormData();
    // *** FIX: Changed "request" to "officer" to match Spring Boot Controller's @RequestPart("officer") ***
    formData.append("officer", JSON.stringify(officerData));

    // Append each file under the key "files" which matches @RequestPart(value = "files")
    files.forEach(file => {
      formData.append("files", file);
    });

    return apiClient.put(`api/officers/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
  },

  // Delete an officer by ID
  delete(id) {
    return apiClient.delete(`api/officers/${id}`);
  },

  // Send credentials to the officer (assumes this endpoint exists)
  sendCredentials(id) {
    return apiClient.post(`api/officers/send-credentials/${id}`);
  }
};

export default officerApi;