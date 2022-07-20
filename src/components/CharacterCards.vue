<template>
  <div>
    <div class="border-b-2 pb-4 border-gray-300 text-center">
      Order by
      <button class="btn bg-blue-500 mr-4" @click="setOrderKey('name')">
        Name
      </button>
      <button class="btn bg-orange-500" @click="setOrderKey('id')">Id</button>
    </div>
    <div class="m-auto container flex flex-wrap mt-10">
      <div v-for="character in (charactersOrdered as Character[])" :key="character.id"
        class="xl:w-1/5 lg:w-1/4 md:w-1/3 w-1/2 card">
        <div class="card-inner">
          <div class="image">
            <img :src="character.image" class="bg-gray-200" height="300" width="300" />
          </div>
          <div class="content text-center mt-5">
            <span class="header text-xl">{{ character.name }}</span>
            <div class="text-center text-gray-500 text-sm">
              <div class="">Status: {{ character.status }}</div>
              <div>{{ character.species }}</div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="characterLoadingState === 'loading'" class="loading">
        <span class="text-gray-500">Loading characters...</span>
        <img src="/spinner.svg" alt="loading" />
      </div>
    </div>
    <div>
      <h1 class="text-2xl text-center border-t-4 border-b-2 p-4">Locations</h1>
      <div class="m-auto container flex flex-wrap mt-10">
        <div v-for="location in (locations as Location[])" :key="location.id"
          class="xl:w-1/5 lg:w-1/4 md:w-1/3 w-1/2 card">
          <div class="card-inner">
            <div class="content text-center mt-5">
              <span class="header text-xl">{{ location.name }}</span>
              <div class="text-center text-gray-500 text-sm">
                <div class="">Type: {{ location.type }}</div>
                <div>Dimension: {{ location.dimension }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="locationsLoadingState === 'loading'" class="loading">
        <span class="text-gray-500">Loading locations...</span>
        <img src="/spinner.svg" alt="loading" />
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { orderBy } from "lodash";
import { ref, computed, onMounted } from "vue";
import useFetchResource from "@/composables/useFetchResource";

const {
  data: characters,
  loadingState: characterLoadingState,
  fetchResource: characterFetchResource
} = useFetchResource("https://rickandmortyapi.com/api/character");

const {
  data: locations,
  loadingState: locationsLoadingState,
  fetchResource: locationsFetchResource
} = useFetchResource("https://rickandmortyapi.com/api/location");

type Character = { id: String, name: String, status: String, species: String };
type Location = { id: String, name: String, type: String, dimension: String };

const orderKey = ref("id");

const charactersOrdered = computed(() =>
  orderBy(characters.value, [orderKey.value]));

const setOrderKey = (key: string) => {
  orderKey.value = key;
};

onMounted(() => {
  characterFetchResource();
  locationsFetchResource();
});
</script>

<style scoped>
.btn {
  @apply px-6 py-1 text-white rounded;
}

.card-inner {
  @apply p-4 shadow-md rounded m-2;
}

.card-inner img {
  @apply rounded;
  max-width: auto;
  display: block;
}

.loading {
  @apply fixed top-0 left-0 right-0 bottom-0 bg-white flex justify-center items-center;
}
</style>
