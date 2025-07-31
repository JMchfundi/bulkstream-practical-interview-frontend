import apiClient from "./axios"; // Import the Axios instance

const loanApi = {
  // Fetch all loans
  getAll() {
    return apiClient.get("api/loans");
  },

  // Fetch a single loan by ID
  getById(id) {
    return apiClient.get(`api/loans/${id}`);
  },

  // Create a history
  create(data) {
    return apiClient.post("api/loans", data);
  },

  // Update an existing loan
  update(id, data) {
    return apiClient.put(`api/loans/${id}`, data);
  },

  // Update loan approval status
  updateApprovalStatus(id, data) {
    return apiClient.put(`api/loans/update-loan-approval-status/${id}`, data);
  },

  // Delete a loan by ID
  delete(id) {
    return apiClient.delete(`api/loans/${id}`);
  },

  // Fetch loans pending approval by a specific user
  getPendingApprovalByApprover(approverId) {
    return apiClient.get(`api/loans/pending-approval`, {
      params: { approverId },
    });
  },

  // Fetch fully approved loans
  getApproved() {
    return apiClient.get("api/loans/approved");
  },

  // ✅ CORRECT: Disburse a loan with accountId as query param
  disburseLoan(id, accountId) {
    return apiClient.post(`api/loans/disburse/${id}`, null, {
      params: { disburserId: parseInt(accountId) }
    });
  },
};

export default loanApi;
