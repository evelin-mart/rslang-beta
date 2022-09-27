import React, { useRef } from 'react';
import { Avatar, Box, CircularProgress, Fab } from '@mui/material';
import {
  Person as PersonIcon,
  AddAPhoto as AddAPhotoIcon
} from '@mui/icons-material';
import { useAvatarUpload } from './hooks';
import { AvatarUrl, AvatarUrlDispatch } from './interface';
export * from './interface';

interface AvatarUploadProps {
  avatarUrl: AvatarUrl;
  setAvatarUrl: AvatarUrlDispatch
}

export const AvatarUpload = ({ avatarUrl, setAvatarUrl }: AvatarUploadProps) => {
  const [ setFile, loading ] = useAvatarUpload(setAvatarUrl);
  const fileUploadRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const el = e.target;
    if (el.files !== null) {
      setFile(el.files[0]);
    }
  }

  const handleUploadClick = () => {
    fileUploadRef.current?.click();
  }

  const avatarUrlToShow = !avatarUrl || (avatarUrl instanceof Error) ? '' : avatarUrl;

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box sx={{ position: "relative" }}>
        <Avatar sx={{ width: 120, height: 120 }} src={avatarUrlToShow}>
          <PersonIcon sx={{ width: 100, height: 100 }} />
        </Avatar>
        <input
          style={{ display: "none"}}
          ref={fileUploadRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange} />
        <Fab
          color="primary"
          size="small"
          sx={{
            position: "absolute",
            right: 0,
            bottom: 0,
          }}
          onClick={handleUploadClick}>
            {loading
              ? <CircularProgress size={20} sx={{ color: "primary.contrastText" }}/>
              : <AddAPhotoIcon fontSize="small"/>}
        </Fab>
      </Box>
    </Box>
  )
}