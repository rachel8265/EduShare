
"use client"

import type React from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import FileUploader from "./FileUploader"
import { useSelector } from "react-redux"
import {  RootStore } from "../../store/Store"

interface FileUploadDialogProps {
  open: boolean
  onClose: () => void
  currentFolderId: number | null
}

const FileUploadDialog: React.FC<FileUploadDialogProps> = ({ open, onClose, currentFolderId }) => {

  const theme = useTheme()
  const {user}=useSelector((state:RootStore)=>state.user)

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <DialogTitle
        sx={{
          p: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid",
          borderColor: theme.palette.divider,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Upload Files
        </Typography>
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="close"
          sx={{ color: theme.palette.text.secondary }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 3 }}>
        <FileUploader folderId={currentFolderId} userId={user.id} />
      </DialogContent>
      <DialogActions sx={{ p: 3, borderTop: "1px solid", borderColor: theme.palette.divider }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            borderRadius: 50,
            px: 3,
            borderColor: theme.palette.primary.main,
            color: theme.palette.primary.main,
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default FileUploadDialog
