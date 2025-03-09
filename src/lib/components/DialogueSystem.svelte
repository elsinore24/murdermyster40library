<script>
  import { animate } from 'motion';
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();
  
  let dialogueBox;
  let isVisible = false;
  
  export function show() {
    isVisible = true;
    animate(
      dialogueBox,
      { 
        y: [20, 0],
        opacity: [0, 1]
      },
      { 
        duration: 0.4,
        easing: [0.4, 0, 0.2, 1]
      }
    );
  }
  
  export function hide() {
    animate(
      dialogueBox,
      { 
        y: [0, 20],
        opacity: [1, 0]
      },
      { 
        duration: 0.3,
        easing: [0.4, 0, 0.2, 1]
      }
    ).finished.then(() => isVisible = false);
  }
</script>

{#if isVisible}
  <div 
    bind:this={dialogueBox}
    class="fixed bottom-8 left-1/2 transform -translate-x-1/2 w-3/4 max-w-2xl bg-gray-900 bg-opacity-90 p-6 rounded-lg text-white"
  >
    <slot></slot>
  </div>
{/if}
