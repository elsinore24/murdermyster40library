<script>
  import { animate } from 'motion';
  import { inventory } from '$lib/stores/gameState';
  
  export let show = false;
  export let isOpen = false;
  
  let inventoryPanel;
  
  $: if (inventoryPanel && show) {
    animate(
      inventoryPanel,
      { 
        x: isOpen ? '0%' : '100%',
        opacity: isOpen ? 1 : 0.5 
      },
      { 
        duration: 0.3,
        easing: [0.4, 0, 0.2, 1]
      }
    );
  }
</script>

<div
  bind:this={inventoryPanel}
  class="fixed right-0 top-0 h-full w-64 bg-gray-800 bg-opacity-90 p-4 transform translate-x-full"
>
  <h2 class="text-xl text-white mb-4">Inventory</h2>
  <div class="grid grid-cols-2 gap-2">
    {#each $inventory as item}
      <button
        class="bg-gray-700 p-2 rounded cursor-pointer hover:bg-gray-600"
        on:click={() => console.log('Selected:', item)}
        type="button"
      >
        <img src={item.icon} alt={item.name} class="w-full h-auto" />
        <p class="text-white text-sm mt-1">{item.name}</p>
      </button>
    {/each}
  </div>
</div>
