<template>
  <div>
    <FilterComponent @apply-filters="applyFilters" />
    <div class="cards-container">
      <div v-for="character in characters" :key="character.id" class="card">
        <div class="image-container">
          <img
            :src="character.image"
            :alt="character.name"
            class="character-image"
          />
        </div>
        <div class="text-container">
          <div class="section">
            <h2 class="character-name">{{ character.name }}</h2>
            <div class="status">
              <div
                :class="{
                  status__icon: true,
                  'status__icon--alive': character.status === 'Alive',
                  'status__icon--dead': character.status === 'Dead',
                  'status__icon--unknown':
                    character.status !== 'Alive' && character.status !== 'Dead',
                }"
              ></div>
              <span class="status__text">
                {{ character.status ? character.status : "Unknown" }} -
                {{ character.species ? character.species : "Unknown" }}
              </span>
            </div>
          </div>
          <div class="section">
            <p class="text-gray">Last known location:</p>
            <p class="desc">{{ character.location.name }}</p>
          </div>
          <div class="section">
            <p class="text-gray">First seen in:</p>
            <p class="desc">{{ character.origin.name }}</p>
          </div>
        </div>
      </div>
    </div>
    <PaginationComponent
      :currentPage="currentPage"
      :totalPages="totalPages"
      @next-page="nextPage"
      @prev-page="prevPage"
    />
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import FilterComponent from "./FilterComponent.vue";
import PaginationComponent from "./PaginationComponent.vue";
import { fetchCharacters } from "../utils/api";

export default {
  name: "CharacterList",
  components: {
    FilterComponent,
    PaginationComponent,
  },
  setup() {
    const characters = ref([]);
    const currentPage = ref(1);
    const totalPages = ref(1);
    const nameFilter = ref("");
    const statusFilter = ref("");

    const loadCharacters = async () => {
      const data = await fetchCharacters(
        currentPage.value,
        nameFilter.value,
        statusFilter.value,
      );
      characters.value = data.results;
      totalPages.value = data.info.pages;
    };

    const nextPage = async () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
        await loadCharacters();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    const prevPage = async () => {
      if (currentPage.value > 1) {
        currentPage.value--;
        await loadCharacters();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    const applyFilters = ({ name, status }) => {
      nameFilter.value = name;
      statusFilter.value = status;
      currentPage.value = 1;
      loadCharacters();
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    onMounted(() => {
      loadCharacters();
    });

    watch([currentPage, nameFilter, statusFilter], loadCharacters);

    return {
      characters,
      currentPage,
      totalPages,
      nextPage,
      prevPage,
      applyFilters,
    };
  },
};
</script>

<style scoped>
.cards-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 100%;
  max-width: 1920px;
  margin: 0 auto;
}

.card {
  width: 100%;
  max-width: 600px;
  width: 600px;
  height: 220px;
  display: flex;
  background: #3c3e44;
  border-radius: 8px;
  margin: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.image-container {
  width: 40%;
  overflow: hidden;
  border-radius: 8px 0 0 8px;
}

.character-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.text-container {
  width: 60%;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  color: #ffffff;
}

.section {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
}

.character-name {
  font-size: 1.6rem;
  font-weight: bold;
  margin: 0;
}

.status {
  display: flex;
  align-items: center;
  text-transform: capitalize;
  margin-top: 8px;
}

.status__icon {
  width: 12px;
  height: 12px;
  margin-right: 8px;
  border-radius: 50%;
}

.status__icon--alive {
  background-color: #55cc44;
}

.status__icon--dead {
  background-color: #d63d2e;
}

.status__icon--unknown {
  background-color: #9e9e9e;
}

.text-gray {
  color: #9e9e9e;
  margin: 0;
}

.desc {
  margin: 0;
  color: #ffffff;
}

.pagination-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
}

@media (max-width: 768px) {
  .card {
    flex-direction: column;
    height: auto;
    max-width: 80%;
  }

  .image-container {
    width: 100%;
    height: 230px;
    border-radius: 8px 8px 0 0;
  }

  .character-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .text-container {
    width: auto;
  }
  .section {
    padding: 4px;
  }
}

@media (max-width: 480px) {
  .character-name {
    font-size: 1.2rem;
  }

  .status__icon {
    width: 10px;
    height: 10px;
  }

  .status__text {
    font-size: 0.9rem;
  }
}
</style>
