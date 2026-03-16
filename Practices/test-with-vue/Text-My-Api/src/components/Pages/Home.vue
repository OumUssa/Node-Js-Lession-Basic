<template>
  <div class="container">
    <div class="header">
      <h1>Products</h1>
      <button class="btn btn-primary" @click="handleCreate">
        + Create New
      </button>
    </div>

    <div v-if="store.loading" class="loading">Loading...</div>

    <div v-else-if="store.products.length === 0" class="empty">
      No products found.
      <a href="#" @click.prevent="handleCreate">Create one now</a>
    </div>

    <table v-else class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Price</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in store.products.data" :key="product.id">
          <td>{{ product.id }}</td>
          <td>{{ product.name }}</td>
          <td>${{ product.price }}</td>
          <td>{{ product.description || "-" }}</td>
          <td class="actions">
            <button class="btn btn-sm btn-info" @click="handleView(product.id)">
              View
            </button>
            <button class="btn btn-sm btn-warning" @click="handleEdit(product)">
              Edit
            </button>
            <button
              class="btn btn-sm btn-danger"
              @click="handleDelete(product.id)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <BaseModal
      v-model:isOpen="showModal"
      :title="`Product Details - ${selectedProduct?.name || ''}`"
      @close="handleClose">
      <div v-if="selectedProduct" class="product-details">
        <div class="detail-row">
          <span class="label">ID:</span>
          <span class="value">{{ selectedProduct.data.id }}</span>
        </div>
        <div class="detail-row">
          <span class="label">Name:</span>
          <span class="value">{{ selectedProduct.data.name }}</span>
        </div>
        <div class="detail-row">
          <span class="label">Price:</span>
          <span class="value">${{ selectedProduct.data.price }}</span>
        </div>
        <div class="detail-row">
          <span class="label">Description:</span>
          <span class="value">{{
            selectedProduct.data.description || "N/A"
          }}</span>
        </div>
      </div>
      <template #footer>
        <button class="btn btn-secondary" @click="handleClose">Close</button>
      </template>
    </BaseModal>
    <BaseModal v-model:isOpen="showCreateModal" title="Create New Product">
      <ProductForm
        ref="createFormRef"
        :product="null"
        :isOpen="showCreateModal"
        @success="handleCreateSuccess" />
      <template #footer>
        <button class="btn btn-secondary" @click="handleFormClose">
          Cancel
        </button>
        <button
          type="button"
          class="btn btn-primary"
          @click="handleCreateSubmit"
          :disabled="createFormRef?.loading">
          {{ createFormRef?.loading ? "Saving..." : "Create" }}
        </button>
      </template>
    </BaseModal>
    <BaseModal v-model:isOpen="showEditModal" title="Edit Product">
      <ProductForm
        ref="editFormRef"
        :product="selectedProduct"
        :isOpen="showEditModal"
        @success="handleEditSuccess" />
      <template #footer>
        <button class="btn btn-secondary" @click="handleFormClose">
          Cancel
        </button>
        <button
          type="button"
          class="btn btn-primary"
          @click="handleEditSubmit"
          :disabled="editFormRef?.loading">
          {{ editFormRef?.loading ? "Saving..." : "Update" }}
        </button>
      </template>
    </BaseModal>
    <BaseModal v-model:isOpen="showDeleteModal" title="Confirm Delete">
      <div class="delete-confirmation">
        <p>Are you sure you want to delete this product?</p>
        <p class="warning">This action cannot be undone.</p>
      </div>
      <template #footer>
        <button class="btn btn-secondary" @click="cancelDelete">Cancel</button>
        <button class="btn btn-danger" @click="confirmDelete">Delete</button>
      </template>
    </BaseModal>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { productStore } from "@/stores/product.store";
import BaseModal from "../Bases/BaseModal.vue";
import ProductForm from "../ProductForm.vue";

const showModal = ref(false);
const showCreateModal = ref(false);
const showEditModal = ref(false);
const showDeleteModal = ref(false);
const selectedProduct = ref(null);
const productToDelete = ref(null);
const createFormRef = ref(null);
const editFormRef = ref(null);
const store = productStore();

onMounted(async () => {
  await store.getAllproducts();
});

const handleCreate = () => {
  showCreateModal.value = true;
};

const handleEdit = async (product) => {
  // Fetch full product details first
  const fullProduct = await store.getDetailproduct(product.id);
  selectedProduct.value = fullProduct;
  showEditModal.value = true;
};

const handleView = async (productId) => {
  selectedProduct.value = await store.getDetailproduct(productId);
  showModal.value = true;
};

const handleDelete = (productId) => {
  productToDelete.value = productId;
  showDeleteModal.value = true;
};

const confirmDelete = async () => {
  try {
    await store.deleteProduct(productToDelete.value);
    showDeleteModal.value = false;
    productToDelete.value = null;
    alert("Product deleted successfully");
  } catch (err) {
    alert("Error deleting product: " + err.message);
  }
};

const cancelDelete = () => {
  showDeleteModal.value = false;
  productToDelete.value = null;
};

const handleClose = () => {
  showModal.value = false;
  selectedProduct.value = null;
};

const handleFormClose = () => {
  showCreateModal.value = false;
  showEditModal.value = false;
  selectedProduct.value = null;
};

const handleCreateSuccess = () => {
  showCreateModal.value = false;
  store.getAllproducts(); // Refresh product list
  alert("Product created successfully!");
};

const handleEditSuccess = () => {
  showEditModal.value = false;
  selectedProduct.value = null;
  store.getAllproducts(); // Refresh product list
  alert("Product updated successfully!");
};

const handleCreateSubmit = async () => {
  await createFormRef.value?.handleSubmit();
};

const handleEditSubmit = async () => {
  await editFormRef.value?.handleSubmit();
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.header h1 {
  font-size: 28px;
  color: #333;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #545b62;
}

.btn-sm {
  padding: 4px 8px;
  font-size: 12px;
}

.btn-info {
  background-color: #17a2b8;
  color: white;
}

.btn-info:hover {
  background-color: #117a8b;
}

.btn-warning {
  background-color: #ffc107;
  color: black;
}

.btn-warning:hover {
  background-color: #e0a800;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}

.btn-danger:hover {
  background-color: #c82333;
}

.loading,
.empty {
  text-align: center;
  padding: 40px;
  color: #666;
  font-size: 16px;
}

.empty a {
  color: #007bff;
  text-decoration: none;
  margin-left: 5px;
}

.empty a:hover {
  text-decoration: underline;
}

.table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.table thead {
  background-color: #f8f9fa;
  border-bottom: 2px solid #dee2e6;
}

.table th {
  padding: 12px;
  text-align: left;
  font-weight: 600;
  color: #333;
}

.table td {
  padding: 12px;
  border-bottom: 1px solid #dee2e6;
}

.table tbody tr:hover {
  background-color: #f8f9fa;
}

.actions {
  display: flex;
  gap: 5px;
}

.product-details {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #e0e0e0;
}

.detail-row:last-child {
  border-bottom: none;
}

.detail-row .label {
  font-weight: 600;
  color: #555;
  min-width: 100px;
}

.detail-row .value {
  color: #333;
  flex: 1;
  text-align: right;
}

.delete-confirmation {
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-align: center;
  padding: 20px 0;
}

.delete-confirmation p {
  margin: 0;
  font-size: 16px;
  color: #333;
}

.delete-confirmation .warning {
  color: #dc3545;
  font-weight: 500;
  font-size: 14px;
}
</style>
