<script>
  import { onMount } from 'svelte';
  import { rooms } from '$lib/data/mansionData';
  import { fade, fly } from 'svelte/transition';
  import { getMapImageUrl } from '$lib/storage';

  let selectedRoom = null;
  let hoveredRoom = null;
  let mapElement;
  let connections = [];
  let publicUrl = '';
  let isMobile = false;

  // Detect screen size
  onMount(() => {
    const checkMobile = () => (isMobile = window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    fetchPublicUrl();
    return () => window.removeEventListener('resize', checkMobile);
  });

  async function fetchPublicUrl() {
    try {
      publicUrl = await getMapImageUrl();
    } catch (error) {
      console.error('Error fetching public URL:', error);
    }
  }

  function selectRoom(room) {
    selectedRoom = room;
    updateConnections();
  }

  function handleHover(room) {
    hoveredRoom = room;
    updateConnections();
  }

  function updateConnections() {
    const activeRoom = hoveredRoom || selectedRoom;
    if (!activeRoom || !mapElement) {
      connections = [];
      return;
    }

    connections = (activeRoom.connections || []).map((connectedId) => {
      const connectedRoom = rooms.find((r) => r.id === connectedId);
      if (!connectedRoom) return null;

      const rect = mapElement.getBoundingClientRect();
      const startX =
        parseFloat(isMobile ? activeRoom.mobileX : activeRoom.x) / 100 * rect.width;
      const startY =
        parseFloat(isMobile ? activeRoom.mobileY : activeRoom.y) / 100 * rect.height;
      const endX =
        parseFloat(isMobile ? connectedRoom.mobileX : connectedRoom.x) / 100 * rect.width;
      const endY =
        parseFloat(isMobile ? connectedRoom.mobileY : connectedRoom.y) / 100 * rect.height;

      return {
        id: `${activeRoom.id}-${connectedId}`,
        path: `M ${startX} ${startY} L ${endX} ${endY}`
      };
    }).filter(Boolean);
  }
</script>

<div class="map-container">
  <div class="map" bind:this={mapElement}>
    <img
      src={publicUrl || '/fallback-image.jpg'}
      alt="Mansion Map"
      class="map-image"
      on:error={(e) => {
        console.error('Image failed to load:', e);
        e.target.src = '/fallback-image.jpg';
      }}
    />

    <svg class="mansion-outline" viewBox="0 0 100 100" preserveAspectRatio="none">
      {#each connections as connection}
        <path
          d={connection.path}
          class="connection-line"
          in:fade={{ duration: 200 }}
        />
      {/each}
    </svg>

    {#each rooms as room}
      <div
        class="room-marker"
        class:active={selectedRoom?.id === room.id}
        class:connected={hoveredRoom?.connections?.includes(room.id) || 
                        selectedRoom?.connections?.includes(room.id)}
        style="
          left: {isMobile ? room.mobileX : room.x};
          top: {isMobile ? room.mobileY : room.y};
        "
        on:click={() => selectRoom(room)}
        on:mouseenter={() => handleHover(room)}
        on:mouseleave={() => handleHover(null)}
        role="button"
        tabindex="0"
      >
        <span class="room-name">{room.name}</span>
      </div>
    {/each}
  </div>

  {#if selectedRoom}
    <div
      class="room-details"
      transition:fly={{ y: 50, duration: 300 }}
    >
      <h2>{selectedRoom.name}</h2>
      <p>{selectedRoom.description}</p>
      <div class="buttons-container">
        {#if selectedRoom.name === "Library"}
          <a href="/library/library" class="explore-btn">
            Explore
          </a>
        {/if}
        <button
          class="close-btn"
          on:click={() => selectRoom(null)}
        >
          Close
        </button>
      </div>
    </div>
  {/if}
</div>

<style>
  .map-container {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
  }

  .map {
    position: relative;
    width: 90%;
    max-width: 56rem;
    aspect-ratio: 4/3;
    border-radius: 0.5rem;
    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1);
  }

  .map-image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.5rem;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  }

  .mansion-outline {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  .connection-line {
    stroke: var(--burton-amber);
    stroke-width: 2;
    opacity: 0.5;
    fill: none;
    stroke-dasharray: 4 4;
  }

  .room-marker {
    position: absolute;
    transform: translate(-50%, -50%);
    width: 1.5rem;
    height: 1.5rem;
    background-color: var(--burton-purple);
    border-radius: 9999px;
    border: 2px solid var(--burton-white);
    cursor: pointer;
    transition: all 300ms ease-in-out;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }

  .room-marker:hover,
  .room-marker.active {
    background-color: var(--burton-amber);
    transform: translate(-50%, -50%) scale(1.25);
    box-shadow: 0 0 20px var(--burton-amber);
  }

  .room-marker.connected {
    background-color: var(--burton-blue);
    transform: translate(-50%, -50%) scale(1.1);
    box-shadow: 0 0 15px var(--burton-blue);
  }

  .room-name {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 0.5rem;
    font-size: 0.875rem;
    color: var(--burton-white);
    white-space: nowrap;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    opacity: 0;
    transition: opacity 200ms ease-in-out;
  }

  .room-marker:hover .room-name,
  .room-marker.active .room-name {
    opacity: 1;
  }

  .room-details {
    position: fixed;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
    max-width: 32rem;
    background-color: var(--burton-charcoal);
    border-radius: 0.5rem;
    padding: 1.5rem;
    text-align: center;
    border: 2px solid var(--burton-purple);
    box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  }

  .room-details h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--burton-amber);
    margin-bottom: 1rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }

  .room-details p {
    color: var(--burton-white);
    margin-bottom: 1.5rem;
    line-height: 1.625;
  }

  /* New container for buttons */
  .buttons-container {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }

  .close-btn {
    background-color: var(--burton-purple);
    color: var(--burton-white);
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    transition: background-color 300ms;
  }

  .close-btn:hover {
    background-color: var(--burton-blue);
  }

  /* New explore button styles */
  .explore-btn {
    background-color: var(--burton-amber);
    color: var(--burton-charcoal);
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    font-weight: 600;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
    transition: background-color 300ms, transform 200ms;
    display: inline-block;
    text-decoration: none;
  }

  .explore-btn:hover {
    background-color: var(--burton-gold);
    transform: translateY(-2px);
  }

  @media (max-width: 640px) {
    .room-details {
      bottom: 1rem;
      padding: 1rem;
    }

    .room-details h2 {
      font-size: 1.25rem;
      margin-bottom: 0.5rem;
    }

    .room-details p {
      font-size: 0.875rem;
      margin-bottom: 1rem;
    }
    
    .buttons-container {
      gap: 0.5rem;
    }
    
    .explore-btn, .close-btn {
      padding: 0.4rem 0.8rem;
      font-size: 0.9rem;
    }
  }
</style>
