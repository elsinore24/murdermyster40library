<script>
  import { uploadImage, getImageUrl, listSuspectImages, deleteImage } from '$lib/storage';
  import { suspects } from '$lib/data/suspects';
  
  let selectedFile;
  let selectedSuspect = suspects[0];
  let uploadStatus = '';
  let imageList = [];
  let uploadedImageUrl = '';

  async function handleFileSelect(event) {
    selectedFile = event.target.files[0];
  }

  async function handleUpload() {
    try {
      uploadStatus = 'Uploading...';
      const fileExt = selectedFile.name.split('.').pop().toLowerCase();
      const fileName = `profile.${fileExt}`; // Always use profile.jpg or profile.jpeg
      
      // Delete existing profile images first
      const existingImages = await listSuspectImages(selectedSuspect.id);
      for (const file of existingImages) {
        if (file.name.startsWith('profile.')) {
          await deleteImage(`${selectedSuspect.id}/${file.name}`);
        }
      }
      
      await uploadImage(selectedFile, selectedSuspect.id, fileName);
      uploadStatus = 'Upload successful!';
      
      // Get the URL of the uploaded image
      const path = `${selectedSuspect.id}/${fileName}`;
      uploadedImageUrl = await getImageUrl(path);
      
      // Refresh the image list
      await loadImages();
    } catch (error) {
      uploadStatus = `Upload failed: ${error.message}`;
      console.error('Upload error:', error);
    }
  }

  async function loadImages() {
    try {
      imageList = await listSuspectImages(selectedSuspect.id);
    } catch (error) {
      console.error('Failed to load images:', error);
    }
  }

  async function handleDelete(fileName) {
    try {
      const path = `${selectedSuspect.id}/${fileName}`;
      await deleteImage(path);
      await loadImages();
    } catch (error) {
      console.error('Delete failed:', error);
    }
  }

  $: if (selectedSuspect) {
    loadImages();
  }
</script>

<div class="p-4">
  <h2 class="text-xl font-bold mb-4">Image Upload Test</h2>
  
  <div class="mb-4">
    <select 
      bind:value={selectedSuspect}
      class="border p-2 rounded">
      {#each suspects as suspect}
        <option value={suspect}>{suspect.name}</option>
      {/each}
    </select>
  </div>

  <div class="mb-4">
    <input 
      type="file" 
      accept="image/jpeg"
      on:change={handleFileSelect}
      class="mb-2">
    
    <button 
      on:click={handleUpload}
      disabled={!selectedFile}
      class="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50">
      Upload
    </button>
  </div>

  {#if uploadStatus}
    <p class="mb-4">{uploadStatus}</p>
  {/if}

  {#if uploadedImageUrl}
    <div class="mb-4">
      <h3 class="font-bold">Last Uploaded Image:</h3>
      <img src={uploadedImageUrl} alt="Uploaded" class="max-w-xs mt-2">
    </div>
  {/if}

  <div>
    <h3 class="font-bold mb-2">Existing Images:</h3>
    <div class="grid grid-cols-3 gap-4">
      {#each imageList as file}
        <div class="border p-2">
          <p class="text-sm mb-2">{file.name}</p>
          <button
            on:click={() => handleDelete(file.name)}
            class="bg-red-500 text-white px-2 py-1 rounded text-sm">
            Delete
          </button>
        </div>
      {/each}
    </div>
  </div>
</div>
