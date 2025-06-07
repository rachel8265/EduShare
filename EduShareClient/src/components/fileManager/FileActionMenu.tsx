
// "use client"

import type React from "react"
import { Menu, MenuItem, ListItemIcon, ListItemText, useTheme } from "@mui/material"
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Visibility as VisibilityIcon,
  GetApp as DownloadIcon,
  Share as ShareIcon,
} from "@mui/icons-material"
import { useDispatch } from "react-redux"
import { softDeleteFile } from "../store/FileSlice"
import type { AppDispatch } from "../store/Store"
import type { FileType } from "../../models/FileType"

interface FileActionMenuProps {
  anchorEl: HTMLElement | null
  selectedFile: FileType | null
  onClose: () => void
  onRenameClick: () => void
  onViewClick: () => void
}

const FileActionMenu: React.FC<FileActionMenuProps> = ({
  anchorEl,
  selectedFile,
  onClose,
  onRenameClick,
  onViewClick,
}) => {
  const theme = useTheme()
  const dispatch = useDispatch<AppDispatch>()

  const handleDeleteFile = () => {
    if (selectedFile?.id && window.confirm("Are you sure you want to delete this file?")) {
      dispatch(softDeleteFile(selectedFile.id))
    }
    onClose()
  }

  const handleDownload = () => {
    // Implement download functionality
    // console.log("Download file:", selectedFile)
    onClose()
  }

  const handleShare = () => {
    // Implement share functionality
    // console.log("Share file:", selectedFile)
    onClose()
  }

  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      PaperProps={{
        elevation: 3,
        sx: {
          borderRadius: 2,
          minWidth: 180,
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          border: "1px solid",
          borderColor: theme.palette.divider,
          mt: 1,
        },
      }}
    >
      <MenuItem onClick={onViewClick} dense sx={{ py: 1.5 }}>
        <ListItemIcon>
          <VisibilityIcon fontSize="small" sx={{ color: theme.palette.primary.main }} />
        </ListItemIcon>
        <ListItemText primary="View" />
      </MenuItem>

      <MenuItem onClick={handleDownload} dense sx={{ py: 1.5 }}>
        <ListItemIcon>
          <DownloadIcon fontSize="small" sx={{ color: theme.palette.primary.main }} />
        </ListItemIcon>
        <ListItemText primary="Download" />
      </MenuItem>

      <MenuItem onClick={onRenameClick} dense sx={{ py: 1.5 }}>
        <ListItemIcon>
          <EditIcon fontSize="small" sx={{ color: theme.palette.primary.main }} />
        </ListItemIcon>
        <ListItemText primary="Rename" />
      </MenuItem>

      <MenuItem onClick={handleShare} dense sx={{ py: 1.5 }}>
        <ListItemIcon>
          <ShareIcon fontSize="small" sx={{ color: theme.palette.primary.main }} />
        </ListItemIcon>
        <ListItemText primary="Share" />
      </MenuItem>

      <MenuItem
        onClick={handleDeleteFile}
        dense
        sx={{
          py: 1.5,
          color: theme.palette.error.main,
          "&:hover": {
            bgcolor: theme.palette.error.light + "20",
          },
        }}
      >
        <ListItemIcon>
          <DeleteIcon fontSize="small" sx={{ color: theme.palette.error.main }} />
        </ListItemIcon>
        <ListItemText primary="Delete" />
      </MenuItem>
    </Menu>
  )
}

export default FileActionMenu
// "use client"
// "use client"

// import { useState } from "react"
// import {
//   Menu,
//   MenuItem,
//   ListItemIcon,
//   ListItemText,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogContentText,
//   DialogActions,
//   Button,
// } from "@mui/material"
// import {
//   Delete as DeleteIcon,
//   Edit as EditIcon,
//   Visibility as VisibilityIcon,
//   Download as DownloadIcon,
//   Share as ShareIcon,
//   Cancel as CancelIcon,
// } from "@mui/icons-material"
// import { useDispatch, useSelector } from "react-redux"
// import type { FileType } from "../../models/FileType"
// import type { AppDispatch } from "../../components/store/Store"
// import { shareFileWithForum, unshareFileWithForum } from "../store/FileSlice"
// import { selectUser } from "../store/UserSlice"

// interface FileActionMenuProps {
//   anchorEl: HTMLElement | null
//   selectedFile: FileType | null
//   onClose: () => void
//   onRenameClick: () => void
//   onViewClick: () => void
// }

