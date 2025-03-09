export function validateGameAction(action, state) {
  const validators = {
    pickupItem: (payload) => {
      if (!payload.itemId) return false;
      if (state.inventory.length >= 10) return false;
      return true;
    },
    
    useItem: (payload) => {
      if (!payload.itemId || !payload.targetId) return false;
      const hasItem = state.inventory.some(item => item.id === payload.itemId);
      return hasItem;
    },
    
    moveToScene: (payload) => {
      if (!payload.sceneId) return false;
      const connectedScenes = state.scenes[state.currentScene].connections;
      return connectedScenes.includes(payload.sceneId);
    }
  };
  
  return validators[action.type]?.(action.payload) ?? false;
}
