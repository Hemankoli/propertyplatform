
const url = process.env.REACT_APP_CLOUDINARY_URL;

export default async function UploadImage(image) {
  const formData = new FormData();
  formData.append('file', image); 
  formData.append('upload_preset', 'property-platform');
  const response = await fetch(url, {
    method: 'POST',
    body: formData
  });

  return response.json(); 
}