<script>
  import EvidenceBoard from '$lib/components/EvidenceBoard.svelte';
  import ImageUploadTest from './ImageUploadTest.svelte';
  import StaticImageUpload from './StaticImageUpload.svelte';
</script>

<div class="admin-container p-4">
  <h1 class="text-3xl mb-8 burton-text-shadow">Admin Dashboard</h1>
  
  <div class="grid gap-8">
    <StaticImageUpload />
    <EvidenceBoard />
    <ImageUploadTest />
  </div>
</div>
