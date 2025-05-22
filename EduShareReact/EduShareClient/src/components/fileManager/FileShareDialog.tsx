// import React, { useState, useEffect } from "react"
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   Typography,
//   Switch,
//   FormControlLabel,
//   Box,
//   Divider,
// } from "@mui/material"
// import { Share as ShareIcon, People as PeopleIcon } from "@mui/icons-material"
// import type { FileType } from "../../models/FileType"

// interface FileShareDialogProps {
//   open: boolean
//   onClose: () => void
//   file: FileType | null
//   handleShareToggle: (fileId:  number, isShared: boolean) => void
// }

// const FileShareDialog: React.FC<FileShareDialogProps> = ({
//   open,
//   onClose,
//   file,
//   handleShareToggle,
// }) => {
//   const [isShared, setIsShared] = useState<boolean>(file?.isPublic || false)

//   // Update sharing state when file changes
//   useEffect(() => {
//     if (file) {
//       setIsShared(file.isPublic || false)
//     }
//   }, [file])

//   const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setIsShared(event.target.checked)
//   }

//   const handleSave = () => {
//     console.log(file);
    
//     if (file) {

//       handleShareToggle(file.id, isShared)
//     }
//     onClose()
//   }

//   if (!file) return null

//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
//       <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//         <ShareIcon color="primary" />
//         <Typography variant="h6" component="span">
//           Share File with Forum
//         </Typography>
//       </DialogTitle>
//       <Divider />
//       <DialogContent>
//         <Typography variant="subtitle1" gutterBottom>
//           {file.fileName}
//         </Typography>
//         <Typography variant="body2" color="text.secondary" paragraph>
//           Sharing this file will allow all forum members to view and download it. The file will appear in the "Shared Files" page for all users.
//         </Typography>

//         <Box sx={{ mt: 3, mb: 2, display: "flex", alignItems: "center" }}>
//           <PeopleIcon sx={{ mr: 2, color: "text.secondary" }} />
//           <FormControlLabel
//             control={<Switch checked={isShared} onChange={handleToggle} color="primary" />}
//             label={
//               <Typography variant="body1">
//                 {isShared ? "File is shared with all forum members" : "Share file with all forum members"}
//               </Typography>
//             }
//           />
//         </Box>
//       </DialogContent>
//       <DialogActions sx={{ px: 3, pb: 2 }}>
//         <Button onClick={onClose} variant="outlined">
//           Cancel
//         </Button>
//         <Button onClick={handleSave} variant="contained" color="primary" startIcon={<ShareIcon />}>
//           {isShared ? "Update Sharing Settings" : "Share"}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   )
// }

// export default FileShareDialog

import React, { useState, useEffect } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Switch,
  FormControlLabel,
  Box,
  Divider,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  CircularProgress,
  SelectChangeEvent,
} from "@mui/material"
import { Share as ShareIcon, People as PeopleIcon } from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux"
import { fetchTopics } from "../store/TopicSlice"
import type { RootStore } from "../store/Store"
import type { FileType } from "../../models/FileType"
import type { AppDispatch } from "../store/Store"

interface FileShareDialogProps {
  open: boolean
  onClose: () => void
  file: FileType | null
  handleShareToggle: (fileId: number, isShared: boolean, topicId: number) => void
}
const FileShareDialog: React.FC<FileShareDialogProps> = ({
  open,
  onClose,
  file,
  handleShareToggle,
}) => {
  const dispatch = useDispatch<AppDispatch>()
  const { topics, loading } = useSelector((state: RootStore) => state.topics)

  const [isShared, setIsShared] = useState<boolean>(file?.isPublic || false)
  const [selectedTopicId, setSelectedTopicId] = useState<number>(file?.topicId ?? 0)

  useEffect(() => {
    
    dispatch(fetchTopics())
  }, [dispatch])

  // Update sharing state and topic selection when file changes
  useEffect(() => {
    if (file) {
      setIsShared(file.isPublic || false)
      setSelectedTopicId(file.topicId ?? 0)
    }
  }, [file])

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsShared(event.target.checked)
  }


    const handleTopicChange = (event: SelectChangeEvent<number>) => {
    setSelectedTopicId(Number(event.target.value))
    }
  const handleSave = () => {
    if (file) {
      console.log(selectedTopicId+"  ss");
      
      handleShareToggle(file.id, isShared, selectedTopicId)
    }
    onClose()
  }

  if (!file) return null

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <ShareIcon color="primary" />
        <Typography variant="h6" component="span">
          Share File with Forum
        </Typography>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Typography variant="subtitle1" gutterBottom>
          {file.fileName}
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Sharing this file will allow all forum members to view and download it. The file will appear in the "Shared Files" page for all users.
        </Typography>

        <Box sx={{ mt: 3, mb: 2, display: "flex", alignItems: "center" }}>
          <PeopleIcon sx={{ mr: 2, color: "text.secondary" }} />
          <FormControlLabel
            control={<Switch checked={isShared} onChange={handleToggle} color="primary" />}
            label={
              <Typography variant="body1">
                {isShared ? "File is shared with all forum members" : "Share file with all forum members"}
              </Typography>
            }
          />
        </Box>

        <Box sx={{ mt: 2 }}>
          <FormControl fullWidth>
            <InputLabel id="topic-select-label">Select Topic</InputLabel>
            <Select
              labelId="topic-select-label"
              value={selectedTopicId}
              label="Select Topic"
              onChange={handleTopicChange}
              disabled={loading}
            >
              {loading && (
                <MenuItem value={0}><CircularProgress size={20} /></MenuItem>
              )}
              {!loading && topics.map(topic => (
                <MenuItem key={topic.id} value={topic.id}>{topic.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          color="primary"
          startIcon={<ShareIcon />}
          disabled={!selectedTopicId}
        >
          {isShared ? "Update Sharing Settings" : "Share"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default FileShareDialog