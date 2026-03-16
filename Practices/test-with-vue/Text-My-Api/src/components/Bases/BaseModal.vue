<template>
  <teleport to="body">
    <transition name="modal-fade">
      <div v-if="isOpen" class="modal-overlay" @click="handleBackdropClick">
        <div class="modal-dialog" @click.stop>
          <!-- Modal Header -->
          <div class="modal-header">
            <h2 class="modal-title">{{ title }}</h2>
            <button
              v-if="showCloseButton"
              type="button"
              class="btn-close"
              @click="closeModal"
              aria-label="Close">
              ×
            </button>
          </div>

          <!-- Modal Body -->
          <div class="modal-body">
            <slot />
          </div>

          <!-- Modal Footer -->
          <div v-if="$slots.footer" class="modal-footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "Modal",
  },
  showCloseButton: {
    type: Boolean,
    default: true,
  },
  closeOnBackdrop: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["update:isOpen", "close"]);

const handleBackdropClick = () => {
  if (props.closeOnBackdrop) {
    closeModal();
  }
};

const closeModal = () => {
  emit("update:isOpen", false);
  emit("close");
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-dialog {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  animation: slideIn 0.3s ease-out;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #e0e0e0;
}

.modal-title {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #333;
}

.btn-close {
  background: none;
  border: none;
  font-size: 28px;
  color: #999;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  transition: color 0.2s;
}

.btn-close:hover {
  color: #333;
}

.modal-body {
  padding: 20px;
  color: #555;
}

.modal-footer {
  padding: 20px;
  border-top: 1px solid #e0e0e0;
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

/* Animations */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
