<script>
  import { onMount } from 'svelte';

  export let text = '';
  export let speed = 30; // Reduced from 50 to 30
  export let delay = 0;

  let displayText = '';
  let visible = false;

  onMount(() => {
    setTimeout(() => {
      visible = true;
      typeText();
    }, delay);
  });

  async function typeText() {
    for (let i = 0; i < text.length; i++) {
      displayText = text.slice(0, i + 1);
      await new Promise(resolve => setTimeout(resolve, speed));
    }
  }
</script>

{#if visible}
  <p class="text-lg text-center leading-relaxed burton-text-shadow">
    {displayText}
  </p>
{/if}
