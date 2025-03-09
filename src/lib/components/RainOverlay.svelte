<script>
  import { onMount } from 'svelte';

  let canvas;
  let ctx;
  let raindrops = [];
  let animationId;
  
  const createRaindrop = () => ({
    x: Math.random() * (canvas ? canvas.width : window.innerWidth),
    y: -20,
    speed: 15 + Math.random() * 10,
    length: 20 + Math.random() * 10
  });

  const animate = () => {
    if (!ctx || !canvas) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'rgba(174, 194, 224, 0.5)';
    ctx.lineWidth = 1;

    raindrops.forEach((drop, index) => {
      ctx.beginPath();
      ctx.moveTo(drop.x, drop.y);
      ctx.lineTo(drop.x + 0.5, drop.y + drop.length);
      ctx.stroke();

      drop.y += drop.speed;

      if (drop.y > canvas.height) {
        raindrops[index] = createRaindrop();
      }
    });

    animationId = requestAnimationFrame(animate);
  };

  const initializeCanvas = () => {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx = canvas.getContext('2d');

    raindrops = Array(100).fill().map(() => createRaindrop());

    animate();
  };

  onMount(() => {
    initializeCanvas();

    const resizeHandler = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      raindrops = [];
    };
  });
</script>

<canvas
  bind:this={canvas}
  class="fixed inset-0 pointer-events-none z-10"
></canvas>
