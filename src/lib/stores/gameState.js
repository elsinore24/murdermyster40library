import { writable, derived, get } from 'svelte/store';
import { browser } from '$app/environment';
import { supabase } from '$lib/supabase';

// Initialize with empty defaults for SSR
export const inventory = writable([]);
export const activeClues = writable([]);
export const currentScene = writable('entrance');
export const dialogueState = writable(null);
export const gameFlags = writable({});
export const playerState = writable({
  position: { x: 0, y: 0 },
  hasFlashlight: false,
  currentRoom: 'entrance'
});

// Initialize data only on client side
if (browser) {
  activeClues.set([
    {
      id: 1,
      title: "Mysterious Note",
      description: "Found in the study. Handwriting appears shaky.",
      type: "note",
      color: "#ffd700"
    },
    {
      id: 2,
      title: "Broken Watch",
      description: "Stopped at exactly 10:47 PM. Found near the body.",
      type: "evidence",
      color: "#ff9999",
      connections: [1, 3]
    },
    {
      id: 3,
      title: "Strange Symbol",
      description: "Carved into the mansion's front door. Matches victim's pendant.",
      type: "clue",
      color: "#98fb98",
      connections: [2]
    }
  ]);
}

export const saveGameState = async () => {
  if (!browser) return false;
  
  const { data, error } = await supabase
    .from('game_states')
    .upsert({
      inventory: get(inventory),
      active_clues: get(activeClues),
      current_scene: get(currentScene),
      game_flags: get(gameFlags)
    });
  
  if (error) console.error('Save error:', error);
  return !error;
};
