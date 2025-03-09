<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { userName } from '$lib/stores/userStore';
  import RainOverlay from '$lib/components/RainOverlay.svelte';
  import BloodSplatter from '$lib/components/BloodSplatter.svelte';
  import CrimeSceneTape from '$lib/components/CrimeSceneTape.svelte';
  import Environment from '$lib/components/Environment.svelte';

  let heading;
  let name = '';
  let error = '';
  let isTransitioning = false;
  let scale = 1.0;
  
  onMount(() => {
    if (heading) {
      heading.style.opacity = '1';
      heading.style.transform = 'translateY(0)';
      heading.style.transition = 'opacity 1s, transform 1s';
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.trim() === '') {
      error = 'We need a name to proceed, dear guest.';
      return;
    }
    userName.set(name);
    isTransitioning = true;
    scale = 1.8;
    
    await new Promise(resolve => setTimeout(resolve, 3000));
    goto('/mansion');
  };
</script>

<svelte:head>
  <title>Murder at Greystone Manor</title>
</svelte:head>

<div class="fixed inset-0 overflow-hidden bg-[var(--burton-black)]">
  <div class="environment-wrapper absolute inset-0 z-10 flex items-center justify-center" class:transitioning={isTransitioning}>
    <div class="environment-container w-full h-full">
      <Environment intensity={isTransitioning ? 1.5 : 1.0} {scale} />
    </div>
  </div>
  <div class="overlay absolute inset-0 z-20" class:transitioning={isTransitioning}></div>
  <RainOverlay />
  <BloodSplatter />
  
  <div class="absolute inset-0 z-40 flex flex-col items-center px-4" class:fade-out={isTransitioning}>
    <h1 
      bind:this={heading}
      class="text-5xl font-bold text-center mt-8 opacity-0 text-red-600 md:text-5xl text-4xl burton-text-shadow"
      style="transform: translateY(50px)"
    >
      Murder at Greystone Manor
    </h1>

    <div class="flex flex-col items-center justify-center mt-16 text-[var(--burton-white)]">
      <h2 class="text-3xl font-bold mb-4 burton-text-shadow">Welcome, Stranger...</h2>
      <p class="mb-6 text-lg burton-text-shadow">What shall we call you tonight?</p>
    </div>

    <CrimeSceneTape />
    
    <form on:submit={handleSubmit} class="flex flex-col items-center gap-4 mt-16 md:mt-16 mt-32">
      <input
        type="text"
        bind:value={name}
        placeholder="Enter your name"
        class="px-4 py-2 border border-[var(--burton-purple)] rounded-md bg-[var(--burton-charcoal)] text-[var(--burton-white)] placeholder-gray-400 w-full max-w-xs"
      />
      {#if error}
        <p class="text-red-500 text-sm burton-text-shadow">{error}</p>
      {/if}
      <button
        type="submit"
        class="burton-button w-full max-w-xs"
      >
        Continue
      </button>
    </form>
  </div>
</div>

<style>
  :global(body) {
    font-family: 'Georgia', serif;
    overflow: hidden;
  }

  .environment-wrapper {
    transform-origin: center center;
  }

  .environment-container {
    transform-origin: center center;
    transition: transform 3s ease-in-out;
    will-change: transform;
  }

  .environment-wrapper.transitioning .environment-container {
    transform: scale(var(--scale, 1.8));
  }

  .overlay {
    background: black;
    opacity: 0;
    transition: opacity 3s ease-in;
    pointer-events: none;
  }

  .overlay.transitioning {
    opacity: 1;
  }

  .fade-out {
    transition: opacity 2s ease-in;
    opacity: 0;
  }
</style>
