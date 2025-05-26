// import React, { useState, DragEvent } from 'react';
// import { Box, Typography, Button, Avatar } from '@mui/material';
// import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';
// import { uploadAreaStyle, uploadAvatarStyle } from './FileUploaderStyles';

// interface UploadAreaProps {
//   onFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
//   onFileDropped: (file: File) => void;
// }

// const UploadArea: React.FC<UploadAreaProps> = ({ onFileSelect, onFileDropped }) => {
//   const [isDragging, setIsDragging] = useState(false);

//   const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsDragging(true);
//   };

//   const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsDragging(false);
//   };

//   const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (!isDragging) {
//       setIsDragging(true);
//     }
//   };

//   const handleDrop = (e: DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsDragging(false);
    
//     if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
//       const droppedFile = e.dataTransfer.files[0];
//       onFileDropped(droppedFile);
//     }
//   };

//   return (
//     <Box 
//       sx={{
//         ...uploadAreaStyle,
//         borderColor: isDragging ? 'primary.main' : 'primary.light',
//         backgroundColor: isDragging ? 'rgba(25, 118, 210, 0.08)' : 'rgba(25, 118, 210, 0.04)',
//       }}
//       onDragEnter={handleDragEnter}
//       onDragLeave={handleDragLeave}
//       onDragOver={handleDragOver}
//       onDrop={handleDrop}
//     >
//       <input
//         type="file"
//         id="file-upload"
//         style={{ display: 'none' }}
//         onChange={onFileSelect}
//         accept=".pdf,.docx,.jpg,.jpeg,.png"
//       />
      
//       <Avatar 
//         variant="rounded"
//         sx={uploadAvatarStyle}
//       >
//         <CloudUploadIcon sx={{ fontSize: 40 }} />
//       </Avatar>
      
//       <Typography variant="h6" align="center" sx={{ mb: 2, fontWeight: 500 }}>
//         {isDragging ? 'שחרר כדי להעלות' : 'גרור קבצים לכאן או לחץ לבחירה'}
//       </Typography>
      
//       <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
//         תומך בקבצים מסוג PDF, DOCX, JPG, PNG עד 10MB
//       </Typography>
      
//       <label htmlFor="file-upload">
//         <Button 
//           component="span" 
//           variant="contained" 
//           startIcon={<CloudUploadIcon />}
//           sx={{ 
//             direction: 'rtl',
//             py: 1.2,
//             px: 3,
//             boxShadow: 2
//           }}
//         >
//           בחר קובץ
//         </Button>
//       </label>
//     </Box>
//   );
// };

// export default UploadArea;
"use client"

import type React from "react"
import { useState, type DragEvent } from "react"
import { Box, Typography, Button, Avatar, useTheme, alpha } from "@mui/material"
import { CloudUpload as CloudUploadIcon } from "@mui/icons-material"

interface UploadAreaProps {
  onFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void
  onFileDropped: (file: File) => void
}

const UploadArea: React.FC<UploadAreaProps> = ({ onFileSelect, onFileDropped }) => {
  const theme = useTheme()
  const [isDragging, setIsDragging] = useState(false)

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (!isDragging) {
      setIsDragging(true)
    }
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0]
      onFileDropped(droppedFile)
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 6,
        border: "2px dashed",
        borderColor: isDragging ? theme.palette.primary.main : alpha(theme.palette.primary.main, 0.3),
        borderRadius: 2,
        backgroundColor: isDragging ? alpha(theme.palette.primary.main, 0.05) : alpha(theme.palette.primary.main, 0.02),
        transition: "all 0.3s",
      }}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input
        type="file"
        id="file-upload"
        style={{ display: "none" }}
        onChange={onFileSelect}
        accept=".pdf,.docx,.jpg,.jpeg,.png"
      />

      <Avatar
        variant="rounded"
        sx={{
          bgcolor: alpha(theme.palette.primary.main, 0.1),
          color: theme.palette.primary.main,
          width: 100,
          height: 100,
          mb: 3,
          p: 2,
        }}
      >
        <CloudUploadIcon sx={{ fontSize: 50 }} />
      </Avatar>

      <Typography variant="h6" align="center" sx={{ mb: 2, fontWeight: 500 }}>
        {isDragging ? "Drop to upload" : "Drag files here or click to browse"}
      </Typography>

      <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 4 }}>
        Supports PDF, DOCX, JPG, PNG files up to 10MB
      </Typography>

      <label htmlFor="file-upload">
        <Button
          component="span"
          variant="contained"
          startIcon={<CloudUploadIcon />}
          sx={{
            borderRadius: 50,
            px: 4,
            py: 1.2,
            background: "linear-gradient(to right, #0d9488, #10b981)",
            "&:hover": {
              background: "linear-gradient(to right, #0f766e, #047857)",
            },
            boxShadow: "0 4px 10px rgba(16, 185, 129, 0.2)",
          }}
        >
          Browse Files
        </Button>
      </label>
    </Box>
  )
}

export default UploadArea
