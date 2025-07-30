import apiClient from "./axios"; // Import the Axios instance

const transactionApi = {
  // Create a new transaction (POST /api/transactions)
  create(transaction) {
    return apiClient.post("/api/transactions", transaction);
  },

  // Get all transactions (GET /api/transactions)
  getAll() {
    return apiClient.get("/api/transactions");
  },

  // Get a transaction by ID (GET /api/transactions/{id})
  getById(id) {
    return apiClient.get(`/api/transactions/${id}`);
  },

  // Update a transaction by ID (PUT /api/transactions/{id})
  update(id, transaction) {
    return apiClient.put(`/api/transactions/${id}`, transaction);
  },

  // Delete a transaction by ID (DELETE /api/transactions/{id})
  delete(id) {
    return apiClient.delete(`/api/transactions/${id}`);
  },

  // Save a single receipt (POST /api/transactions/receipt)
  saveReceipt(payload) {
    return apiClient.post("/api/transactions/receipt", payload);
  },

  // Save multiple receipts in batch (POST /api/transactions/receipt/batch)
  saveBatchReceipts(payloads) {
    return apiClient.post("/api/transactions/receipt/batch", payloads);
  },
};

export default transactionApi;
