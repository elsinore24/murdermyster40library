<script>
  export let intensity = 1.0;
  export let scale = 1.0;
</script>

<div 
  class="environment relative w-full h-full overflow-hidden"
  style="--scale: {scale}"
>
  <div class="fog-layer"></div>
  
  {#each Array(5) as _, i}
    <div 
      class="spiral-tree absolute bottom-0"
      style="left: {i * 20}%; animation-delay: {i * 0.5}s"
    ></div>
  {/each}
  
  <div class="mansion-container">
    <div class="mansion"></div>
  </div>
</div>

<style>
  .environment {
    background: linear-gradient(180deg, var(--burton-purple), var(--burton-black));
    filter: contrast(1.5) brightness(0.8);
    will-change: transform;
    height: 100vh;
  }

  .mansion-container {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .mansion {
    position: relative;
    width: min(95%, 800px); /* Default width */
    aspect-ratio: 16/7;
    background-color: var(--burton-charcoal);
    transform: rotate(-2deg);
    clip-path: polygon(
      20% 100%, 80% 100%,
      85% 80%, 70% 75%,
      75% 60%, 60% 55%,
      65% 30%, 50% 0%,
      35% 30%, 40% 55%,
      25% 60%, 30% 75%,
      15% 80%
    );
    transition: transform 0.3s ease, width 0.3s ease; /* Smooth scaling */
  }

  /* Enlarging Mansion Image on Mobile View */
  @media (max-width: 768px) {
    .mansion {
      width: min(100%, 900px); /* Increase width on mobile */
      aspect-ratio: 16/7; /* Maintain aspect ratio */
      transform: rotate(-1deg) scale(1.3); /* Enlarge the mansion */
    }

    .mansion-container {
      padding: 1rem; /* Add spacing to prevent overlap */
    }
  }

  @media (max-width: 480px) {
    .mansion {
      width: 100%; /* Full width on smaller screens */
      transform: rotate(0deg) scale(1.5); /* Further enlarge for small screens */
    }
  }

  .spiral-tree {
    width: 10%;
    height: 40%;
    background: var(--burton-charcoal);
    clip-path: path("M10 10 Q20 0 30 10 T50 10 T70 20 T90 10 L100 100 L0 100 Z");
    animation: sway 10s infinite alternate ease-in-out;
    transform-origin: bottom;
  }

  .fog-layer {
    position: absolute;
    inset: 0;
    background: radial-gradient(
      circle at 50% 50%,
      var(--burton-purple) 0%,
      transparent 70%
    );
    opacity: 0.3;
    animation: float 12s infinite alternate ease-in-out;
  }

  @keyframes sway {
    0% { transform: rotate(-5deg); }
    100% { transform: rotate(5deg); }
  }

  @keyframes float {
    0% { transform: translateY(-10px); }
    100% { transform: translateY(10px); }
  }
</style>
