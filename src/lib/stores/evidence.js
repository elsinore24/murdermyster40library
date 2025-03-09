import { writable } from 'svelte/store';
import { supabase } from '$lib/supabase';
import { browser } from '$app/environment';

export const evidence = writable([]);

let unsubscribe;

export async function fetchEvidence() {
  if (!supabase) {
    console.error('Supabase client not initialized.');
    return [];
  }
  try {
    const { data, error } = await supabase
      .from('evidence')
      .select('*');

    if (error) {
      console.error('Error fetching evidence:', error);
      return [];
    }

    return data || [];
  } catch (e) {
    console.error("Error in fetchEvidence", e);
    return [];
  }
}

export async function loadEvidence() {
  if (!browser) return;

  console.log('Initializing evidence loading...');

  // Wait for Supabase client to initialize
  if (!supabase) {
    console.error('Supabase client not initialized.');
    return;
  }

  try {
    const data = await fetchEvidence();
    evidence.set(data);

    // Prevent duplicate subscriptions
    if (unsubscribe) {
      await supabase.removeSubscription(unsubscribe);
    }

    // Set up real-time subscription
    unsubscribe = supabase
      .from('evidence')
      .on('INSERT', (payload) => {
        console.log('Realtime update received - INSERT:', payload);
        refreshEvidence();
      })
      .on('UPDATE', (payload) => {
        console.log('Realtime update received - UPDATE:', payload.new);
        evidence.update((current) =>
          current.map((item) =>
            item.id === payload.new.id ? { ...item, ...payload.new } : item
          )
        );
      })
      .on('DELETE', (payload) => {
        console.log('Realtime update received - DELETE:', payload.old);
        evidence.update((current) =>
          current.filter((item) => item.id !== payload.old.id)
        );
      })
      .subscribe();

    console.log('Subscription created successfully:', unsubscribe);
  } catch (err) {
    console.error('Unexpected error in loadEvidence:', err);
    console.error("Full error object:", err); // Log the full error object
  }
}

export async function refreshEvidence() {
  const data = await fetchEvidence();
  evidence.set(data);
}

export async function addEvidence(newClue) {
  if (!supabase) {
    console.error('Supabase client not initialized.');
    return false;
  }
  const { data, error } = await supabase
    .from('evidence')
    .insert([newClue]);

  if (error) {
    console.error('Error adding evidence:', error);
    return false;
  }

  return true;
}

export async function updateEvidence(id, updatedFields) {
  if (!supabase) {
    console.error('Supabase client not initialized.');
    return false;
  }
  const { data, error } = await supabase
    .from('evidence')
    .update(updatedFields)
    .eq('id', id);

  if (error) {
    console.error('Error updating evidence:', error);
    return false;
  }

  return true;
}

export function cleanup() {
  if (unsubscribe) {
    supabase.removeSubscription(unsubscribe);
  }
}

// Log initial evidence and any updates
evidence.subscribe((value) => {
  console.log('Evidence Store Updated:', value);
});
