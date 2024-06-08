<template>
  <div class="pagination-container">
    <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
    <span>Page {{ currentPage }} of {{ totalPages }}</span>
    <button @click="nextPage" :disabled="currentPage === totalPages">
      Next
    </button>
  </div>
</template>

<script>
export default {
  name: "PaginationComponent",
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
  },
  emits: ["prev-page", "next-page"],
  methods: {
    nextPage() {
      this.$emit("next-page");
    },
    prevPage() {
      this.$emit("prev-page");
    },
  },
};
</script>

<style scoped>
.pagination-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  flex-wrap: wrap;
}

.pagination-container button {
  background: #3c3e44;
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  margin: 10px;
  cursor: pointer;
  transition: background 0.3s;
}

.pagination-container button:hover:not(:disabled) {
  background: #5b5f67;
}

.pagination-container button:disabled {
  cursor: not-allowed;
  background: #2c2e33;
}

.pagination-container span {
  color: #dadada;
  font-size: 16px;
  margin: 10px;
}

@media (max-width: 768px) {
  .pagination-container button {
    padding: 8px 16px;
    font-size: 14px;
  }

  .pagination-container span {
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .pagination-container {
    flex-direction: column;
  }

  .pagination-container button {
    width: 100%;
    margin: 5px 0;
  }

  .pagination-container span {
    font-size: 12px;
    margin: 5px 0;
  }
}
</style>
