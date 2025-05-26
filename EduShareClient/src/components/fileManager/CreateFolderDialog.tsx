// components/dialogs/CreateFolderDialog.jsx
import React, { useState } from 'react';
import { 
  Dialog, DialogTitle, DialogContent, 
  DialogActions, Button, TextField 
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { createFolder } from '../store/FolderSlice';
import { AppDispatch } from '../store/Store';
// import { AppDispatch } from '../../../store';
// import { createFolder } from '../../redux/FolderSlice';

interface CreateFolderDialogProps {
  open: boolean;
  onClose: () => void;
  currentFolderId: number | null;
}

const CreateFolderDialog: React.FC<CreateFolderDialogProps> = ({ open, onClose, currentFolderId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [newFolderName, setNewFolderName] = useState('');

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      dispatch(createFolder({
        name: newFolderName,
        userId: 1,
        parentFolderId: currentFolderId
      }));
      setNewFolderName('');
      onClose();
    }
  };

  const handleClose = () => {
    setNewFolderName('');
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle>Create New Folder</DialogTitle>
      <DialogContent sx={{ pt: 2 }}>
        <TextField 
          autoFocus
          margin="dense"
          label="Folder Name"
          type="text"
          fullWidth
          variant="outlined"
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
        />
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button 
          onClick={handleCreateFolder} 
          variant="contained"
          disabled={!newFolderName.trim()}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateFolderDialog;