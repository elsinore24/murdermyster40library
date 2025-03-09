```svelte
<script>
  import { onMount } from 'svelte';

  let tapeHeight;

  onMount(() => {
    const updateSize = () => {
      tapeHeight = Math.min(60, window.innerHeight * 0.08); // Max height of 60px
    };

    updateSize(); // Initialize tape size
    window.addEventListener('resize', updateSize); // Update on window resize

    return () => {
      window.removeEventListener('resize', updateSize); // Cleanup on unmount
    };
  });
</script>

<div
  class="crime-scene-tape"
  style="height: {tapeHeight}px;"
>
  <div class="tape-text">CRIME SCENE DO NOT CROSS</div>
</div>

<style>
  /* Base styles for the tape */
  .crime-scene-tape {
    position: absolute;
    top: 60%; /* Move tape lower */
    left: 0;
    width: 100vw; /* Full viewport width */
    transform: translateY(-50%) rotate(-15deg); /* Steeper angle: Lower on the left side */
    background: linear-gradient(
      to right,
      #e6c700 0%,
      #d4b500 50%,
      #e6c700 100%
    ); /* Yellow gradient for tape */
    border: 1px solid #a69500; /* Darker border */
    clip-path: polygon(
      /* Tape edges */
      0 0,
      100% 0,
      100% 100%,
      95% 95%,
      85% 100%,
      75% 95%,
      65% 100%,
      55% 95%,
      45% 100%,
      35% 95%,
      25% 100%,
      15% 95%,
      0 100%,

      /* Hole 1 - Left */
      5% 45%, 7% 48%, 9% 45%, 7% 42%,

      /* Hole 2 - Right */
      90% 35%, 92% 38%, 94% 35%, 92% 32%
    );
    opacity: 0.95;
    overflow: visible;
    z-index: 30;
    animation: sway 6s ease-in-out infinite; /* Sway animation */
  }

  /* Add dirt, scratches, and worn effects */
  .crime-scene-tape::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(
      circle,
      rgba(0, 0, 0, 0.1) 1%,
      rgba(0, 0, 0, 0.2) 2%,
      transparent 3%
    ); /* Dirt and scratches */
    background-size: 10px 10px; /* Smaller scratches */
    opacity: 0.7;
    pointer-events: none;
    z-index: 1;
  }

  /* Faded streaks for worn effect */
  .crime-scene-tape::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(0, 0, 0, 0.1) 100%
    );
    opacity: 0.5;
    pointer-events: none;
    z-index: 2;
  }

  /* Text styles for the tape */
  .tape-text {
    font-family: 'Courier New', Courier, monospace; /* Distressed typewriter font */
    font-size: 1.5rem;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0.2rem;
    color: rgba(0, 0, 0, 0.8); /* Slightly faded black text */
    text-shadow: 
      -1px -1px 0 rgba(255, 255, 255, 0.3), /* Light highlight */
      2px 2px 2px rgba(0, 0, 0, 0.3); /* Subtle shadow */
    padding: 0.5rem 1rem;
    text-align: center;
    white-space: nowrap;
    z-index: 3;
    animation: text-sway 3s ease-in-out infinite; /* Slight up/down sway animation */
  }

  /* Add a sway animation to the tape */
  @keyframes sway {
    0% {
      transform: translateY(-50%) rotate(-11deg); /* Slight angle to one side */
    }
    50% {
      transform: translateY(-50%) rotate(-14deg); /* Slight angle to the other side */
    }
    100% {
      transform: translateY(-50%) rotate(-11deg); /* Return to the initial angle */
    }
  }

  /* Slight up/down sway animation for text */
  @keyframes text-sway {
    0% {
      transform: translateY(0); /* Neutral position */
    }
    50% {
      transform: translateY(-2px); /* Slight upward movement */
    }
    100% {
      transform: translateY(0); /* Back to neutral */
    }
  }
</style>
