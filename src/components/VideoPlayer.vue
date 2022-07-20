<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
	src: string,
}>();

const video = ref(null); 
</script>
<template>
	<div>
		<video :src="props.src" ref="video" />
		<div class="video-buttons" v-if="video">
			<button @click="video.play()">Play</button>
			<button @click="video.pause()">Pause</button>
		</div>
	</div>
</template>

<style scoped>
video {
	width: 800px;
	margin: 0 auto;
}

.video-buttons {
	width: 800px;
	margin: 0 auto;
}

.video-buttons button {
	padding: 5px;
	border: 1px solid #000;
	background: linear-gradient(to bottom, rgb(85, 245, 170), #fff)
}
</style>