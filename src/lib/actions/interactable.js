export function interactable(node, options = {}) {
  let isHovered = false;
  
  function handleMouseEnter() {
    isHovered = true;
    node.style.cursor = 'pointer';
    if (options.highlight) {
      node.style.filter = 'brightness(1.2)';
    }
  }
  
  function handleMouseLeave() {
    isHovered = false;
    node.style.cursor = 'default';
    if (options.highlight) {
      node.style.filter = 'none';
    }
  }
  
  function handleClick(event) {
    if (options.onClick) {
      options.onClick(event);
    }
  }
  
  node.addEventListener('mouseenter', handleMouseEnter);
  node.addEventListener('mouseleave', handleMouseLeave);
  node.addEventListener('click', handleClick);
  
  return {
    destroy() {
      node.removeEventListener('mouseenter', handleMouseEnter);
      node.removeEventListener('mouseleave', handleMouseLeave);
      node.removeEventListener('click', handleClick);
    }
  };
}
