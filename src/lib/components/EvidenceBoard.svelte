<script>
  import { onMount } from 'svelte';
  import { activeClues } from '$lib/stores/gameState';
  import { interactable } from '$lib/actions/interactable';
  
  function getRandomPosition() {
    return {
      top: `${Math.random() * 60 + 20}%`,
      left: `${Math.random() * 60 + 20}%`,
      transform: `rotate(${Math.random() * 10 - 5}deg)`,
      '--random': Math.random()
    };
  }

  let boardElement;
  let canvas;
  let ctx;
  
  function handleClueClick(clue) {
    console.log('Clue clicked:', clue);
    // Add your click handling logic here
  }
  
  onMount(() => {
    if (!boardElement) return;
    
    canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.inset = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    
    ctx = canvas.getContext('2d');
    boardElement.appendChild(canvas);
    
    const updateCanvas = () => {
      const rect = boardElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = '#ff000055';
      ctx.lineWidth = 2;
      
      $activeClues.forEach(clue => {
        if (clue.connections) {
          const sourceEl = document.getElementById(`clue-${clue.id}`);
          clue.connections.forEach(targetId => {
            const targetEl = document.getElementById(`clue-${targetId}`);
            if (sourceEl && targetEl) {
              const sourceRect = sourceEl.getBoundingClientRect();
              const targetRect = targetEl.getBoundingClientRect();
              
              ctx.beginPath();
              ctx.moveTo(
                sourceRect.left - rect.left + sourceRect.width / 2,
                sourceRect.top - rect.top + sourceRect.height / 2
              );
              ctx.lineTo(
                targetRect.left - rect.left + targetRect.width / 2,
                targetRect.top - rect.top + targetRect.height / 2
              );
              ctx.stroke();
            }
          });
        }
      });
    };

    updateCanvas();
    window.addEventListener('resize', updateCanvas);

    return () => {
      window.removeEventListener('resize', updateCanvas);
    };
  });
</script>

<div class="evidence-board" bind:this={boardElement}>
  <div class="cork-texture"></div>
  <div class="board-title">Evidence Board</div>
  
  {#if $activeClues.length === 0}
    <div class="empty-state">
      No evidence collected yet...
    </div>
  {/if}
  
  {#each $activeClues as clue}
    <div 
      id="clue-{clue.id}"
      class="evidence-note"
      use:interactable={{
        highlight: true,
        onClick: () => handleClueClick(clue)
      }}
      style={Object.entries(getRandomPosition())
        .map(([k, v]) => `${k}: ${v}`).join(';') + `;background-color: ${clue.color || '#fff9e6'};`}
    >
      <div class="pin"></div>
      <h3 class="text-lg font-bold text-burton-charcoal">{clue.title}</h3>
      <p class="text-sm mt-2">{clue.description}</p>
      {#if clue.image}
        <img src={clue.image} alt="" class="mt-2 w-full rounded">
      {/if}
    </div>
  {/each}
</div>

<style>
  .evidence-board {
    @apply w-[80vw] h-[70vh] relative mx-auto my-8 overflow-hidden;
    background: #8B4513;
    border: 12px solid #4a2511;
    box-shadow: 
      inset 0 0 20px rgba(0,0,0,0.5),
      0 0 30px rgba(0,0,0,0.3);
  }

  .board-title {
    @apply absolute top-4 left-1/2 -translate-x-1/2 text-3xl font-bold;
    color: #4a2511;
    text-shadow: 1px 1px 0 #96613d;
    letter-spacing: 2px;
  }

  .empty-state {
    @apply absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2;
    @apply text-2xl text-[#4a2511] opacity-70 font-bold italic;
  }

  .cork-texture {
    @apply absolute inset-0;
    background-image: 
      radial-gradient(#96613d 15%, transparent 16%),
      radial-gradient(#96613d 15%, transparent 16%);
    background-size: 10px 10px;
    background-position: 0 0, 5px 5px;
    opacity: 0.5;
  }

  .evidence-note {
    @apply absolute p-4 rounded-sm;
    box-shadow: 
      2px 2px 5px rgba(0,0,0,0.2),
      0 0 0 1px rgba(0,0,0,0.05);
    max-width: 250px;
    transition: all 0.3s ease;
  }

  .evidence-note:hover {
    transform: scale(1.05) rotate(0deg) !important;
    z-index: 10;
    box-shadow: 
      5px 5px 10px rgba(0,0,0,0.3),
      0 0 0 1px rgba(0,0,0,0.1);
  }

  .pin {
    @apply absolute w-4 h-4 rounded-full;
    background: radial-gradient(circle at 30% 30%, #ff4444, #cc0000);
    box-shadow: 0 1px 2px rgba(0,0,0,0.3);
    top: -8px;
    left: 50%;
    transform: translateX(-50%);
  }

  .pin::after {
    content: '';
    @apply absolute w-2 h-2 rounded-full;
    background: rgba(255,255,255,0.5);
    top: 20%;
    left: 20%;
  }
</style>