// const FileActionMenu = ({ anchorEl, selectedFile, onClose, onRenameClick, onViewClick }: FileActionMenuProps) => {
//   const dispatch = useDispatch<AppDispatch>()
//   const { user } = useSelector(selectUser)
//   const [shareDialogOpen, setShareDialogOpen] = useState(false)
//   const [unshareDialogOpen, setUnshareDialogOpen] = useState(false)

//   // בדיקה אם המשתמש הוא בעל הקובץ
//   const isOwner = selectedFile?.userId === user.id

//   const handleShareClick = () => {
//     onClose()
//     setShareDialogOpen(true)
//   }

//   const handleUnshareClick = () => {
//     onClose()
//     setUnshareDialogOpen(true)
//   }

//   const confirmShare = () => {
//     if (selectedFile) {
//       dispatch(shareFileWithForum(selectedFile.id))
//     }
//     setShareDialogOpen(false)
//   }

//   const confirmUnshare = () => {
//     if (selectedFile) {
//       dispatch(unshareFileWithForum(selectedFile.id))
//     }
//     setUnshareDialogOpen(false)
//   }

//   return (
//     <>
//       <Menu
//         anchorEl={anchorEl}
//         open={Boolean(anchorEl)}
//         onClose={onClose}
//         anchorOrigin={{
//           vertical: "bottom",
//           horizontal: "right",
//         }}
//         transformOrigin={{
//           vertical: "top",
//           horizontal: "right",
//         }}
//       >
//         <MenuItem onClick={onViewClick}>
//           <ListItemIcon>
//             <VisibilityIcon fontSize="small" />
//           </ListItemIcon>
//           <ListItemText primary="צפה בקובץ" />
//         </MenuItem>

//         {/* <MenuItem onClick={() => window.open(selectedFile?.url, "_blank")}>
//           <ListItemIcon>
//             <DownloadIcon fontSize="small" />
//           </ListItemIcon>
//           <ListItemText primary="הורד" />
//         </MenuItem> */}

//         {/* אפשרויות עריכה ומחיקה רק לבעל הקובץ */}
//         {isOwner && (
//           <>
//             <MenuItem onClick={onRenameClick}>
//               <ListItemIcon>
//                 <EditIcon fontSize="small" />
//               </ListItemIcon>
//               <ListItemText primary="שנה שם" />
//             </MenuItem>

//             <MenuItem onClick={() => {}}>
//               <ListItemIcon>
//                 <DeleteIcon fontSize="small" />
//               </ListItemIcon>
//               <ListItemText primary="מחק" />
//             </MenuItem>

//             {/* אפשרות שיתוף או ביטול שיתוף בהתאם למצב הנוכחי */}
//             {selectedFile?.isPublic ? (
//               <MenuItem onClick={handleUnshareClick}>
//                 <ListItemIcon>
//                   <CancelIcon fontSize="small" />
//                 </ListItemIcon>
//                 <ListItemText primary="בטל שיתוף עם הפורום" />
//               </MenuItem>
//             ) : (
//               <MenuItem onClick={handleShareClick}>
//                 <ListItemIcon>
//                   <ShareIcon fontSize="small" />
//                 </ListItemIcon>
//                 <ListItemText primary="שתף עם הפורום" />
//               </MenuItem>
//             )}
//           </>
//         )}
//       </Menu>

//       {/* דיאלוג אישור שיתוף */}
//       <Dialog open={shareDialogOpen} onClose={() => setShareDialogOpen(false)}>
//         <DialogTitle>שיתוף קובץ עם הפורום</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             האם אתה בטוח שברצונך לשתף את הקובץ "{selectedFile?.fileName}" עם כל חברי הפורום? הקובץ יהיה זמין לצפייה והורדה
//             לכל המשתמשים המחוברים.
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setShareDialogOpen(false)}>ביטול</Button>
//           <Button onClick={confirmShare} color="primary" variant="contained">
//             שתף
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* דיאלוג אישור ביטול שיתוף */}
//       <Dialog open={unshareDialogOpen} onClose={() => setUnshareDialogOpen(false)}>
//         <DialogTitle>ביטול שיתוף קובץ</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             האם אתה בטוח שברצונך לבטל את שיתוף הקובץ "{selectedFile?.fileName}" עם חברי הפורום? הקובץ לא יהיה זמין יותר
//             לצפייה או הורדה למשתמשים אחרים.
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setUnshareDialogOpen(false)}>ביטול</Button>
//           <Button onClick={confirmUnshare} color="primary" variant="contained">
//             בטל שיתוף
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   )
// }

// export default FileActionMenu
