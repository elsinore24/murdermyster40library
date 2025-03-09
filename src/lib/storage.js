import { supabase } from './supabase';

export async function uploadMapImage(file) {
  try {
    console.log('Starting Supabase upload:', {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type
    });

    const fileExt = file.name.split('.').pop();
    const fileName = `mansion-map.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from('suspects')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (error) {
      console.error('Supabase upload error:', error);
      throw error;
    }

    console.log('Supabase upload successful:', data);
    return data;
  } catch (error) {
    console.error('uploadMapImage error:', error);
    throw error;
  }
}

export async function getMapImageUrl() {
  try {
    const { data, error } = await supabase.storage
      .from('suspects')
      .getPublicUrl('mansion-map.jpeg');
      
    if (error) {
      console.error('getMapImageUrl error:', error);
      throw error;
    }

    console.log('Got map URL:', data.publicUrl);
    return data.publicUrl;
  } catch (error) {
    console.error('getMapImageUrl error:', error);
    throw error;
  }
}

export async function getImageUrl(imagePath) {
  try {
    const { data } = await supabase
      .storage
      .from('suspects')
      .getPublicUrl(imagePath)

    if (!data || !data.publicUrl) {
      throw new Error(`Failed to get public URL for ${imagePath}`);
    }

    console.log(`Got image URL for ${imagePath}:`, data.publicUrl);
    return data.publicUrl;
  } catch (error) {
    console.error(`getImageUrl error for ${imagePath}:`, error);
    throw error;
  }
}

export async function listSuspectImages(suspectId) {
  try {
    const { data, error } = await supabase.storage
      .from('suspects')
      .list(`${suspectId}/`);

    if (error) {
      console.error('listSuspectImages error:', error);
      throw error;
    }

    console.log(`Listed images for suspect ${suspectId}:`, data);
    return data;
  } catch (error) {
    console.error(`listSuspectImages error for suspect ${suspectId}:`, error);
    throw error;
  }
}

export async function deleteImage(imagePath) {
  try {
    const { data, error } = await supabase.storage
      .from('suspects')
      .remove([imagePath]);

    if (error) {
      console.error('deleteImage error:', error);
      throw error;
    }

    console.log(`Deleted image at ${imagePath}:`, data);
    return data;
  } catch (error) {
    console.error(`deleteImage error for ${imagePath}:`, error);
    throw error;
  }
}

export async function uploadImage(file, suspectId, fileName) {
  try {
    console.log('Starting Supabase upload:', {
      suspectId,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type
    });

    const { data, error } = await supabase.storage
      .from('suspects')
      .upload(`${suspectId}/${fileName}`, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (error) {
      console.error('Supabase upload error:', error);
      throw error;
    }

    console.log('Supabase upload successful:', data);
    return data;
  } catch (error) {
    console.error('uploadImage error:', error);
    throw error;
  }
}
