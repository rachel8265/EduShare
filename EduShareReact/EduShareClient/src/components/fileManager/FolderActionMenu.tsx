// import React from 'react';
// import { Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
// import { 
//   Delete as DeleteIcon,
//   Edit as EditIcon,
//   Share as ShareIcon
// } from '@mui/icons-material';
// import { FolderType } from '../../models/FolderType';

// interface FolderActionMenuProps {
//   anchorEl: HTMLElement | null;
//   selectedFolder: FolderType | null;
//   onClose: () => void;
//   onDeleteClick: () => void;
//   onRenameClick: () => void;
//   onShareClick?: () => void;
// }

// const FolderActionMenu: React.FC<FolderActionMenuProps> = ({
//   anchorEl,
//   selectedFolder,
//   onClose,
//   onDeleteClick,
//   onRenameClick,
//   onShareClick
// }) => {
//   if (!selectedFolder) return null;

//   return (
//     <Menu
//       anchorEl={anchorEl}
//       open={Boolean(anchorEl)}
//       onClose={onClose}
//       anchorOrigin={{
//         vertical: 'bottom',
//         horizontal: 'right',
//       }}
//       transformOrigin={{
//         vertical: 'top',
//         horizontal: 'right',
//       }}
//     >
//       <MenuItem onClick={onRenameClick}>
//         <ListItemIcon>
//           <EditIcon fontSize="small" />
//         </ListItemIcon>
//         <ListItemText primary="Rename" />
//       </MenuItem>
      
//       {onShareClick && (
//         <MenuItem onClick={onShareClick}>
//           <ListItemIcon>
//             <ShareIcon fontSize="small" />
//           </ListItemIcon>
//           <ListItemText primary="Share" />
//         </MenuItem>
//       )}
      
//       <MenuItem onClick={onDeleteClick}>
//         <ListItemIcon>
//           <DeleteIcon fontSize="small" sx={{ color: 'error.main' }} />
//         </ListItemIcon>
//         <ListItemText primary="Delete" sx={{ color: 'error.main' }} />
//       </MenuItem>
//     </Menu>
//   );
// };

// export default FolderActionMenu;

"use client"

import type React from "react"
import { Menu, MenuItem, ListItemIcon, ListItemText, useTheme } from "@mui/material"
import { Delete as DeleteIcon, Edit as EditIcon, Share as ShareIcon } from "@mui/icons-material"
import type { FolderType } from "../../models/FolderType"

interface FolderActionMenuProps {
  anchorEl: HTMLElement | null
  selectedFolder: FolderType | null
  onClose: () => void
  onDeleteClick: () => void
  onRenameClick: () => void
  onShareClick?: () => void
}

const FolderActionMenu: React.FC<FolderActionMenuProps> = ({
  anchorEl,
  selectedFolder,
  onClose,
  onDeleteClick,
  onRenameClick,
  onShareClick,
}) => {
  const theme = useTheme()

  if (!selectedFolder) return null

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
      <MenuItem onClick={onRenameClick} dense sx={{ py: 1.5 }}>
        <ListItemIcon>
          <EditIcon fontSize="small" sx={{ color: theme.palette.primary.main }} />
        </ListItemIcon>
        <ListItemText primary="Rename" />
      </MenuItem>

      {onShareClick && (
        <MenuItem onClick={onShareClick} dense sx={{ py: 1.5 }}>
          <ListItemIcon>
            <ShareIcon fontSize="small" sx={{ color: theme.palette.primary.main }} />
          </ListItemIcon>
          <ListItemText primary="Share" />
        </MenuItem>
      )}

      <MenuItem
        onClick={onDeleteClick}
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

export default FolderActionMenu
