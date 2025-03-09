<script>
  import { onMount } from 'svelte';
  import { playerState } from '$lib/stores/gameState';
  
  let container;
  let mouseX = 0;
  let mouseY = 0;
  
  function updateLighting(e) {
    if (!$playerState.hasFlashlight) return;
    
    const rect = container.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  }
  
  onMount(() => {
    container.addEventListener('mousemove', updateLighting);
    return () => container.removeEventListener('mousemove', updateLighting);
  });
</script>

<div bind:this={container} 
     class="fixed inset-0 pointer-events-none z-30 flicker-overlay"
     style="background: radial-gradient(
       circle 150px at {mouseX}px {mouseY}px,
       transparent 0%,
       rgba(0, 0, 0, 0.85) 100%
     )">
</div>

<style>
  .flicker-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
  }

  .flicker-overlay::before {
    content: '';
    position: fixed;
    inset: 0;
    background: radial-gradient(
      circle at 50% 50%,
      var(--flicker-bright) 0%,
      transparent 70%
    );
    opacity: 0;
    animation: flicker 4s infinite alternate ease-in-out;
    pointer-events: none;
  }

  @keyframes flicker {
    0%, 100% {
      opacity: 0.1;
    }
    50% {
      opacity: 0.15;
    }
    75% {
      opacity: 0.05;
    }
  }
</style>
