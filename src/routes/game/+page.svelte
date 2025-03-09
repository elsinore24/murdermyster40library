<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { userName } from '$lib/stores/userStore';
  import { inventory, activeClues, currentScene, playerState } from '$lib/stores/gameState';
  import Inventory from '$lib/components/Inventory.svelte';
  import DialogueSystem from '$lib/components/DialogueSystem.svelte';
  import EvidenceBoard from '$lib/components/EvidenceBoard.svelte';
  import Map from '$lib/components/Map.svelte';
  import AccusationForm from '$lib/components/AccusationForm.svelte';
  import { goto } from '$app/navigation';

  let isInventoryOpen = false;
  let isEvidenceBoardOpen = false;
  let isMapOpen = false;

  onMount(async () => {
    if (!browser) return;

    const { ambientSystem } = await import('$lib/audio/ambientSystem');
    if (!ambientSystem) return;

    try {
      await ambientSystem.init();
    } catch (e) {
      console.warn('Audio initialization skipped:', e);
    }
  });
</script>

<div class="game-container">
  <div class="spotlight"></div>
  <div class="chair-shadow"></div>

  <div class="scene-container">
    <div class="table">
      <div class="welcome-message">
        <span class="player-name">{$userName}</span>, please take a seat.
      </div>
    </div>
  </div>
  
  <div class="controls">
    <button 
      class="burton-button"
      on:click={() => goto('/mansion')}
    >
      Back to Suspects
    </button>
    <button 
      class="burton-button"
      on:click={() => isMapOpen = true}
    >
      View Manor Map
    </button>
    <button 
      class="burton-button"
      on:click={() => isEvidenceBoardOpen = true}
    >
      Open Evidence Board
    </button>
  </div>

  {#if isMapOpen}
    <div 
      class="modal"
      on:click|self={() => isMapOpen = false}
      role="dialog"
      aria-modal="true"
    >
      <div class="modal-content">
        <button 
          class="close-btn"
          on:click={() => isMapOpen = false}
        >
          ✕
        </button>
        <Map />
      </div>
    </div>
  {/if}

  {#if isEvidenceBoardOpen}
    <div 
      class="modal"
      on:click|self={() => isEvidenceBoardOpen = false}
      role="dialog"
      aria-modal="true"
    >
      <div class="modal-content">
        <button 
          class="close-btn"
          on:click={() => isEvidenceBoardOpen = false}
        >
          ✕
        </button>
        <EvidenceBoard />
      </div>
    </div>
  {/if}
  
  <Inventory show={true} bind:isOpen={isInventoryOpen} />
  <DialogueSystem />
  <AccusationForm />
</div>

<style>
  .game-container {
    background: #1a1a1a;
    color: #e0e0e0;
    position: relative;
    overflow: hidden;
    height: 100vh;
  }

  .spotlight {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 300px;
    height: 300px;
    transform: translate(-50%, -50%);
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.15) 0%,
      rgba(0, 0, 0, 0.8) 70%
    );
    border-radius: 50%;
    box-shadow: 0 0 50px 30px rgba(255, 255, 255, 0.05);
    pointer-events: none;
    z-index: 0;
    animation: flicker 4s infinite;
  }

  .chair-shadow {
    width: 150px;
    height: 50px;
    background: rgba(0, 0, 0, 0.7);
    border-radius: 50%;
    position: absolute;
    bottom: 20%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 0;
  }

  .scene-container {
    position: relative;
    z-index: 1;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .table {
    width: 80%;
    max-width: 600px;
    height: 300px;
    background: #2a2a2a;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8);
    border: 2px solid #444;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .welcome-message {
    font-size: 1.5rem;
    font-weight: bold;
    color: #fff;
    text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
  }

  .player-name {
    color: #ffd700;
    font-weight: bold;
  }

  .controls {
    position: fixed;
    top: 1rem;
    right: 1rem;
    display: flex;
    gap: 1rem;
    z-index: 40;
    flex-wrap: wrap; /* Allow buttons to wrap on smaller screens */
    justify-content: center;
  }

  .burton-button {
    background: #6c63ff;
    color: white;
    padding: 0.5rem 1rem; /* Default button padding */
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem; /* Default button font size */
    font-weight: bold;
    transition: background-color 0.3s ease, transform 0.2s ease;
    text-align: center;
  }

  .burton-button:hover {
    background: #5846d6;
    transform: scale(1.05);
  }

  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 50;
  }

  .modal-content {
    position: relative;
    width: 95%;
    height: 90%;
    background: #1a1a1a;
    border-radius: 8px;
    padding: 2rem;
  }

  .close-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: #444;
    color: #fff;
    border: none;
    border-radius: 50%;
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.3s ease;
    z-index: 60;
  }

  .close-btn:hover {
    background: #ffd700;
    color: #1a1a1a;
  }

  @keyframes flicker {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.85; }
    75% { opacity: 0.95; }
  }

  /* Responsive Button Sizing */
  @media (max-width: 768px) {
    .burton-button {
      font-size: 0.8rem; /* Smaller font size */
      padding: 0.4rem 0.8rem; /* Smaller padding */
    }

    .controls {
      gap: 0.5rem; /* Reduce gap between buttons */
    }
  }

  @media (max-width: 480px) {
    .burton-button {
      font-size: 0.7rem; /* Even smaller font size for very small screens */
      padding: 0.3rem 0.6rem; /* Reduce padding further */
      width: 100%; /* Make buttons stack */
    }

    .controls {
      flex-direction: column; /* Stack buttons vertically */
      align-items: center;
    }
  }
</style>
