import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/Store';
// import { updateFolder } from '../FolderSlice';
import { FolderType } from '../../models/FolderType';
import {  updateFolder } from '../store/FolderSlice';

interface RenameFolderDialogProps {
  open: boolean;
  onClose: () => void;
  selectedFolder: FolderType | null;
}

const RenameFolderDialog: React.FC<RenameFolderDialogProps> = ({
  open,
  onClose,
  selectedFolder
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [newName, setNewName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (selectedFolder) {
      setNewName(selectedFolder.name);
      setError('');
    }
  }, [selectedFolder]);

  //   const handleRename = () => {
  //     if (!newName.trim()) {
  //       setError('Folder name cannot be empty');
  //       return;
  //     }

  //     if (selectedFolder) {
  //       dispatch(updateFolder({
  //         ...selectedFolder,
  //         name: newName.trim()
  //       }));
  //       onClose();
  //     }
  //   };
  const handleRename = () => {
    if (!newName.trim()) {
      setError('Folder name cannot be empty');
      return;
    }

    if (selectedFolder) {

      dispatch(updateFolder({ folderId: selectedFolder.id, updateData: { name: newName.trim() } }));

      onClose();
    }
  };
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Rename Folder</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Folder Name"
          type="text"
          fullWidth
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          error={!!error}
          helperText={error}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleRename} variant="contained">Rename</Button>
      </DialogActions>
    </Dialog>
  );
};

export default RenameFolderDialog;