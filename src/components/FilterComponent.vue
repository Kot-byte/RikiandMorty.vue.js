<template>
  <div class="filter-container">
    <input type="text" v-model="name" placeholder="Name" />
    <select v-model="status">
      <option value="">Select status</option>
      <option value="Alive">Alive</option>
      <option value="Dead">Dead</option>
      <option value="unknown">Unknown</option>
    </select>
    <button @click="applyFilters">Find</button>
  </div>
</template>

<script>
export default {
  name: "FilterComponent",
  data() {
    return {
      name: "",
      status: "",
    };
  },
  methods: {
    applyFilters() {
      this.$emit("apply-filters", { name: this.name, status: this.status });
    },
  },
};
</script>

<style scoped>
.filter-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
}

.filter-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  flex-wrap: wrap;
}

input,
select {
  padding: 8px;
  margin-right: 10px;
  border: 1px solid #3c3e44;
  border-radius: 4px;
  background: #2c2e33;
  color: #ffffff;
}

.filter-container button {
  padding: 8px 16px;
  background: #3c3e44;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

.filter-container button:hover {
  background: #5b5f67;
}

@media (max-width: 768px) {
  .filter-container {
    flex-direction: column;
  }

  input,
  select {
    width: 80%;
    margin: 0;
    margin-bottom: 10px;
  }

  .filter-container button {
    width: 80%;
    margin: 0;
  }
}

@media (max-width: 480px) {
  input,
  select,
  .filter-container button {
    font-size: 14px;
  }
}
</style>
