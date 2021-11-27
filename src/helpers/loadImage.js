export const loadImage = async (file) => {
  const baseUrl = 'https://api.cloudinary.com/v1_1/umss/upload';

  const formData = new FormData();
  formData.append('upload_preset', 'react-journal');
  formData.append('file', file);

  try {
    const resp = await fetch(baseUrl, {
      method: 'POST',
      body: formData,
    });

    if (resp.ok) {
      const url = await resp.json();
      return url.secure_url;
    } else {
      throw await resp.json();
    }
  } catch (error) {
    throw error;
  }
};
