// components/dialogs/RenameFileDialog.jsx
import React, { useState, useEffect } from 'react';
import { 
  Dialog, DialogTitle, DialogContent, 
  DialogActions, Button, TextField 
} from '@mui/material';
import { useDispatch } from 'react-redux';
// import { renameFile } from '../store/FileSlice';
import { AppDispatch } from '../store/Store';
import { FileType } from '../../models/FileType';
import { updateFile } from '../store/FileSlice';


interface RenameFileDialogProps {
  open: boolean;
  onClose: () => void;
  selectedFile: FileType | null;
}

const RenameFileDialog: React.FC<RenameFileDialogProps> = ({ open, onClose, selectedFile }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [newFileName, setNewFileName] = useState('');

  useEffect(() => {
    if (selectedFile && open) {
      setNewFileName(selectedFile.fileName);
      
    }
  }, [selectedFile, open]);

  const handleRenameFile = () => {
    if (selectedFile && newFileName.trim()) {
     dispatch(updateFile({ fileId: selectedFile.id, updateData: { fileName: newFileName } }));
      onClose();
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle>Rename File</DialogTitle>
      <DialogContent sx={{ pt: 2 }}>
        <TextField 
          autoFocus
          margin="dense"
          label="New Filename"
          type="text"
          fullWidth
          variant="outlined"
          value={newFileName}
          onChange={(e) => setNewFileName(e.target.value)}
        />
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button 
          onClick={handleRenameFile} 
          variant="contained"
          disabled={!newFileName.trim()}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RenameFileDialog;