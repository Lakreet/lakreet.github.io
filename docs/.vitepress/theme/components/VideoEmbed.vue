<script setup lang="ts">
interface Props {
  videoId: string;
  title?: string;
  poster?: string;
}

const props = defineProps<Props>();

const isLoaded = ref(false);
const showPoster = ref(true);

function loadVideo() {
  showPoster.value = false;
  isLoaded.value = true;
}

const videoUrl = computed(
  () =>
    `https://www.youtube-nocookie.com/embed/${props.videoId}?rel=0&modestbranding=1`,
);
const posterUrl = computed(
  () =>
    props.poster ||
    `https://img.youtube.com/vi/${props.videoId}/maxresdefault.jpg`,
);
const fallbackPoster = `https://img.youtube.com/vi/${props.videoId}/hqdefault.jpg`;
</script>

<template>
  <div class="video-embed" :class="{ loaded: isLoaded }">
    <div
      v-if="showPoster"
      class="video-poster"
      @click="loadVideo"
      role="button"
      tabindex="0"
      @keydown.enter="loadVideo"
      @keydown.space.prevent="loadVideo"
      :aria-label="`Play video: ${props.title || 'Lakreet demo'}`"
    >
      <img
        :src="posterUrl"
        :alt="props.title || 'Video thumbnail'"
        :onerror="(e) => (e.target.src = fallbackPoster)"
        loading="lazy"
      />
      <div class="play-button" aria-hidden="true">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="currentColor">
          <circle cx="32" cy="32" r="32" opacity="0.9" />
          <path d="M26 20v24l18-12z" fill="white" />
        </svg>
      </div>
    </div>

    <div v-else class="video-iframe-wrapper">
      <iframe
        :src="videoUrl"
        title="Video player"
        frameborder="0"
        allow="
          accelerometer;
          autoplay;
          clipboard-write;
          encrypted-media;
          gyroscope;
          picture-in-picture;
          web-share;
        "
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
        loading="lazy"
      ></iframe>
    </div>

    <p v-if="props.title" class="video-caption">{{ props.title }}</p>
    <p class="video-fallback">
      <a
        :href="`https://www.youtube.com/watch?v=${props.videoId}`"
        target="_blank"
        rel="noopener noreferrer"
        >Watch on YouTube →</a
      >
    </p>
  </div>
</template>

<style scoped>
.video-embed {
  position: relative;
  max-width: 800px;
  margin: var(--vp-spacing-6) auto;
  border-radius: var(--vp-border-radius-md);
  overflow: hidden;
  background-color: var(--vp-c-bg-alt);
}

.video-poster {
  position: relative;
  cursor: pointer;
  aspect-ratio: 16 / 9;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color var(--vp-transition-fast);
}

.video-poster:hover {
  background-color: var(--vp-c-brand-soft);
}

.video-poster:focus {
  outline: none;
  box-shadow: inset 0 0 0 3px var(--vp-c-brand-1);
}

.video-poster img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.play-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.4));
  transition: transform var(--vp-transition-fast);
}

.video-poster:hover .play-button {
  transform: translate(-50%, -50%) scale(1.1);
}

.video-iframe-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
}

.video-iframe-wrapper iframe {
  width: 100%;
  height: 100%;
  border: none;
}

.video-caption {
  margin: var(--vp-spacing-2) 0 0;
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  text-align: center;
}

.video-fallback {
  margin: var(--vp-spacing-3) 0 0;
  text-align: center;
  font-size: 0.8125rem;
}

.video-fallback a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
}

.video-fallback a:hover {
  text-decoration: underline;
}

@media (prefers-reduced-motion: reduce) {
  .play-button {
    transition: none;
  }
  .video-poster:hover .play-button {
    transform: translate(-50%, -50%);
  }
}
</style>
