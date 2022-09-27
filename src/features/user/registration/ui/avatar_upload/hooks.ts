import React from 'react';
import { processRequest } from 'shared/api/lib';
import { AvatarUrlDispatch } from './interface';

const cloudName = 'deckxrkbj';
export const uploadPreset = 'rsschool';
export const apiUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

interface uploadResponseData {
  secure_url: string;
}

export interface AvatarUploadError {
  error: {
    message: string;
  }
}

export const useAvatarUpload = (
  setAvatarUrl: AvatarUrlDispatch
): [typeof setFile, boolean] => {
  const [ file, setFile ] = React.useState<File | null>(null);
  const [ loading, setLoading ] = React.useState(false);

  React.useEffect(() => {
    if (file === null) return;
    setLoading(true);
    const formData = new FormData();
    
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);
    
    processRequest<uploadResponseData>(apiUrl, {
      method: 'POST',
      body: formData,
    })
      .then((data: uploadResponseData) => setAvatarUrl(data.secure_url))
      .catch((error: Error) => setAvatarUrl(error))
      .finally(() => setLoading(false))

  }, [file, setAvatarUrl]);

  return [
    setFile,
    loading
  ]
}