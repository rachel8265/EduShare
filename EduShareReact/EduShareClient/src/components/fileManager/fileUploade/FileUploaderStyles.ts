import { SxProps, Theme } from '@mui/material';

export const mainContainerStyle: SxProps<Theme> = { 
  p: 2 
};

export const uploadAreaStyle: SxProps<Theme> = { 
  display: 'flex', 
  flexDirection: 'column', 
  alignItems: 'center',
  p: 4, 
  border: '2px dashed', 
  borderColor: 'primary.light', 
  borderRadius: 2,
  backgroundColor: 'rgba(25, 118, 210, 0.04)',
  transition: 'all 0.3s',
  '&:hover': {
    borderColor: 'primary.main',
    backgroundColor: 'rgba(25, 118, 210, 0.08)',
  }
};

export const uploadAvatarStyle: SxProps<Theme> = { 
  bgcolor: 'rgba(25, 118, 210, 0.1)', 
  color: 'primary.main',
  width: 80, 
  height: 80,
  mb: 3
};

export const filePreviewContainerStyle: SxProps<Theme> = {
  p: 2,
  mb: 3,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  border: '1px solid rgba(0, 0, 0, 0.12)',
  borderRadius: 2,
  bgcolor: 'white'
};

export const uploadButtonStyle: SxProps<Theme> = { 
  minWidth: 180,
  py: 1.2,
  boxShadow: 2,
  borderRadius: 2
};