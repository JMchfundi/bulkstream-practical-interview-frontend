import apiClient from "./axios"; // Custom Axios instance

const accountApi = {
  // Fetch all accounts
  getAll: () => apiClient.get("/api/accounts"),

  // Fetch a single account by ID
  getById: (id) => apiClient.get(`/api/accounts/${id}`),

  // Create a new account
  create: (data) => apiClient.post("/api/accounts", data),

  // Update an existing account
  update: (id, data) => apiClient.put(`/api/accounts/${id}`, data),

  // Delete an account by ID
  delete: (id) => apiClient.delete(`/api/accounts/${id}`),

  // Batch update (optional backend support)
  batchUpdate: (data) => apiClient.put("/api/accounts/batch", data),

  /**
   * Get account statement
   * @param {number|string} id
   * @param {object} config - { params: { startDate, endDate } }
   */
  getStatement: (id, config) =>
    apiClient.get(`/api/accounts/${id}/statement`, config),

  /**
   * Download Ledger Report PDF
   * @param {number|string} id - Account ID
   * @param {object} params - { startDate: 'YYYY-MM-DD', endDate: 'YYYY-MM-DD' }
   * @returns {Promise<AxiosResponse<Blob>>}
   */
  downloadLedgerReport: (id, params) =>
    apiClient.get(`/api/accounts/report/ledger/${id}`, { params, responseType: 'blob' }),
};

export default accountApi;
