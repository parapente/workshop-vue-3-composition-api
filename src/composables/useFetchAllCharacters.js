import { ref } from "vue";
import axios from "axios";

export default function useFetchAllCharacters() {
  const characters = ref([]);
  const loadingState = ref("");
  function fetchAllCharacters() {
    axios.get("https://rickandmortyapi.com/api/character").then((response) => {
      setTimeout(() => {
        loadingState.value = "success";
        characters.value = response.data.results;
      }, 1000);
    });
  }

  return { characters, loadingState, fetchAllCharacters };
}
