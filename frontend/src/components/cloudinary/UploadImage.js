
const url = `https://api.cloudinary.com/v1_1/dsj8izwdl/image/upload`;

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