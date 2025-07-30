import apiClient from "./axios"; // Custom Axios instance

const productApi = {
  // PRODUCTS
  getAll: () => apiClient.get("/api/products"),
  getById: (id) => apiClient.get(`/api/products/${id}`),
  create: (data) => apiClient.post("/api/products", data),
  update: (id, data) => apiClient.put(`/api/products/${id}`, data),
  delete: (id) => apiClient.delete(`/api/products/${id}`),

  // STOCK IN / OUT
  stockIn: (id, quantity) => apiClient.put(`/api/products/${id}/stock-in`, null, { params: { quantity } }),
  stockOut: (id, quantity) => apiClient.put(`/api/products/${id}/stock-out`, null, { params: { quantity } }),

  // 🔄 SERIAL UPDATE (batch)
  updateSerials: (unitDtos) => apiClient.put("/api/products/units/update-serials", unitDtos),

    // 🔍 Get unassigned product units (without serial numbers)
  getUnassignedUnits: (productId) =>
    apiClient.get(`/api/products/${productId}/units/unassigned`),

  // 🔍 Get all product units
  getAllUnits: () => apiClient.get("/api/products/units"),

  getProductsWithUnassignedUnits: () => apiClient.get("/api/products/units/unassigned-products"),

  getProductsByCategoryId: (loanTypeId) => apiClient.get(`/api/products/by-category/${loanTypeId}`),


  // 🔍 NEW: Search products by price range
  getByPriceRange: (minPrice, maxPrice) => apiClient.get("/api/products/search-by-price", {
    params: { minPrice, maxPrice }
  }),

};

const categoryApi = {
  // CATEGORIES
  getAll: () => apiClient.get("/api/categories"),
  getById: (id) => apiClient.get(`/api/categories/${id}`),
  create: (data) => apiClient.post("/api/categories", data),
  delete: (id) => apiClient.delete(`/api/categories/${id}`)
};

const fileApi = {
  upload: (formData, subDir = "products") =>
    apiClient.post(`/api/files/upload?subDir=${subDir}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  delete: (subDir, fileName) =>
    apiClient.delete(`/api/files/delete/${subDir}/${fileName}`),
  view: (subDir, fileName) =>
    `/api/files/view/${subDir}/${fileName}` // used as image src
};

export { productApi, categoryApi, fileApi };
