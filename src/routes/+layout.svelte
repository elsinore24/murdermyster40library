<script>
  import "../app.css";
  import { goto } from '$app/navigation';
  import { fade } from 'svelte/transition';
  import { loadEvidence } from '$lib/stores/evidence';
  import { onMount } from 'svelte';

  let showConfirmation = false;

  onMount(() => {
    loadEvidence();
  });

  // Show the confirmation modal
  function startNewInvestigation() {
    showConfirmation = true;
    console.log("startNewInvestigation called, showConfirmation:", showConfirmation);
  }

  // Confirm restarting the game
  function confirmStartOver() {
    try {
      console.log("Confirming start over...");
      localStorage.clear(); // Clear saved progress
      showConfirmation = false; // Hide the modal
      console.log("localStorage cleared.");
      goto('/'); // Navigate to the home page
    } catch (error) {
      console.error("Error during confirmStartOver:", error);
    }
  }

  // Cancel and close the modal
  function cancelStartOver() {
    showConfirmation = false;
    console.log("cancelStartOver called, showConfirmation:", showConfirmation);
  }
</script>

<!-- Button to Start New Investigation -->
<div class="flex justify-start mt-4">
  <button
    class="burton-button"
    on:click={startNewInvestigation}
    aria-label="Start New Investigation"
  >
    Start New Investigation
  </button>
</div>

<!-- Confirmation Modal -->
{#if showConfirmation}
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    role="dialog"
    aria-labelledby="confirmation-title"
    aria-describedby="confirmation-desc"
    transition:fade
  >
    <div class="bg-white p-4 rounded-md text-black">
      <p id="confirmation-title" class="text-lg font-bold">
        Starting over will erase all current progress. Are you sure?
      </p>
      <div class="flex justify-around mt-4">
        <!-- Confirm Button -->
        <button
          class="burton-button bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          on:click={confirmStartOver}
          aria-label="Yes, Start Over"
        >
          Yes, Start Over
        </button>
        <!-- Cancel Button -->
        <button
          class="burton-button bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
          on:click={cancelStartOver}
          aria-label="Cancel"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
{/if}

<slot />
