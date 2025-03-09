<script>
  import { userName } from '$lib/stores/userStore';
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import RainOverlay from '$lib/components/RainOverlay.svelte';
  import Environment from '$lib/components/Environment.svelte';
  import Suspect from '$lib/components/Suspect.svelte';
  import Typewriter from '$lib/components/Typewriter.svelte';
  import { suspects } from '$lib/data/suspects';
  import { loadEvidence } from '$lib/stores/evidence';

  let name = '';

  onMount(() => {
    userName.subscribe(value => {
      name = value;
    });
    loadEvidence();
  });

  let murderStory = `As you step inside the grand mansion, the air feels heavy with tension.
    A murder has taken place, and you're here to help solve the mystery.
    The victim, Mr. Black, was found in the library. The suspects are all gathered here,
    but no one knows who the culprit is... yet.`;
</script>

<div class="fixed-bg">
  <Environment />
  <RainOverlay />
</div>

<div class="scrollable-content">
  <main class="content-wrapper">
    <div class="content-inner" in:fade={{ duration: 1000 }}>
      <h1 class="text-4xl font-bold mb-4 text-center burton-text-shadow" in:fly={{ y: 20, duration: 1000 }}>
        Welcome to the Mansion, {name}
      </h1>
      
      <div class="mt-16">
        <Typewriter text={murderStory} speed={30} delay={1000} />
      </div>

      <h2 class="text-2xl font-semibold mb-4 text-center burton-text-shadow mt-16" in:fly={{ y: 20, duration: 1000, delay: 400 }}>
        Meet the Suspects
      </h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6" in:fly={{ y: 20, duration: 1000, delay: 600 }}>
        {#each suspects as suspect, i}
          <div in:fly={{ y: 20, duration: 1000, delay: 800 + i * 200 }}>
            <Suspect {suspect} />
          </div>
        {/each}
      </div>

      <div class="flex justify-center mt-8 mb-8" in:fly={{ y: 20, duration: 1000, delay: 1600 }}>
        <a href="/game" class="burton-button">
          Begin Investigation
        </a>
      </div>
    </div>
  </main>
</div>

<style>
  .fixed-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }

  .scrollable-content {
    position: relative;
    z-index: 1;
    height: 100%;
    background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.6));
    overflow-y: auto;
  }

  .content-wrapper {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
    height: auto;
  }

  .content-inner {
    max-width: 800px;
    margin: 0 auto;
    padding-bottom: 2rem;
  }

  @media (max-width: 768px) {
    .content-wrapper {
      padding: 1rem;
    }
  }
</style>
