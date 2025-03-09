<script>
  let id = `filter-${Math.random().toString(36).substr(2, 9)}`;
</script>

<svg class="fixed inset-0 pointer-events-none z-20 opacity-80" width="100%" height="100%">
  <defs>
    <filter id={id}>
      <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" result="noise"/>
      <feColorMatrix type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -0.5 1" in="noise" result="colorNoise"/>
      <feComposite operator="in" in2="SourceGraphic"/>
    </filter>
  </defs>
  
  <g filter={`url(#${id})`}>
    <!-- Impact Splatter -->
    <path
      d="M200,150 
         C220,130 240,140 250,120 
         C260,100 280,110 290,90 
         C300,70 310,80 320,60 
         C330,40 350,50 360,30"
      fill="#8B0000"
      transform="rotate(15)"
    />
    
    <!-- Mist Pattern -->
    <g transform="translate(100, 100)">
      {#each Array(20) as _, i}
        <circle 
          cx={Math.random() * 200} 
          cy={Math.random() * 200} 
          r={Math.random() * 3 + 1} 
          fill="#8B0000"
        />
      {/each}
    </g>
    
    <!-- Drip Patterns -->
    <path
      d="M150,50 
         Q148,80 146,100 
         T144,150 
         Q142,180 140,200"
      stroke="#8B0000"
      stroke-width="4"
      fill="none"
    />
    <path
      d="M160,70 
         Q158,90 156,110 
         T154,160"
      stroke="#8B0000"
      stroke-width="3"
      fill="none"
    />
    
    <!-- Cast-off Pattern -->
    <path
      d="M300,100 
         Q350,90 400,85 
         T500,80"
      stroke="#8B0000"
      stroke-width="2"
      fill="none"
    />
    
    <!-- Pool Pattern -->
    <path
      d="M250,300 
         C270,290 290,295 310,290 
         C330,285 350,288 370,285 
         C390,282 410,280 430,282 
         C450,284 470,288 490,290 
         C510,292 530,290 550,295 
         C570,300 590,298 610,305 
         Z"
      fill="#8B0000"
    />
    
    <!-- Satellite Droplets -->
    {#each Array(15) as _, i}
      <circle 
        cx={Math.random() * 600} 
        cy={Math.random() * 400} 
        r={Math.random() * 2 + 0.5} 
        fill="#8B0000"
      />
    {/each}
  </g>
</svg>
