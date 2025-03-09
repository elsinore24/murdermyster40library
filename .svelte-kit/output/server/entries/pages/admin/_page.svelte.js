import { c as create_ssr_component, a as subscribe, b as add_attribute, d as each, e as escape, v as validate_component } from "../../../chunks/ssr.js";
import { a as activeClues } from "../../../chunks/EvidenceBoard.svelte_svelte_type_style_lang.js";
import { s as supabase } from "../../../chunks/supabase.js";
import { s as suspects } from "../../../chunks/suspects.js";
const css = {
  code: ".evidence-board.svelte-1s7drmi{@apply w-[80vw] h-[70vh] relative mx-auto my-8 overflow-hidden;;background:#8B4513;border:12px solid #4a2511;box-shadow:inset 0 0 20px rgba(0,0,0,0.5),\n      0 0 30px rgba(0,0,0,0.3)}.board-title.svelte-1s7drmi{@apply absolute top-4 left-1/2 -translate-x-1/2 text-3xl font-bold;;color:#4a2511;text-shadow:1px 1px 0 #96613d;letter-spacing:2px}.empty-state.svelte-1s7drmi{@apply absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2;;@apply text-2xl text-[#4a2511] opacity-70 font-bold italic;}.cork-texture.svelte-1s7drmi{@apply absolute inset-0;;background-image:radial-gradient(#96613d 15%, transparent 16%),\n      radial-gradient(#96613d 15%, transparent 16%);background-size:10px 10px;background-position:0 0, 5px 5px;opacity:0.5}.evidence-note.svelte-1s7drmi{@apply absolute p-4 rounded-sm;;box-shadow:2px 2px 5px rgba(0,0,0,0.2),\n      0 0 0 1px rgba(0,0,0,0.05);max-width:250px;transition:all 0.3s ease}.evidence-note.svelte-1s7drmi:hover{transform:scale(1.05) rotate(0deg) !important;z-index:10;box-shadow:5px 5px 10px rgba(0,0,0,0.3),\n      0 0 0 1px rgba(0,0,0,0.1)}.pin.svelte-1s7drmi{@apply absolute w-4 h-4 rounded-full;;background:radial-gradient(circle at 30% 30%, #ff4444, #cc0000);box-shadow:0 1px 2px rgba(0,0,0,0.3);top:-8px;left:50%;transform:translateX(-50%)}.pin.svelte-1s7drmi::after{content:'';@apply absolute w-2 h-2 rounded-full;;background:rgba(255,255,255,0.5);top:20%;left:20%}",
  map: `{"version":3,"file":"EvidenceBoard.svelte","sources":["EvidenceBoard.svelte"],"sourcesContent":["<script>\\n  import { activeClues } from '$lib/stores/gameState';\\n  import { onMount } from 'svelte';\\n  import { interactable } from '$lib/actions/interactable';\\n  \\n  function getRandomPosition() {\\n    return {\\n      top: \`\${Math.random() * 60 + 20}%\`,\\n      left: \`\${Math.random() * 60 + 20}%\`,\\n      transform: \`rotate(\${Math.random() * 10 - 5}deg)\`,\\n      '--random': Math.random()\\n    };\\n  }\\n\\n  let boardElement;\\n  let canvas;\\n  let ctx;\\n  \\n  function handleClueClick(clue) {\\n    console.log('Clue clicked:', clue);\\n    // Add your click handling logic here\\n  }\\n  \\n  onMount(() => {\\n    if (!boardElement) return;\\n    \\n    canvas = document.createElement('canvas');\\n    canvas.style.position = 'absolute';\\n    canvas.style.inset = '0';\\n    canvas.style.pointerEvents = 'none';\\n    canvas.style.zIndex = '1';\\n    \\n    ctx = canvas.getContext('2d');\\n    boardElement.appendChild(canvas);\\n    \\n    const updateCanvas = () => {\\n      const rect = boardElement.getBoundingClientRect();\\n      canvas.width = rect.width;\\n      canvas.height = rect.height;\\n      \\n      ctx.clearRect(0, 0, canvas.width, canvas.height);\\n      ctx.strokeStyle = '#ff000055';\\n      ctx.lineWidth = 2;\\n      \\n      $activeClues.forEach(clue => {\\n        if (clue.connections) {\\n          const sourceEl = document.getElementById(\`clue-\${clue.id}\`);\\n          clue.connections.forEach(targetId => {\\n            const targetEl = document.getElementById(\`clue-\${targetId}\`);\\n            if (sourceEl && targetEl) {\\n              const sourceRect = sourceEl.getBoundingClientRect();\\n              const targetRect = targetEl.getBoundingClientRect();\\n              \\n              ctx.beginPath();\\n              ctx.moveTo(\\n                sourceRect.left - rect.left + sourceRect.width / 2,\\n                sourceRect.top - rect.top + sourceRect.height / 2\\n              );\\n              ctx.lineTo(\\n                targetRect.left - rect.left + targetRect.width / 2,\\n                targetRect.top - rect.top + targetRect.height / 2\\n              );\\n              ctx.stroke();\\n            }\\n          });\\n        }\\n      });\\n    };\\n\\n    updateCanvas();\\n    window.addEventListener('resize', updateCanvas);\\n\\n    return () => {\\n      window.removeEventListener('resize', updateCanvas);\\n    };\\n  });\\n<\/script>\\n\\n<div class=\\"evidence-board\\" bind:this={boardElement}>\\n  <div class=\\"cork-texture\\"></div>\\n  <div class=\\"board-title\\">Evidence Board</div>\\n  \\n  {#if $activeClues.length === 0}\\n    <div class=\\"empty-state\\">\\n      No evidence collected yet...\\n    </div>\\n  {/if}\\n  \\n  {#each $activeClues as clue}\\n    <div \\n      id=\\"clue-{clue.id}\\"\\n      class=\\"evidence-note\\"\\n      use:interactable={{\\n        highlight: true,\\n        onClick: () => handleClueClick(clue)\\n      }}\\n      style={Object.entries(getRandomPosition())\\n        .map(([k, v]) => \`\${k}: \${v}\`).join(';') + \`;background-color: \${clue.color || '#fff9e6'};\`}\\n    >\\n      <div class=\\"pin\\"></div>\\n      <h3 class=\\"text-lg font-bold text-burton-charcoal\\">{clue.title}</h3>\\n      <p class=\\"text-sm mt-2\\">{clue.description}</p>\\n      {#if clue.image}\\n        <img src={clue.image} alt=\\"\\" class=\\"mt-2 w-full rounded\\">\\n      {/if}\\n    </div>\\n  {/each}\\n</div>\\n\\n<style>\\n  .evidence-board {\\n    @apply w-[80vw] h-[70vh] relative mx-auto my-8 overflow-hidden;\\n    background: #8B4513;\\n    border: 12px solid #4a2511;\\n    box-shadow: \\n      inset 0 0 20px rgba(0,0,0,0.5),\\n      0 0 30px rgba(0,0,0,0.3);\\n  }\\n\\n  .board-title {\\n    @apply absolute top-4 left-1/2 -translate-x-1/2 text-3xl font-bold;\\n    color: #4a2511;\\n    text-shadow: 1px 1px 0 #96613d;\\n    letter-spacing: 2px;\\n  }\\n\\n  .empty-state {\\n    @apply absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2;\\n    @apply text-2xl text-[#4a2511] opacity-70 font-bold italic;\\n  }\\n\\n  .cork-texture {\\n    @apply absolute inset-0;\\n    background-image: \\n      radial-gradient(#96613d 15%, transparent 16%),\\n      radial-gradient(#96613d 15%, transparent 16%);\\n    background-size: 10px 10px;\\n    background-position: 0 0, 5px 5px;\\n    opacity: 0.5;\\n  }\\n\\n  .evidence-note {\\n    @apply absolute p-4 rounded-sm;\\n    box-shadow: \\n      2px 2px 5px rgba(0,0,0,0.2),\\n      0 0 0 1px rgba(0,0,0,0.05);\\n    max-width: 250px;\\n    transition: all 0.3s ease;\\n  }\\n\\n  .evidence-note:hover {\\n    transform: scale(1.05) rotate(0deg) !important;\\n    z-index: 10;\\n    box-shadow: \\n      5px 5px 10px rgba(0,0,0,0.3),\\n      0 0 0 1px rgba(0,0,0,0.1);\\n  }\\n\\n  .pin {\\n    @apply absolute w-4 h-4 rounded-full;\\n    background: radial-gradient(circle at 30% 30%, #ff4444, #cc0000);\\n    box-shadow: 0 1px 2px rgba(0,0,0,0.3);\\n    top: -8px;\\n    left: 50%;\\n    transform: translateX(-50%);\\n  }\\n\\n  .pin::after {\\n    content: '';\\n    @apply absolute w-2 h-2 rounded-full;\\n    background: rgba(255,255,255,0.5);\\n    top: 20%;\\n    left: 20%;\\n  }\\n</style>\\n"],"names":[],"mappings":"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"}`
};
function getRandomPosition() {
  return {
    top: `${Math.random() * 60 + 20}%`,
    left: `${Math.random() * 60 + 20}%`,
    transform: `rotate(${Math.random() * 10 - 5}deg)`,
    "--random": Math.random()
  };
}
const EvidenceBoard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $activeClues, $$unsubscribe_activeClues;
  $$unsubscribe_activeClues = subscribe(activeClues, (value) => $activeClues = value);
  let boardElement;
  $$result.css.add(css);
  $$unsubscribe_activeClues();
  return `<div class="evidence-board svelte-1s7drmi"${add_attribute("this", boardElement, 0)}><div class="cork-texture svelte-1s7drmi"></div> <div class="board-title svelte-1s7drmi" data-svelte-h="svelte-1dfcksb">Evidence Board</div> ${$activeClues.length === 0 ? `<div class="empty-state svelte-1s7drmi" data-svelte-h="svelte-pic2cr">No evidence collected yet...</div>` : ``} ${each($activeClues, (clue) => {
    return `<div id="${"clue-" + escape(clue.id, true)}" class="evidence-note svelte-1s7drmi"${add_attribute("style", Object.entries(getRandomPosition()).map(([k, v]) => `${k}: ${v}`).join(";") + `;background-color: ${clue.color || "#fff9e6"};`, 0)}><div class="pin svelte-1s7drmi"></div> <h3 class="text-lg font-bold text-burton-charcoal">${escape(clue.title)}</h3> <p class="text-sm mt-2">${escape(clue.description)}</p> ${clue.image ? `<img${add_attribute("src", clue.image, 0)} alt="" class="mt-2 w-full rounded">` : ``} </div>`;
  })} </div>`;
});
async function listSuspectImages(suspectId) {
  if (!suspectId) {
    throw new Error("Suspect ID is required");
  }
  try {
    const { data, error } = await supabase.storage.from("suspects").list(suspectId);
    if (error) {
      throw error;
    }
    return data || [];
  } catch (error) {
    console.error("List operation error:", error);
    throw error;
  }
}
const ImageUploadTest = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let selectedSuspect = suspects[0];
  let imageList = [];
  async function loadImages() {
    try {
      imageList = await listSuspectImages(selectedSuspect.id);
    } catch (error) {
      console.error("Failed to load images:", error);
    }
  }
  {
    if (selectedSuspect) {
      loadImages();
    }
  }
  return `<div class="p-4"><h2 class="text-xl font-bold mb-4" data-svelte-h="svelte-k6764w">Image Upload Test</h2> <div class="mb-4"><select class="border p-2 rounded">${each(suspects, (suspect) => {
    return `<option${add_attribute("value", suspect, 0)}>${escape(suspect.name)}</option>`;
  })}</select></div> <div class="mb-4"><input type="file" accept="image/jpeg" class="mb-2"> <button ${"disabled"} class="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50">Upload</button></div> ${``} ${``} <div><h3 class="font-bold mb-2" data-svelte-h="svelte-wp9fep">Existing Images:</h3> <div class="grid grid-cols-3 gap-4">${each(imageList, (file) => {
    return `<div class="border p-2"><p class="text-sm mb-2">${escape(file.name)}</p> <button class="bg-red-500 text-white px-2 py-1 rounded text-sm" data-svelte-h="svelte-823kwe">Delete</button> </div>`;
  })}</div></div></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="admin-container p-4"><h1 class="text-3xl mb-8 burton-text-shadow" data-svelte-h="svelte-btb260">Admin Dashboard</h1> <div class="grid gap-8">${validate_component(EvidenceBoard, "EvidenceBoard").$$render($$result, {}, {}, {})} ${validate_component(ImageUploadTest, "ImageUploadTest").$$render($$result, {}, {}, {})}</div></div>`;
});
export {
  Page as default
};
//# sourceMappingURL=_page.svelte.js.map
