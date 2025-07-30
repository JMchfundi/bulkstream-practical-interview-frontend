// src/api/client.js
import apiClient from "./axios"; // Your pre-configured Axios instance, e.g., pointing to your backend base URL

const clientApi = {
  /**
   * Fetches all clients from the API.
   * @returns {Promise} - The Axios promise for the GET request.
   */
  getAll() {
    return apiClient.get("api/clients/all");
  },

  /**
   * Fetches a single client by ID from the API.
   * @param {number} id - The ID of the client to retrieve.
   * @returns {Promise} - The Axios promise for the GET request.
   */
  getById(id) {
    return apiClient.get(`api/clients/${id}`);
  },

  /**
   * Creates a new client with associated files.
   * Sends data as multipart/form-data.
   * @param {object} clientDto - The ClientDto object containing client details (including locations with 'type').
   * @param {File[]} files - An array of File objects for document uploads (e.g., passport photo, ID document).
   * @returns {Promise} - The Axios promise for the POST request.
   */
  create(clientDto, files = []) {
    const formData = new FormData();

    // Append the clientDto as a JSON Blob. The "request" key must match @RequestPart("request") in Spring.
    formData.append("request", new Blob([JSON.stringify(clientDto)], { type: "application/json" }));

    // Append each file. The "files" key must match @RequestPart(value = "files", ...) in Spring.
    files.forEach((fileInfo) => {
      // Assuming fileInfo is an object like { file: File, documentType: string }
      // If your backend only expects the raw File object, simplify this.
      // For the ClientEntry.vue, filesToUpload is an array of { file: File, documentType: string }
      // So, we'll append the actual File object.
      formData.append(`files`, fileInfo.file);
      // If you need to send documentType per file, you'd need a more complex backend @RequestPart setup
      // or embed it in the JSON DTO if documents are already structured there.
      // For now, matching the existing ClientEntry.vue's filesToUpload structure for clarity.
    });

    return apiClient.post("api/clients/submit", formData, {
      headers: { "Content-Type": "multipart/form-data" }, // Axios sets the boundary automatically
    });
  },

  /**
   * Updates an existing client with associated files.
   * Sends data as multipart/form-data.
   * @param {number} id - The ID of the client to update.
   * @param {object} clientDto - The ClientDto object containing updated client details (including locations with 'type').
   * @param {File[]} files - An array of File objects for new/updated document uploads.
   * @returns {Promise} - The Axios promise for the PUT request.
   */
  update(id, clientDto, files = []) {
    const formData = new FormData();

    // Append the clientDto as a JSON Blob. The "request" key must match @RequestPart("request") in Spring.
    formData.append("request", new Blob([JSON.stringify(clientDto)], { type: "application/json" }));

    // Append each file. The "files" key must match @RequestPart(value = "files", ...) in Spring.
    files.forEach((fileInfo) => {
      formData.append(`files`, fileInfo.file);
    });

    return apiClient.put(`api/clients/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" }, // Axios sets the boundary automatically
    });
  },

  /**
   * Deletes a client by ID.
   * @param {number} id - The ID of the client to delete.
   * @returns {Promise} - The Axios promise for the DELETE request.
   */
  delete(id) {
    return apiClient.delete(`api/clients/${id}`);
  },
};

export default clientApi;