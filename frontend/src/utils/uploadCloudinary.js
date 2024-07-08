const cloud_name = import.meta.env.VITE_CLOUD_NAME;
const upload_preset = import.meta.env.VITE_PRESET_NAME;
import axios from 'axios';

const uploadImageToCloudinary = async (file) => {
  const url = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', upload_preset);

  try {
    const response = await axios.post(url, formData);
    return response.data;
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    throw error;
  }
};

export default uploadImageToCloudinary;

