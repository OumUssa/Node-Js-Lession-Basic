import { defineStore } from "pinia";
import { ref } from "vue";

export const productStore = defineStore("useProducts", () => {
  const products = ref([]);
  const loading = ref(false);

  const getAllproducts = async () => {
    loading.value = true;
    try {
      const res = await fetch("http://localhost:3000/products");
      const data = await res.json();
      products.value = data;
      return data;
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      loading.value = false;
    }
  };

  const getDetailproduct = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/product/${id}`);
      const data = await res.json();
      return data;
    } catch (e) {
      console.log(e);
    }
  };
  const createProduct = async (payload) => {
    try {
      const res = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to create product");
      const data = await res.json();
      await getAllproducts();
      return data;
    } catch (e) {
      console.error("Error creating product:", e);
      throw e;
    }
  };

  const updateProduct = async (id, payload) => {
    try {
      const res = await fetch(`http://localhost:3000/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to update product");
      const data = await res.json();
      await getAllproducts();
      return data;
    } catch (e) {
      console.error("Error updating product:", e);
      throw e;
    }
  };

  const deleteProduct = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/products/delete/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete product");
      await getAllproducts();
      return true;
    } catch (e) {
      console.error("Error deleting product:", e);
      throw e;
    }
  };

  return {
    getAllproducts,
    getDetailproduct,
    createProduct,
    updateProduct,
    deleteProduct,
    products,
    loading,
  };
});
