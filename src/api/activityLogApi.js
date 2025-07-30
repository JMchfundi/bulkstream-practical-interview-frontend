import apiClient from "./axios"; // Custom Axios instance

const activityLogApi = {
  // 🔹 Get all logs
  getAll: () => apiClient.get("/api/activity-logs"),

  // 🔹 Get logs by username
  getByUser: (username) => apiClient.get(`/api/activity-logs/user/${username}`),

  // 🔹 Get logs by module/controller
  getByModule: (module) => apiClient.get(`/api/activity-logs/module/${module}`),

  /**
   * 🔹 Get logs for a specific entity
   * @param {string} entityType - e.g. "UserDto", "GroupDto"
   * @param {number|string} entityId
   */
  getByEntity: (entityType, entityId) =>
    apiClient.get("/api/activity-logs/entity", {
      params: { entityType, entityId },
    }),
};

export default activityLogApi;
