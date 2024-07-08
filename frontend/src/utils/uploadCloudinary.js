// utils/uploadCloudinary.js

async function uploadImageToCloudinary(file) {
  const cloudName = import.meta.env.VITE_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_PRESET_NAME;

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);
  formData.append('cloudName', cloudName);

  // Debug: Log form data
  for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
  }

  try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
          method: 'POST',
          body: formData,
      });

      if (!response.ok) {
          const errorData = await response.json();
          console.error('Error response:', errorData);
          throw new Error(`Failed to upload image: ${errorData.error.message}`);
      }

      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Error uploading image:', error);
      return null;
  }
}

export default uploadImageToCloudinary;
