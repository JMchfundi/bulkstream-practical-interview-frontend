// src/api/menuApi.js (or a similar path in your frontend project)

import apiClient from "./axios"; // Assuming this is your custom Axios instance

const menuApi = {
  /**
   * Fetches the dynamic menu items for the current authenticated user.
   * This endpoint applies role-based access control (RBAC) on the backend.
   * @returns {Promise<AxiosResponse<Array>>} A promise that resolves to the list of accessible menu items.
   */
  getDynamicMenu: () => apiClient.get("/api/menu/items"),

  /**
   * Fetches all menu items, typically for an administrative panel.
   * This endpoint usually requires an 'ADMIN' role on the backend and does not apply RBAC filtering.
   * @returns {Promise<AxiosResponse<Array>>} A promise that resolves to the list of all menu items.
   */
  getAllMenuItemsForAdmin: () => apiClient.get("/api/menu/admin/items"),

  /**
   * Fetches a single menu item by its ID, typically for an administrative panel.
   * Requires 'ADMIN' role on the backend.
   * @param {number|string} id The ID of the menu item to fetch.
   * @returns {Promise<AxiosResponse<Object>>} A promise that resolves to the menu item object.
   */
  getMenuItemById: (id) => apiClient.get(`/api/menu/admin/items/${id}`),

  /**
   * Creates a new menu item.
   * Requires 'ADMIN' role on the backend.
   * @param {object} data The menu item data to create (matching MenuItemCreateUpdateDto).
   * @returns {Promise<AxiosResponse<Object>>} A promise that resolves to the created menu item object.
   */
  createMenuItem: (data) => apiClient.post("/api/menu/admin/items", data),

  /**
   * Updates an existing menu item by its ID.
   * Requires 'ADMIN' role on the backend.
   * @param {number|string} id The ID of the menu item to update.
   * @param {object} data The updated menu item data (matching MenuItemCreateUpdateDto).
   * @returns {Promise<AxiosResponse<Object>>} A promise that resolves to the updated menu item object.
   */
  updateMenuItem: (id, data) => apiClient.put(`/api/menu/admin/items/${id}`, data),

  /**
   * Deletes a menu item by its ID.
   * Requires 'ADMIN' role on the backend.
   * @param {number|string} id The ID of the menu item to delete.
   * @returns {Promise<AxiosResponse<void>>} A promise that resolves when the deletion is successful (no content).
   */
  deleteMenuItem: (id) => apiClient.delete(`/api/menu/admin/items/${id}`),
};

export default menuApi;