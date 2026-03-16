<template>
  <div class="product-form">
    <div class="form-group">
      <label for="name">Product Name *</label>
      <input
        id="name"
        ref="nameInput"
        v-model="formData.name"
        type="text"
        placeholder="Enter product name"
        required
        class="form-control" />
    </div>

    <div class="form-group">
      <label for="price">Price *</label>
      <input
        id="price"
        v-model.number="formData.price"
        type="number"
        placeholder="Enter price"
        step="0.01"
        min="0"
        required
        class="form-control" />
    </div>

    <div class="form-group">
      <label for="description">Description</label>
      <textarea
        id="description"
        v-model="formData.description"
        placeholder="Enter product description"
        rows="4"
        class="form-control"></textarea>
    </div>

    <div v-if="error" class="alert alert-danger">{{ error }}</div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { productStore } from "@/stores/product.store";

const props = defineProps({
  product: {
    type: Object,
    default: null,
  },
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close", "success"]);

const store = productStore();
const loading = ref(false);
const error = ref("");
const nameInput = ref(null);

const formData = ref({
  name: "",
  price: "",
  description: "",
});

const isEditMode = ref(false);

// Reset form when modal opens or product changes
watch(
  () => props.product,
  (newProduct) => {
    if (newProduct) {
      isEditMode.value = true;
      // Handle both structures: product.data and direct product
      const productData = newProduct.data || newProduct;
      formData.value.name = productData.name || "";
      formData.value.price = productData.price || "";
      formData.value.description = productData.description || "";
    } else {
      isEditMode.value = false;
      formData.value.name = "";
      formData.value.price = "";
      formData.value.description = "";
    }
    error.value = "";
  },
  { immediate: true, deep: true },
);

watch(
  () => props.isOpen,
  (newIsOpen) => {
    if (newIsOpen) {
      error.value = "";
      // Focus on input when modal opens
      setTimeout(() => nameInput.value?.focus(), 100);
    }
  },
);

const handleSubmit = async () => {
  // Validate required fields
  if (!formData.value.name.trim()) {
    error.value = "Product name is required";
    return;
  }
  if (!formData.value.price) {
    error.value = "Price is required";
    return;
  }

  loading.value = true;
  error.value = "";

  try {
    if (isEditMode.value) {
      // Handle both structures: product.data and direct product
      const productId = props.product.data?.id || props.product.id;
      await store.updateProduct(productId, formData.value);
    } else {
      await store.createProduct(formData.value);
    }
    emit("success");
  } catch (err) {
    error.value = err.message || "An error occurred. Please try again.";
  } finally {
    loading.value = false;
  }
};

// Expose submit method to parent
defineExpose({
  handleSubmit,
  isEditMode,
  loading,
});
</script>

<style scoped>
.product-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-weight: 500;
  color: #333;
  font-size: 14px;
}

.form-control {
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  font-family: inherit;
  transition: border-color 0.3s;
}

.form-control:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
}

.form-control:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

textarea.form-control {
  resize: vertical;
}

.alert {
  padding: 12px;
  border-radius: 4px;
  font-size: 14px;
}

.alert-danger {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}
</style>
