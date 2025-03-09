<script>
  import { onMount } from 'svelte';
  import { getImageUrl } from '$lib/storage';

  export let suspect;
  let imageUrl = '';
  let loading = true;
  let error = false;

  async function tryLoadImage(path) {
    try {
      return await getImageUrl(path);
    } catch {
      return null;
    }
  }

  onMount(async () => {
    try {
      loading = true;
      error = false;
      
      // Try jpg first, then jpeg
      const jpgPath = `${suspect.id}/profile.jpg`;
      const jpegPath = `${suspect.id}/profile.jpeg`;
      
      console.log('Attempting to load suspect images:', suspect.id);
      
      // Try jpg first
      imageUrl = await tryLoadImage(jpgPath);
      
      // If jpg fails, try jpeg
      if (!imageUrl) {
        imageUrl = await tryLoadImage(jpegPath);
      }

      if (!imageUrl) {
        throw new Error('No image found with either extension');
      }

      console.log('Image URL loaded:', imageUrl);
    } catch (err) {
      console.error('Failed to load suspect image:', err);
      error = true;
    } finally {
      loading = false;
    }
  });
</script>

<div class="suspect-card">
  <div class="suspect">
    <div class="suspect-inner">
      <div class="image-container">
        {#if loading}
          <div class="image-placeholder">Loading...</div>
        {:else if error || !imageUrl}
          <div class="image-placeholder">No image available</div>
        {:else}
          <img 
            src={imageUrl} 
            alt={suspect.name} 
            class="suspect-image"
            on:error={() => {
              console.error('Image failed to load:', imageUrl);
              error = true;
            }}
          />
        {/if}
      </div>
      <div class="eyes">
        <div class="eye left"></div>
        <div class="eye right"></div>
      </div>
      <div class="suspect-content">
        <h3>{suspect.name}</h3>
        <p>{suspect.description}</p>
      </div>
    </div>
  </div>
</div>

<style>
  .suspect-card {
    perspective: 1000px;
    width: 100%;
    padding: 1rem;
  }

  .suspect {
    aspect-ratio: 9 / 16;
    position: relative;
    background: var(--burton-black);
    color: var(--burton-white);
    border: 3px solid var(--burton-charcoal);
    animation: sway 8s infinite alternate ease-in-out;
    filter: grayscale(0.5) contrast(1.2);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.6);
    transform-style: preserve-3d;
    transition: transform 0.5s;
  }

  .suspect:hover {
    transform: translateZ(20px) rotateX(5deg);
  }

  .suspect-inner {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .image-container {
    width: 100%;
    height: 200px;
    margin-bottom: 1rem;
    position: relative;
    overflow: hidden;
    border: 2px solid var(--burton-charcoal);
  }

  .suspect-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: opacity 0.3s;
  }

  .image-placeholder {
    width: 100%;
    height: 100%;
    background: var(--burton-charcoal);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--burton-amber);
    border: 2px solid var(--burton-amber);
  }

  .eyes {
    width: 30%;
    height: 15%;
    position: relative;
    margin-bottom: 2rem;
  }

  .eye {
    position: absolute;
    width: 45%;
    height: 100%;
    background: var(--burton-white);
    border: 2px solid var(--burton-charcoal);
    border-radius: 50%;
    box-shadow: 0 0 10px var(--burton-amber);
    animation: flicker-shadow 4s infinite alternate ease-in-out;
  }

  .eye.left {
    left: 0;
  }

  .eye.right {
    right: 0;
  }

  .suspect-content {
    text-align: center;
  }

  @keyframes sway {
    0% {
      transform: translate(-5%, 0) rotate(-2deg);
    }
    100% {
      transform: translate(5%, 0) rotate(2deg);
    }
  }

  @keyframes flicker-shadow {
    0%, 100% {
      box-shadow: 0 0 15px var(--flicker-bright), 0 0 30px var(--flicker-dim);
    }
    50% {
      box-shadow: 0 0 10px var(--flicker-dim), 0 0 20px var(--flicker-bright);
    }
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    font-family: 'Creepster', cursive;
  }

  p {
    font-size: 0.9rem;
    opacity: 0.8;
  }
</style>
