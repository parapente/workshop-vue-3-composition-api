import { ref } from "vue";
import axios from "axios";

export default function useFetchResource(url) {
  const data = ref([]);
  const loadingState = ref("");
  function fetchResource() {
    loadingState.value = "loading";
    axios.get(url).then((response) => {
      setTimeout(() => {
        loadingState.value = "success";
        data.value = response.data.results;
      }, 1000);
    });
  }

  return { data, loadingState, fetchResource };
}
