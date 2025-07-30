// srcapi/group.js
import apiClient from "./axios"; // Import the Axios instance

const groupApi = {
  // Fetch all groups
  getAll() {
    return apiClient.get("api/groups"); // Get all groups from API
  },

  // Fetch a single group by ID
  getById(id) {
    return apiClient.get(`api/groups/${id}`); // Get group by ID
  },

  // Create a new group
  create(data) {
    return apiClient.post("api/groups", data); // Post data to create a new group
  },

  // Update an existing group
  update(id, data) {
    return apiClient.put(`api/groups/${id}`, data); // Put request to update group
  },

  // Delete a group by ID
  delete(id) {
    return apiClient.delete(`api/groups/${id}`); // Delete group by ID
  },

  // Batch update groups
  batchUpdate(data) {
    return apiClient.put("api/groups/batch", data); // Put request to update multiple groups
  },
};

export default groupApi; // Export the group API functions
