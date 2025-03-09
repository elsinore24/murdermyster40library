<script>
  import { suspects } from '$lib/data/suspects';
  import { rooms } from '$lib/data/mansionData';

  const weapons = [
    "Candlestick",
    "Dagger",
    "Lead Pipe",
    "Revolver",
    "Rope",
    "Wrench"
  ];

  // Form state
  let selectedSuspect = "";
  let selectedWeapon = "";
  let selectedLocation = "";
  let isVisible = false;

  // Handle form submission
  const submitAccusation = () => {
    if (selectedSuspect && selectedWeapon && selectedLocation) {
      alert(
        `You accused ${selectedSuspect} with the ${selectedWeapon} in the ${selectedLocation}!`
      );
      selectedSuspect = "";
      selectedWeapon = "";
      selectedLocation = "";
      isVisible = false;
    } else {
      alert("Please fill out all fields to make an accusation.");
    }
  };
</script>

<div class="container">
  <div class="tab" on:click={() => (isVisible = !isVisible)}>
    <span>{isVisible ? "Close Accusation Form" : "Make an Accusation"}</span>
  </div>

  {#if isVisible}
    <div class="form">
      <h2 class="form-title">Make Your Accusation</h2>

      <label for="killer">Suspect:</label>
      <select bind:value={selectedSuspect} id="killer">
        <option value="" disabled selected>Select a suspect</option>
        {#each suspects as suspect}
          <option value={suspect.name}>{suspect.name}</option>
        {/each}
      </select>

      <label for="weapon">Weapon:</label>
      <select bind:value={selectedWeapon} id="weapon">
        <option value="" disabled selected>Select a weapon</option>
        {#each weapons as weapon}
          <option value={weapon}>{weapon}</option>
        {/each}
      </select>

      <label for="location">Location:</label>
      <select bind:value={selectedLocation} id="location">
        <option value="" disabled selected>Select a location</option>
        {#each rooms as room}
          <option value={room.name}>{room.name}</option>
        {/each}
      </select>

      <button class="submit-button" on:click={submitAccusation}>Submit Accusation</button>
    </div>
  {/if}
</div>

<style>
  .container {
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
    max-width: 500px;
    z-index: 100;
  }

  .tab {
    background-color: #2a2a2a;
    color: #ffd700;
    padding: 10px 20px;
    text-align: center;
    cursor: pointer;
    border-radius: 8px 8px 0 0;
    box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.4);
    border: 1px solid #444;
    border-bottom: none;
  }

  .tab:hover {
    background-color: #333;
  }

  .form {
    background-color: #2a2a2a;
    padding: 20px;
    border: 1px solid #444;
    border-radius: 0 0 8px 8px;
    box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.4);
  }

  .form-title {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #ffd700;
    text-align: center;
  }

  label {
    display: block;
    margin-top: 1rem;
    font-weight: bold;
    color: #e0e0e0;
  }

  select {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    border: 1px solid #444;
    border-radius: 5px;
    background-color: #1a1a1a;
    font-size: 1rem;
    color: #e0e0e0;
  }

  select:focus {
    border-color: #ffd700;
    outline: none;
  }

  .submit-button {
    display: block;
    width: 100%;
    margin-top: 1.5rem;
    padding: 10px;
    background-color: #ffd700;
    color: #1a1a1a;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
  }

  .submit-button:hover {
    background-color: #ffed4a;
  }
</style>
