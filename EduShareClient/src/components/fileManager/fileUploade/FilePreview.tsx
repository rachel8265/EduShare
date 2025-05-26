// import React from 'react';
// import { Box, Typography, Paper, Avatar, IconButton } from '@mui/material';
// import { 
//   Close as CloseIcon,
//   FilePresent as FilePresentIcon
// } from '@mui/icons-material';
// import { filePreviewContainerStyle } from './FileUploaderStyles';

// interface FilePreviewProps {
//   file: File;
//   onClearFile: () => void;
// }

// const FilePreview: React.FC<FilePreviewProps> = ({ file, onClearFile }) => {
//   // פונקציה לקבלת הסוג של הקובץ
//   const getFileType = (fileName: string) => {
//     const extension = fileName.split('.').pop()?.toLowerCase();
//     switch (extension) {
//       case 'pdf':
//         return 'PDF';
//       case 'docx':
//         return 'DOCX';
//       case 'jpg':
//       case 'jpeg':
//       case 'png':
//         return 'תמונה';
//       default:
//         return 'קובץ';
//     }
//   };

//   // פונקציה לקבלת צבע האייקון לפי סוג הקובץ
//   const getIconColor = (fileName: string) => {
//     const extension = fileName.split('.').pop()?.toLowerCase();
//     switch (extension) {
//       case 'pdf':
//         return '#f44336'; // אדום
//       case 'docx':
//         return '#2196f3'; // כחול
//       case 'jpg':
//       case 'jpeg':
//       case 'png':
//         return '#4caf50'; // ירוק
//       default:
//         return '#9e9e9e'; // אפור
//     }
//   };

//   return (
//     <Paper
//       elevation={0}
//       sx={filePreviewContainerStyle}
//     >
//       <Box sx={{ display: 'flex', alignItems: 'center' }}>
//         <Avatar 
//           variant="rounded" 
//           sx={{ 
//             bgcolor: `${getIconColor(file.name)}20`, 
//             color: getIconColor(file.name),
//             mr: 2
//           }}
//         >
//           <FilePresentIcon />
//         </Avatar>
//         <Box>
//           <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
//             {file.name}
//           </Typography>
//           <Box sx={{ display: 'flex', gap: 2, mt: 0.5 }}>
//             <Typography variant="caption" color="text.secondary">
//               {getFileType(file.name)}
//             </Typography>
//             <Typography variant="caption" color="text.secondary">
//               {(file.size / 1024 / 1024).toFixed(2)} MB
//             </Typography>
//           </Box>
//         </Box>
//       </Box>
//       <IconButton 
//         size="small" 
//         onClick={onClearFile}
//         sx={{ 
//           color: 'error.main',
//           bgcolor: 'error.light',
//           opacity: 0.8,
//           '&:hover': {
//             bgcolor: 'error.light',
//             opacity: 1
//           }
//         }}
//       >
//         <CloseIcon fontSize="small" />
//       </IconButton>
//     </Paper>
//   );
// };

// export default FilePreview;
"use client"

import type React from "react"
import { Box, Typography, Paper, Avatar, IconButton, useTheme, alpha } from "@mui/material"
import { Close as CloseIcon, FilePresent as FilePresentIcon } from "@mui/icons-material"
import { getFileTypeLabel, getIconColor } from "../FileUtils"
// import { getFileType, getIconColor } from "./FileUtiles"
// import { getFileType, getIconColor } from "../FileUtils"

interface FilePreviewProps {
  file: File
  onClearFile: () => void
}

const FilePreview: React.FC<FilePreviewProps> = ({ file, onClearFile }) => {
  const theme = useTheme()

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        mb: 3,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        border: "1px solid",
        borderColor: alpha(theme.palette.primary.main, 0.1),
        borderRadius: 2,
        bgcolor: "white",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Avatar
          variant="rounded"
          sx={{
            bgcolor: `${getIconColor(file.name)}20`,
            color: getIconColor(file.name),
            mr: 2,
            width: 48,
            height: 48,
          }}
        >
          <FilePresentIcon />
        </Avatar>
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
            {file.name}
          </Typography>
          <Box sx={{ display: "flex", gap: 2, mt: 0.5 }}>
            <Typography variant="caption" color="text.secondary">
              {getFileTypeLabel(file.name)}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </Typography>
          </Box>
        </Box>
      </Box>
      <IconButton
        size="small"
        onClick={onClearFile}
        sx={{
          color: theme.palette.error.main,
          bgcolor: alpha(theme.palette.error.main, 0.1),
          "&:hover": {
            bgcolor: alpha(theme.palette.error.main, 0.2),
          },
        }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Paper>
  )
}

export default FilePreview
