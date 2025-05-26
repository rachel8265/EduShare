
//#region
// // components/FileTable.jsx
// import React from 'react';
// import { 
//   Table, TableBody, TableCell, TableContainer, 
//   TableHead, TableRow, Paper, Box, Typography, IconButton 
// } from '@mui/material';
// import { 
//   Folder as FolderIcon,
//   MoreVert as MoreVertIcon
// } from '@mui/icons-material';
// import { useDispatch } from 'react-redux';
// // import { softDeleteFolder } from '../FolderSlice';
// import { AppDispatch } from '../../components/store/Store';
// import { FolderType } from '../../models/FolderType';
// import { formatDate, formatFileSize, getFileTypeIcon, renderRatingStars } from './FileUtils';
// import { FileType } from '../../models/FileType';

// // import { getFileTypeIcon, formatDate, formatFileSize, renderRatingStars } from './fileUtils';

// interface FileTableProps {
//   folders: FolderType[];
//   files: FileType[];
//   handleFolderClick: (folder: FolderType) => void;
//   handleFileClick: (file: FileType) => void;
//   handleMenuOpen: (event: React.MouseEvent<HTMLButtonElement>, file: FileType) => void;
//   handleFolderMenuOpen: (event: React.MouseEvent<HTMLButtonElement>, folder: FolderType) => void;
// }

// const FileTable: React.FC<FileTableProps> = ({ 
//   folders, 
//   files, 
//   handleFolderClick, 
//   handleFileClick, 
//   handleMenuOpen,
//   handleFolderMenuOpen  
// }) => {
//  const dispatch = useDispatch<AppDispatch>();



//   return (
//     <TableContainer 
//       component={Paper} 
//       sx={{ 
//         borderRadius: 1, 
//         mb: 4, 
//         boxShadow: 1,
//         flexGrow: 1,
//         minHeight: 300
//       }}
//     >
//       <Table sx={{ minWidth: 650 }} aria-label="file table">
//         <TableHead sx={{ bgcolor: '#f5f5f7' }}>
//           <TableRow>
//             <TableCell>Name</TableCell>
//             <TableCell align="right">Date Modified</TableCell>
//             <TableCell align="right">Size</TableCell>
//             <TableCell align="right">Rating</TableCell>
//             <TableCell align="right">Actions</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {/* Folders */}
//           {folders.map((folder:FolderType) => (
//             <TableRow 
//               key={`folder-${folder.id}`}
//               hover
//               onClick={() => handleFolderClick(folder)}
//               sx={{ cursor: 'pointer' }}
//             >
//               <TableCell component="th" scope="row">
//                 <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                   <FolderIcon sx={{ color: '#ffc107', mr: 1 }} />
//                   {folder.name}
//                 </Box>
//               </TableCell>
//               <TableCell align="right">{formatDate(folder.updatedAt || folder.createdAt)}</TableCell>
//               <TableCell align="right">—</TableCell>
//               <TableCell align="right">—</TableCell>
//               <TableCell align="right">
//               <IconButton 
//                   size="small"
//                   onClick={(e) => {
//                     e.stopPropagation(); // Prevent folder click
//                     handleFolderMenuOpen(e, folder); // Open folder menu instead of direct delete
//                   }}
//                 >
//                   <MoreVertIcon fontSize="small" />
//                 </IconButton>
//               </TableCell>
//             </TableRow>
//           ))}
          
//           {/* Files */}
//           {files.map((file:FileType) => (
//             <TableRow 
//               key={`file-${file.id}`}
//               hover
//               onClick={() => handleFileClick(file)}
//               sx={{ cursor: 'pointer' }}
//             >
//               <TableCell component="th" scope="row">
//                 <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                   {getFileTypeIcon(file.fileName)}
//                   <Typography sx={{ ml: 1 }}>{file.fileName}</Typography>
//                 </Box>
//               </TableCell>
//               <TableCell align="right">{formatDate(file.createAt)}</TableCell>
//               {/* <TableCell align="right">{formatDate(file.uploadedAt)}</TableCell> */}
//               <TableCell align="right">{formatFileSize(file.fileSize)}</TableCell>
//               <TableCell align="right">
//                 {renderRatingStars(56)}
//               </TableCell>
//               <TableCell align="right">
//                 <IconButton 
//                   size="small"
//                   onClick={(e) => handleMenuOpen(e, file)}
//                 >
//                   <MoreVertIcon fontSize="small" />
//                 </IconButton>
//               </TableCell>
//             </TableRow>
//           ))}
          
//           {folders.length === 0 && files.length === 0 && (
//             <TableRow>
//               <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
//                 <Typography variant="body1" color="textSecondary">
//                   This folder is empty
//                 </Typography>
//               </TableCell>
//             </TableRow>
//           )}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// export default FileTable;
//#region
// import type React from "react"
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Box,
//   Typography,
//   IconButton,
//   useTheme,
//   alpha,
//   Chip,
// } from "@mui/material"
// import {
//   Folder as FolderIcon,
//   MoreVert as MoreVertIcon,
//   Description as FileDocIcon,
//   PictureAsPdf as PdfIcon,
//   Image as ImageIcon,
//   InsertDriveFile as GenericFileIcon,
//   TableChart as SpreadsheetIcon,
//   Slideshow as PresentationIcon,
//    People as PeopleIcon,
// } from "@mui/icons-material"
// import type { FolderType } from "../../models/FolderType"
// import type { FileType } from "../../models/FileType"
// import { formatDate, formatFileSize, getFileTypeIcon, getFileTypeLabel } from "./FileUtils"
// import { useEffect } from "react"
// import { selectUser } from "../store/UserSlice"
// import { useSelector } from "react-redux"

// interface FileTableProps {
//   folders: FolderType[]
//   files: FileType[]
//   handleFolderClick: (folder: FolderType) => void
//   handleFileClick: (file: FileType) => void
//   handleMenuOpen: (event: React.MouseEvent<HTMLButtonElement>, file: FileType) => void
//   handleFolderMenuOpen: (event: React.MouseEvent<HTMLButtonElement>, folder: FolderType) => void
// }

// const FileTable: React.FC<FileTableProps> = ({
//   folders,
//   files,
//   handleFolderClick,
//   handleFileClick,
//   handleMenuOpen,
//   handleFolderMenuOpen,
// }) => {
//   const theme = useTheme()
//   const { user } = useSelector(selectUser)

//   // Function to get file icon based on file type
//   // const getFileIcon = (fileName: string) => {
//   //   const extension = fileName.split(".").pop()?.toLowerCase()

//   //   switch (extension) {
//   //     case "pdf":
//   //       return <PdfIcon sx={{ color: "#e53935", fontSize: 22 }} />
//   //     case "jpg":
//   //     case "jpeg":
//   //     case "png":
//   //     case "gif":
//   //       return <ImageIcon sx={{ color: "#43a047", fontSize: 22 }} />
//   //     case "doc":
//   //     case "docx":
//   //       return <FileDocIcon sx={{ color: "#1e88e5", fontSize: 22 }} />
//   //     case "xls":
//   //     case "xlsx":
//   //       return <SpreadsheetIcon sx={{ color: "#7cb342", fontSize: 22 }} />
//   //     case "ppt":
//   //     case "pptx":
//   //       return <PresentationIcon sx={{ color: "#fb8c00", fontSize: 22 }} />
//   //     default:
//   //       return <GenericFileIcon sx={{ color: "#757575", fontSize: 22 }} />
//   //   }
//   // }


//   return (
//     <TableContainer
//       sx={{
//         borderRadius: 2,
//         overflow: "hidden",
//         border: "1px solid",
//         borderColor: theme.palette.divider,
//         boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
//       }}
//     >
//       <Table sx={{ minWidth: 650 }} aria-label="file table" size="small">
//         <TableHead sx={{ bgcolor: theme.palette.mode === "dark" ? alpha("#000", 0.2) : alpha("#f5f5f5", 0.8) }}>
//           <TableRow>
//             <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary, py: 1.5 }}>Name</TableCell>
//             <TableCell align="right" sx={{ fontWeight: 600, color: theme.palette.text.primary, py: 1.5 }}>
//               Date Modified
//             </TableCell>
//             <TableCell align="right" sx={{ fontWeight: 600, color: theme.palette.text.primary, py: 1.5 }}>
//               Size
//             </TableCell>
//             <TableCell align="right" sx={{ fontWeight: 600, color: theme.palette.text.primary, py: 1.5 }}>
//               Type
//             </TableCell>
//             <TableCell align="right" sx={{ fontWeight: 600, color: theme.palette.text.primary, py: 1.5 }}>
//               Actions
//             </TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {/* Folders */}
//           {folders.map((folder: FolderType) => (
//             <TableRow
//               key={`folder-${folder.id}`}
//               hover
//               onClick={() => handleFolderClick(folder)}
//               sx={{
//                 cursor: "pointer",
//                 "&:hover": {
//                   bgcolor: theme.palette.mode === "dark" ? alpha("#fff", 0.05) : alpha("#000", 0.02),
//                 },
//                 height: "48px", // Reduced height
//               }}
//             >
//               <TableCell component="th" scope="row" sx={{ py: 1 }}>
//                 <Box sx={{ display: "flex", alignItems: "center" }}>
//                   <Box
//                     sx={{
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       width: 28,
//                       height: 28,
//                       mr: 2,
//                     }}
//                   >
//                     <FolderIcon sx={{ color: "#ffa000", fontSize: 22 }} />
//                   </Box>
//                   <Typography sx={{ fontWeight: 500 }}>{folder.name}</Typography>
//                 </Box>
//               </TableCell>
//               <TableCell align="right" sx={{ py: 1 }}>
//                 <Typography variant="body2" color="text.secondary">
//                   {formatDate(folder.updatedAt || folder.createdAt)}
//                 </Typography>
//               </TableCell>
//               <TableCell align="right" sx={{ py: 1 }}>
//                 <Typography variant="body2" color="text.secondary">
//                   —
//                 </Typography>
//               </TableCell>
//               <TableCell align="right" sx={{ py: 1 }}>
//                 <Typography variant="body2" color="text.secondary">
//                   Folder
//                 </Typography>
//               </TableCell>
//               <TableCell align="right" sx={{ py: 1 }}>
//                 <IconButton
//                   size="small"
//                   onClick={(e) => {
//                     e.stopPropagation()
//                     handleFolderMenuOpen(e, folder)
//                   }}
//                   sx={{
//                     color: theme.palette.text.secondary,
//                     "&:hover": {
//                       bgcolor: alpha(theme.palette.primary.main, 0.1),
//                       color: theme.palette.primary.main,
//                     },
//                   }}
//                 >
//                   <MoreVertIcon fontSize="small" />
//                 </IconButton>
//               </TableCell>
//             </TableRow>
//           ))}

//           {/* Files */}
//           {files.map((file: FileType) => (
//             <TableRow
//               key={`file-${file.id}`}
//               hover
//               onClick={() => handleFileClick(file)}
//               sx={{
//                 cursor: "pointer",
//                 "&:hover": {
//                   bgcolor: theme.palette.mode === "dark" ? alpha("#fff", 0.05) : alpha("#000", 0.02),
//                 },
//                 height: "48px", // Reduced height
//               }}
//             >
//               <TableCell component="th" scope="row" sx={{ py: 1 }}>
//                 <Box sx={{ display: "flex", alignItems: "center" }}>
//                   <Box
//                     sx={{
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       width: 28,
//                       height: 28,
//                       mr: 2,
//                     }}
//                   >
//                     {getFileTypeIcon(file.fileName)}
//                   </Box>
//                   <Typography sx={{ fontWeight: 500 }}>{file.fileName}</Typography>
//                 </Box>
//               </TableCell>
//               <TableCell align="right" sx={{ py: 1 }}>
//                 <Typography variant="body2" color="text.secondary">
//                   {formatDate(file.updatedAt || file.createdAt)}
//                 </Typography>
//               </TableCell>
//               <TableCell align="right" sx={{ py: 1 }}>
//                 <Typography variant="body2" color="text.secondary">
//                   {formatFileSize(file.fileSize)}
//                 </Typography>
//               </TableCell>
//               <TableCell align="right" sx={{ py: 1 }}>
//                 {/* <Typography variant="body2" color="text.secondary">
//                   {getFileTypeLabel(file.fileName)}
//                 </Typography> */}
//                  <Box sx={{ display: "flex", alignItems: "center" }}>
//                     <Typography sx={{ fontWeight: 500 }}>{file.fileName}</Typography>
//                     {file.isPublic && (
//                       <Chip
//                         icon={<PeopleIcon sx={{ fontSize: "16px !important" }} />}
//                         label="Shared"
//                         size="small"
//                         sx={{
//                           ml: 1,
//                           height: 20,
//                           fontSize: "0.7rem",
//                           bgcolor: alpha(theme.palette.primary.main, 0.1),
//                           color: theme.palette.primary.main,
//                           "& .MuiChip-icon": {
//                             color: theme.palette.primary.main,
//                           },
//                         }}
//                       />
//                     )}
//                   </Box>
//               </TableCell>
//               <TableCell align="right" sx={{ py: 1 }}>
//                 <IconButton
//                   size="small"
//                   onClick={(e) => handleMenuOpen(e, file)}
//                   sx={{
//                     color: theme.palette.text.secondary,
//                     "&:hover": {
//                       bgcolor: alpha(theme.palette.primary.main, 0.1),
//                       color: theme.palette.primary.main,
//                     },
//                   }}
//                 >
//                   <MoreVertIcon fontSize="small" />
//                 </IconButton>
//               </TableCell>
//             </TableRow>
//           ))}

//           {folders.length === 0 && files.length === 0 && (
//             <TableRow>
//               <TableCell colSpan={5} align="center" sx={{ py: 8 }}>
//                 <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 3 }}>
//                   <FolderIcon sx={{ fontSize: 36, color: "#ffa000", mb: 2 }} />
//                   <Typography variant="h6" sx={{ mb: 1, fontWeight: 500 }}>
//                     This folder is empty
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     Upload files or create folders to get started
//                   </Typography>
//                 </Box>
//               </TableCell>
//             </TableRow>
//           )}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   )
// }

// // Helper function to get file type label


// export default FileTable
//#endregion

// import type React from "react"
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Box,
//   Typography,
//   IconButton,
//   useTheme,
//   alpha,
// } from "@mui/material"
// import {
//   Folder as FolderIcon,
//   MoreVert as MoreVertIcon,
//   Description as FileDocIcon,
//   PictureAsPdf as PdfIcon,
//   Image as ImageIcon,
//   InsertDriveFile as GenericFileIcon,
//   TableChart as SpreadsheetIcon,
//   Slideshow as PresentationIcon,
// } from "@mui/icons-material"
// import type { FolderType } from "../../models/FolderType"
// import type { FileType } from "../../models/FileType"
// import { formatDate, formatFileSize, getFileTypeIcon, getFileTypeLabel } from "./FileUtils"
// import { useEffect } from "react"

// interface FileTableProps {
//   folders: FolderType[]
//   files: FileType[]
//   handleFolderClick: (folder: FolderType) => void
//   handleFileClick: (file: FileType) => void
//   handleMenuOpen: (event: React.MouseEvent<HTMLButtonElement>, file: FileType) => void
//   handleFolderMenuOpen: (event: React.MouseEvent<HTMLButtonElement>, folder: FolderType) => void
// }

// const FileTable: React.FC<FileTableProps> = ({
//   folders,
//   files,
//   handleFolderClick,
//   handleFileClick,
//   handleMenuOpen,
//   handleFolderMenuOpen,
// }) => {
//   const theme = useTheme()

//   // Function to get file icon based on file type
//   // const getFileIcon = (fileName: string) => {
//   //   const extension = fileName.split(".").pop()?.toLowerCase()

//   //   switch (extension) {
//   //     case "pdf":
//   //       return <PdfIcon sx={{ color: "#e53935", fontSize: 22 }} />
//   //     case "jpg":
//   //     case "jpeg":
//   //     case "png":
//   //     case "gif":
//   //       return <ImageIcon sx={{ color: "#43a047", fontSize: 22 }} />
//   //     case "doc":
//   //     case "docx":
//   //       return <FileDocIcon sx={{ color: "#1e88e5", fontSize: 22 }} />
//   //     case "xls":
//   //     case "xlsx":
//   //       return <SpreadsheetIcon sx={{ color: "#7cb342", fontSize: 22 }} />
//   //     case "ppt":
//   //     case "pptx":
//   //       return <PresentationIcon sx={{ color: "#fb8c00", fontSize: 22 }} />
//   //     default:
//   //       return <GenericFileIcon sx={{ color: "#757575", fontSize: 22 }} />
//   //   }
//   // }


//   return (
//     <TableContainer
//       sx={{
//         borderRadius: 2,
//         overflow: "hidden",
//         border: "1px solid",
//         borderColor: theme.palette.divider,
//         boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
//       }}
//     >
//       <Table sx={{ minWidth: 650 }} aria-label="file table" size="small">
//         <TableHead sx={{ bgcolor: theme.palette.mode === "dark" ? alpha("#000", 0.2) : alpha("#f5f5f5", 0.8) }}>
//           <TableRow>
//             <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary, py: 1.5 }}>Name</TableCell>
//             <TableCell align="right" sx={{ fontWeight: 600, color: theme.palette.text.primary, py: 1.5 }}>
//               Date Modified
//             </TableCell>
//             <TableCell align="right" sx={{ fontWeight: 600, color: theme.palette.text.primary, py: 1.5 }}>
//               Size
//             </TableCell>
//             <TableCell align="right" sx={{ fontWeight: 600, color: theme.palette.text.primary, py: 1.5 }}>
//               Type
//             </TableCell>
//             <TableCell align="right" sx={{ fontWeight: 600, color: theme.palette.text.primary, py: 1.5 }}>
//               Actions
//             </TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {/* Folders */}
//           {folders.map((folder: FolderType) => (
//             <TableRow
//               key={`folder-${folder.id}`}
//               hover
//               onClick={() => handleFolderClick(folder)}
//               sx={{
//                 cursor: "pointer",
//                 "&:hover": {
//                   bgcolor: theme.palette.mode === "dark" ? alpha("#fff", 0.05) : alpha("#000", 0.02),
//                 },
//                 height: "48px", // Reduced height
//               }}
//             >
//               <TableCell component="th" scope="row" sx={{ py: 1 }}>
//                 <Box sx={{ display: "flex", alignItems: "center" }}>
//                   <Box
//                     sx={{
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       width: 28,
//                       height: 28,
//                       mr: 2,
//                     }}
//                   >
//                     <FolderIcon sx={{ color: "#ffa000", fontSize: 22 }} />
//                   </Box>
//                   <Typography sx={{ fontWeight: 500 }}>{folder.name}</Typography>
//                 </Box>
//               </TableCell>
//               <TableCell align="right" sx={{ py: 1 }}>
//                 <Typography variant="body2" color="text.secondary">
//                   {formatDate(folder.updatedAt || folder.createdAt)}
//                 </Typography>
//               </TableCell>
//               <TableCell align="right" sx={{ py: 1 }}>
//                 <Typography variant="body2" color="text.secondary">
//                   —
//                 </Typography>
//               </TableCell>
//               <TableCell align="right" sx={{ py: 1 }}>
//                 <Typography variant="body2" color="text.secondary">
//                   Folder
//                 </Typography>
//               </TableCell>
//               <TableCell align="right" sx={{ py: 1 }}>
//                 <IconButton
//                   size="small"
//                   onClick={(e) => {
//                     e.stopPropagation()
//                     handleFolderMenuOpen(e, folder)
//                   }}
//                   sx={{
//                     color: theme.palette.text.secondary,
//                     "&:hover": {
//                       bgcolor: alpha(theme.palette.primary.main, 0.1),
//                       color: theme.palette.primary.main,
//                     },
//                   }}
//                 >
//                   <MoreVertIcon fontSize="small" />
//                 </IconButton>
//               </TableCell>
//             </TableRow>
//           ))}

//           {/* Files */}
//           {files.map((file: FileType) => (
//             <TableRow
//               key={`file-${file.id}`}
//               hover
//               onClick={() => handleFileClick(file)}
//               sx={{
//                 cursor: "pointer",
//                 "&:hover": {
//                   bgcolor: theme.palette.mode === "dark" ? alpha("#fff", 0.05) : alpha("#000", 0.02),
//                 },
//                 height: "48px", // Reduced height
//               }}
//             >
//               <TableCell component="th" scope="row" sx={{ py: 1 }}>
//                 <Box sx={{ display: "flex", alignItems: "center" }}>
//                   <Box
//                     sx={{
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       width: 28,
//                       height: 28,
//                       mr: 2,
//                     }}
//                   >
//                     {getFileTypeIcon(file.fileName)}
//                   </Box>
//                   <Typography sx={{ fontWeight: 500 }}>{file.fileName}</Typography>
//                 </Box>
//               </TableCell>
//               <TableCell align="right" sx={{ py: 1 }}>
//                 <Typography variant="body2" color="text.secondary">
//                   {formatDate(file.updatedAt || file.createdAt)}
//                 </Typography>
//               </TableCell>
//               <TableCell align="right" sx={{ py: 1 }}>
//                 <Typography variant="body2" color="text.secondary">
//                   {formatFileSize(file.fileSize)}
//                 </Typography>
//               </TableCell>
//               <TableCell align="right" sx={{ py: 1 }}>
//                 <Typography variant="body2" color="text.secondary">
//                   {getFileTypeLabel(file.fileName)}
//                 </Typography>
//               </TableCell>
//               <TableCell align="right" sx={{ py: 1 }}>
//                 <IconButton
//                   size="small"
//                   onClick={(e) => handleMenuOpen(e, file)}
//                   sx={{
//                     color: theme.palette.text.secondary,
//                     "&:hover": {
//                       bgcolor: alpha(theme.palette.primary.main, 0.1),
//                       color: theme.palette.primary.main,
//                     },
//                   }}
//                 >
//                   <MoreVertIcon fontSize="small" />
//                 </IconButton>
//               </TableCell>
//             </TableRow>
//           ))}

//           {folders.length === 0 && files.length === 0 && (
//             <TableRow>
//               <TableCell colSpan={5} align="center" sx={{ py: 8 }}>
//                 <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 3 }}>
//                   <FolderIcon sx={{ fontSize: 36, color: "#ffa000", mb: 2 }} />
//                   <Typography variant="h6" sx={{ mb: 1, fontWeight: 500 }}>
//                     This folder is empty
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     Upload files or create folders to get started
//                   </Typography>
//                 </Box>
//               </TableCell>
//             </TableRow>
//           )}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   )
// }

// // Helper function to get file type label


// export default FileTableimport React, { useState } from "react"

//#region
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Box,
//   Typography,
//   IconButton,
//   useTheme,
//   alpha,
//   Tooltip,
//   Chip,
// } from "@mui/material"
// import {
//   Folder as FolderIcon,
//   MoreVert as MoreVertIcon,
//   Share as ShareIcon,
//   People as PeopleIcon,
// } from "@mui/icons-material"
// import type { FolderType } from "../../models/FolderType"
// import type { FileType } from "../../models/FileType"
// import { formatDate, formatFileSize, getFileTypeIcon, getFileTypeLabel } from "./FileUtils"
// import FileShareDialog from "./FileShareDialog"
// import { useState } from "react"

// interface FileTableProps {
//   folders: FolderType[]
//   files: FileType[]
//   handleFolderClick: (folder: FolderType) => void
//   handleFileClick: (file: FileType) => void
//   handleMenuOpen: (event: React.MouseEvent<HTMLButtonElement>, file: FileType) => void
//   handleFolderMenuOpen: (event: React.MouseEvent<HTMLButtonElement>, folder: FolderType) => void
//   handleShareToggle: (fileId:  number, isShared: boolean) => void
// }

// const FileTable: React.FC<FileTableProps> = ({
//   folders,
//   files,
//   handleFolderClick,
//   handleFileClick,
//   handleMenuOpen,
//   handleFolderMenuOpen,
//   handleShareToggle,
// }) => {
//   const theme = useTheme()
//   const [shareDialogOpen, setShareDialogOpen] = useState(false)
//   const [selectedFile, setSelectedFile] = useState<FileType | null>(null)

//   const handleShareClick = (e: React.MouseEvent, file: FileType) => {
//     e.stopPropagation()
//     setSelectedFile(file)
//     setShareDialogOpen(true)
//   }

//   const handleShareDialogClose = () => {
//     setShareDialogOpen(false)
//     setSelectedFile(null)
//   }

//   return (
//     <>
//       <TableContainer
//         sx={{
//           borderRadius: 2,
//           overflow: "hidden",
//           border: "1px solid",
//           borderColor: theme.palette.divider,
//           boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
//         }}
//       >
//         <Table sx={{ minWidth: 650 }} aria-label="file table" size="small">
//           <TableHead sx={{ bgcolor: theme.palette.mode === "dark" ? alpha("#000", 0.2) : alpha("#f5f5f5", 0.8) }}>
//             <TableRow>
//               <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary, py: 1.5 }}>Name</TableCell>
//               <TableCell align="right" sx={{ fontWeight: 600, color: theme.palette.text.primary, py: 1.5 }}>
//                 Date Modified
//               </TableCell>
//               <TableCell align="right" sx={{ fontWeight: 600, color: theme.palette.text.primary, py: 1.5 }}>
//                 Size
//               </TableCell>
//               <TableCell align="right" sx={{ fontWeight: 600, color: theme.palette.text.primary, py: 1.5 }}>
//                 Type
//               </TableCell>
//               <TableCell align="right" sx={{ fontWeight: 600, color: theme.palette.text.primary, py: 1.5 }}>
//                 Actions
//               </TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {/* Folders */}
//             {folders.map((folder: FolderType) => (
//               <TableRow
//                 key={`folder-${folder.id}`}
//                 hover
//                 onClick={() => handleFolderClick(folder)}
//                 sx={{
//                   cursor: "pointer",
//                   "&:hover": {
//                     bgcolor: theme.palette.mode === "dark" ? alpha("#fff", 0.05) : alpha("#000", 0.02),
//                   },
//                   height: "48px",
//                 }}
//               >
//                 <TableCell component="th" scope="row" sx={{ py: 1 }}>
//                   <Box sx={{ display: "flex", alignItems: "center" }}>
//                     <Box
//                       sx={{
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         width: 28,
//                         height: 28,
//                         mr: 2,
//                       }}
//                     >
//                       <FolderIcon sx={{ color: "#ffa000", fontSize: 22 }} />
//                     </Box>
//                     <Typography sx={{ fontWeight: 500 }}>{folder.name}</Typography>
//                   </Box>
//                 </TableCell>
//                 <TableCell align="right" sx={{ py: 1 }}>
//                   <Typography variant="body2" color="text.secondary">
//                     {formatDate(folder.updatedAt || folder.createdAt)}
//                   </Typography>
//                 </TableCell>
//                 <TableCell align="right" sx={{ py: 1 }}>
//                   <Typography variant="body2" color="text.secondary">
//                     —
//                   </Typography>
//                 </TableCell>
//                 <TableCell align="right" sx={{ py: 1 }}>
//                   <Typography variant="body2" color="text.secondary">
//                     Folder
//                   </Typography>
//                 </TableCell>
//                 <TableCell align="right" sx={{ py: 1 }}>
//                   <IconButton
//                     size="small"
//                     onClick={(e) => {
//                       e.stopPropagation()
//                       handleFolderMenuOpen(e, folder)
//                     }}
//                     sx={{
//                       color: theme.palette.text.secondary,
//                       "&:hover": {
//                         bgcolor: alpha(theme.palette.primary.main, 0.1),
//                         color: theme.palette.primary.main,
//                       },
//                     }}
//                   >
//                     <MoreVertIcon fontSize="small" />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}

//             {/* Files */}
//             {files.map((file: FileType) => (
//               <TableRow
//                 key={`file-${file.id}`}
//                 hover
//                 onClick={() => handleFileClick(file)}
//                 sx={{
//                   cursor: "pointer",
//                   "&:hover": {
//                     bgcolor: theme.palette.mode === "dark" ? alpha("#fff", 0.05) : alpha("#000", 0.02),
//                   },
//                   height: "48px",
//                 }}
//               >
//                 <TableCell component="th" scope="row" sx={{ py: 1 }}>
//                   <Box sx={{ display: "flex", alignItems: "center" }}>
//                     <Box
//                       sx={{
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         width: 28,
//                         height: 28,
//                         mr: 2,
//                       }}
//                     >
//                       {getFileTypeIcon(file.fileName)}
//                     </Box>
//                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                       <Typography sx={{ fontWeight: 500 }}>{file.fileName}</Typography>
//                       {/* Share indicator */}
//                       {file.isPublic && (
//                         <Tooltip title="Shared with forum">
//                           <Chip
//                             icon={<PeopleIcon sx={{ fontSize: '14px !important' }} />}
//                             label="Shared"
//                             size="small"
//                             sx={{
//                               ml: 1,
//                               height: 20,
//                               fontSize: '0.7rem',
//                               bgcolor: alpha(theme.palette.primary.main, 0.1),
//                               color: theme.palette.primary.main,
//                               '& .MuiChip-icon': {
//                                 color: theme.palette.primary.main,
//                               },
//                             }}
//                           />
//                         </Tooltip>
//                       )}
//                     </Box>
//                   </Box>
//                 </TableCell>
//                 <TableCell align="right" sx={{ py: 1 }}>
//                   <Typography variant="body2" color="text.secondary">
//                     {formatDate(file.updatedAt || file.createdAt)}
//                   </Typography>
//                 </TableCell>
//                 <TableCell align="right" sx={{ py: 1 }}>
//                   <Typography variant="body2" color="text.secondary">
//                     {formatFileSize(file.fileSize)}
//                   </Typography>
//                 </TableCell>
//                 <TableCell align="right" sx={{ py: 1 }}>
//                   <Typography variant="body2" color="text.secondary">
//                     {getFileTypeLabel(file.fileName)}
//                   </Typography>
//                 </TableCell>
//                 <TableCell align="right" sx={{ py: 1 }}>
//                   <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
//                     {/* Quick share button */}
//                     <Tooltip title={file.isPublic ? "Unshare" : "Share with forum"}>
//                       <IconButton
//                         size="small"
//                         onClick={(e) => handleShareClick(e, file)}
//                         sx={{
//                           color: file.isPublic ? theme.palette.primary.main : theme.palette.text.secondary,
//                           mr: 0.5,
//                           "&:hover": {
//                             bgcolor: alpha(theme.palette.primary.main, 0.1),
//                             color: theme.palette.primary.main,
//                           },
//                         }}
//                       >
//                         <ShareIcon fontSize="small" />
//                       </IconButton>
//                     </Tooltip>
//                     {/* Actions menu */}
//                     <IconButton
//                       size="small"
//                       onClick={(e) => handleMenuOpen(e, file)}
//                       sx={{
//                         color: theme.palette.text.secondary,
//                         "&:hover": {
//                           bgcolor: alpha(theme.palette.primary.main, 0.1),
//                           color: theme.palette.primary.main,
//                         },
//                       }}
//                     >
//                       <MoreVertIcon fontSize="small" />
//                     </IconButton>
//                   </Box>
//                 </TableCell>
//               </TableRow>
//             ))}

//             {folders.length === 0 && files.length === 0 && (
//               <TableRow>
//                 <TableCell colSpan={5} align="center" sx={{ py: 8 }}>
//                   <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 3 }}>
//                     <FolderIcon sx={{ fontSize: 36, color: "#ffa000", mb: 2 }} />
//                     <Typography variant="h6" sx={{ mb: 1, fontWeight: 500 }}>
//                       This folder is empty
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       Upload files or create folders to get started
//                     </Typography>
//                   </Box>
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       {/* Share dialog */}
//       <FileShareDialog
//         open={shareDialogOpen}
//         onClose={handleShareDialogClose}
//         file={selectedFile}
//         handleShareToggle={handleShareToggle}
//       />
//     </>
//   )
// }

// export default FileTable
// #endregion

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Box,
//   Typography,
//   IconButton,
//   useTheme,
//   alpha,
//   Tooltip,
//   Chip,
// } from "@mui/material"
// import {
//   Folder as FolderIcon,
//   MoreVert as MoreVertIcon,
//   Share as ShareIcon,
//   People as PeopleIcon,
// } from "@mui/icons-material"
// import type { FolderType } from "../../models/FolderType"
// import type { FileType } from "../../models/FileType"
// import { formatDate, formatFileSize, getFileTypeIcon, getFileTypeLabel } from "./FileUtils"
// import FileShareDialog from "./FileShareDialog"
// import { useState } from "react"

// interface FileTableProps {
//   folders: FolderType[]
//   files: FileType[]
//   handleFolderClick: (folder: FolderType) => void
//   handleFileClick: (file: FileType) => void
//   handleMenuOpen: (event: React.MouseEvent<HTMLButtonElement>, file: FileType) => void
//   handleFolderMenuOpen: (event: React.MouseEvent<HTMLButtonElement>, folder: FolderType) => void
//   handleShareToggle: (fileId: number, isShared: boolean) => void
// }

// const FileTable: React.FC<FileTableProps> = ({
//   folders,
//   files,
//   handleFolderClick,
//   handleFileClick,
//   handleMenuOpen,
//   handleFolderMenuOpen,
//   handleShareToggle,
// }) => {
//   const theme = useTheme()
//   const [shareDialogOpen, setShareDialogOpen] = useState(false)
//   const [selectedFile, setSelectedFile] = useState<FileType | null>(null)

//   const handleShareClick = (e: React.MouseEvent, file: FileType) => {
//     e.stopPropagation()
//     setSelectedFile(file)
//     setShareDialogOpen(true)
//   }

//   const handleShareDialogClose = () => {
//     setShareDialogOpen(false)
//     setSelectedFile(null)
//   }

//   return (
//     <>
//       <TableContainer
//         sx={{
//           borderRadius: 2,
//           overflow: "hidden",
//           border: "1px solid",
//           borderColor: theme.palette.divider,
//           boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
//         }}
//       >
//         <Table sx={{ minWidth: 650 }} aria-label="file table" size="small">
//           <TableHead sx={{ bgcolor: theme.palette.mode === "dark" ? alpha("#000", 0.2) : alpha("#f5f5f5", 0.8) }}>
//             <TableRow>
//               <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary, py: 1.5 }}>Name</TableCell>
//               <TableCell align="right" sx={{ fontWeight: 600, color: theme.palette.text.primary, py: 1.5 }}>
//                 Date Modified
//               </TableCell>
//               <TableCell align="right" sx={{ fontWeight: 600, color: theme.palette.text.primary, py: 1.5 }}>
//                 Size
//               </TableCell>
//               <TableCell align="right" sx={{ fontWeight: 600, color: theme.palette.text.primary, py: 1.5 }}>
//                 Type
//               </TableCell>
//               <TableCell align="right" sx={{ fontWeight: 600, color: theme.palette.text.primary, py: 1.5 }}>
//                 Actions
//               </TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {/* Folders */}
//             {folders.map((folder: FolderType) => (
//               <TableRow
//                 key={`folder-${folder.id}`}
//                 hover
//                 onClick={() => handleFolderClick(folder)}
//                 sx={{
//                   cursor: "pointer",
//                   "&:hover": {
//                     bgcolor: theme.palette.mode === "dark" ? alpha("#fff", 0.05) : alpha("#000", 0.02),
//                   },
//                   height: "48px",
//                 }}
//               >
//                 <TableCell component="th" scope="row" sx={{ py: 1 }}>
//                   <Box sx={{ display: "flex", alignItems: "center" }}>
//                     <Box
//                       sx={{
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         width: 28,
//                         height: 28,
//                         mr: 2,
//                       }}
//                     >
//                       <FolderIcon sx={{ color: "#ffa000", fontSize: 22 }} />
//                     </Box>
//                     <Typography sx={{ fontWeight: 500 }}>{folder.name}</Typography>
//                   </Box>
//                 </TableCell>
//                 <TableCell align="right" sx={{ py: 1 }}>
//                   <Typography variant="body2" color="text.secondary">
//                     {formatDate(folder.updatedAt || folder.createdAt)}
//                   </Typography>
//                 </TableCell>
//                 <TableCell align="right" sx={{ py: 1 }}>
//                   <Typography variant="body2" color="text.secondary">
//                     —
//                   </Typography>
//                 </TableCell>
//                 <TableCell align="right" sx={{ py: 1 }}>
//                   <Typography variant="body2" color="text.secondary">
//                     Folder
//                   </Typography>
//                 </TableCell>
//                 <TableCell align="right" sx={{ py: 1 }}>
//                   <IconButton
//                     size="small"
//                     onClick={(e) => {
//                       e.stopPropagation()
//                       handleFolderMenuOpen(e, folder)
//                     }}
//                     sx={{
//                       color: theme.palette.text.secondary,
//                       "&:hover": {
//                         bgcolor: alpha(theme.palette.primary.main, 0.1),
//                         color: theme.palette.primary.main,
//                       },
//                     }}
//                   >
//                     <MoreVertIcon fontSize="small" />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}

//             {/* Files */}
//             {files.map((file: FileType) => (
//               <TableRow
//                 key={`file-${file.id}`}
//                 hover
//                 onClick={() => handleFileClick(file)}
//                 sx={{
//                   cursor: "pointer",
//                   "&:hover": {
//                     bgcolor: theme.palette.mode === "dark" ? alpha("#fff", 0.05) : alpha("#000", 0.02),
//                   },
//                   height: "48px",
//                 }}
//               >
//                 <TableCell component="th" scope="row" sx={{ py: 1 }}>
//                   <Box sx={{ display: "flex", alignItems: "center" }}>
//                     <Box
//                       sx={{
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         width: 28,
//                         height: 28,
//                         mr: 2,
//                       }}
//                     >
//                       {getFileTypeIcon(file.fileName)}
//                     </Box>
//                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                       <Typography sx={{ fontWeight: 500 }}>{file.fileName}</Typography>
//                       {/* Share indicator */}
//                       {file.isPublic && (
//                         <Tooltip title="Shared with forum">
//                           <Chip
//                             icon={<PeopleIcon sx={{ fontSize: '14px !important' }} />}
//                             label="Shared"
//                             size="small"
//                             sx={{
//                               ml: 1,
//                               height: 20,
//                               fontSize: '0.7rem',
//                               bgcolor: alpha(theme.palette.primary.main, 0.1),
//                               color: theme.palette.primary.main,
//                               '& .MuiChip-icon': {
//                                 color: theme.palette.primary.main,
//                               },
//                             }}
//                           />
//                         </Tooltip>
//                       )}
//                     </Box>
//                   </Box>
//                 </TableCell>
//                 <TableCell align="right" sx={{ py: 1 }}>
//                   <Typography variant="body2" color="text.secondary">
//                     {formatDate(file.updatedAt || file.createdAt)}
//                   </Typography>
//                 </TableCell>
//                 <TableCell align="right" sx={{ py: 1 }}>
//                   <Typography variant="body2" color="text.secondary">
//                     {formatFileSize(file.fileSize)}
//                   </Typography>
//                 </TableCell>
//                 <TableCell align="right" sx={{ py: 1 }}>
//                   <Typography variant="body2" color="text.secondary">
//                     {getFileTypeLabel(file.fileName)}
//                   </Typography>
//                 </TableCell>
//                 <TableCell align="right" sx={{ py: 1 }}>
//                   <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
//                     {/* Quick share button */}
//                     <Tooltip title={file.isPublic ? "Unshare" : "Share with forum"}>
//                       <IconButton
//                         size="small"
//                         onClick={(e) => handleShareClick(e, file)}
//                         sx={{
//                           color: file.isPublic ? theme.palette.primary.main : theme.palette.text.secondary,
//                           mr: 0.5,
//                           "&:hover": {
//                             bgcolor: alpha(theme.palette.primary.main, 0.1),
//                             color: theme.palette.primary.main,
//                           },
//                         }}
//                       >
//                         <ShareIcon fontSize="small" />
//                       </IconButton>
//                     </Tooltip>
//                     {/* Actions menu */}
//                     <IconButton
//                       size="small"
//                       onClick={(e) => handleMenuOpen(e, file)}
//                       sx={{
//                         color: theme.palette.text.secondary,
//                         "&:hover": {
//                           bgcolor: alpha(theme.palette.primary.main, 0.1),
//                           color: theme.palette.primary.main,
//                         },
//                       }}
//                     >
//                       <MoreVertIcon fontSize="small" />
//                     </IconButton>
//                   </Box>
//                 </TableCell>
//               </TableRow>
//             ))}

//             {folders.length === 0 && files.length === 0 && (
//               <TableRow>
//                 <TableCell colSpan={5} align="center" sx={{ py: 8 }}>
//                   <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 3 }}>
//                     <FolderIcon sx={{ fontSize: 36, color: "#ffa000", mb: 2 }} />
//                     <Typography variant="h6" sx={{ mb: 1, fontWeight: 500 }}>
//                       This folder is empty
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       Upload files or create folders to get started
//                     </Typography>
//                   </Box>
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       {/* Share dialog */}
//       <FileShareDialog
//         open={shareDialogOpen}
//         onClose={handleShareDialogClose}
//         file={selectedFile}
//         handleShareToggle={handleShareToggle}
//       />
//     </>
//   )
// }

// export default FileTable










//#endregion







// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Box,
//   Typography,
//   IconButton,
//   useTheme,
//   alpha,
//   Tooltip,
// } from "@mui/material"
// import {
//   Folder as FolderIcon,
//   MoreVert as MoreVertIcon,
//   Share as ShareIcon,
//   People as PeopleIcon,
// } from "@mui/icons-material"
// import type { FolderType } from "../../models/FolderType"
// import type { FileType } from "../../models/FileType"
// import { formatDate, formatFileSize, getFileTypeIcon, getFileTypeLabel } from "./FileUtils"
// import FileShareDialog from "./FileShareDialog"
// import { useState } from "react"

// interface FileTableProps {
//   folders: FolderType[]
//   files: FileType[]
//   handleFolderClick: (folder: FolderType) => void
//   handleFileClick: (file: FileType) => void
//   handleMenuOpen: (event: React.MouseEvent<HTMLButtonElement>, file: FileType) => void
//   handleFolderMenuOpen: (event: React.MouseEvent<HTMLButtonElement>, folder: FolderType) => void
//   handleShareToggle: (fileId: number, isShared: boolean) => void
// }

// const FileTable: React.FC<FileTableProps> = ({
//   folders,
//   files,
//   handleFolderClick,
//   handleFileClick,
//   handleMenuOpen,
//   handleFolderMenuOpen,
//   handleShareToggle,
// }) => {
//   const theme = useTheme()
//   const [shareDialogOpen, setShareDialogOpen] = useState(false)
//   const [selectedFile, setSelectedFile] = useState<FileType | null>(null)

//   const handleShareClick = (e: React.MouseEvent, file: FileType) => {
//     e.stopPropagation()
//     setSelectedFile(file)
//     setShareDialogOpen(true)
//   }

//   const handleShareDialogClose = () => {
//     setShareDialogOpen(false)
//     setSelectedFile(null)
//   }

//   return (
//     <>
//       <TableContainer
//         sx={{
//           borderRadius: 2,
//           overflow: "hidden",
//           border: "1px solid",
//           borderColor: theme.palette.divider,
//           boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
//         }}
//       >
//         <Table sx={{ minWidth: 650 }} aria-label="file table" size="small">
//           <TableHead sx={{ bgcolor: theme.palette.mode === "dark" ? alpha("#000", 0.2) : alpha("#f5f5f5", 0.8) }}>
//             <TableRow>
//               <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary, py: 1.5 }}>Name</TableCell>
//               <TableCell align="right" sx={{ fontWeight: 600, color: theme.palette.text.primary, py: 1.5 }}>
//                 Date Modified
//               </TableCell>
//               <TableCell align="right" sx={{ fontWeight: 600, color: theme.palette.text.primary, py: 1.5 }}>
//                 Size
//               </TableCell>
//               <TableCell align="right" sx={{ fontWeight: 600, color: theme.palette.text.primary, py: 1.5 }}>
//                 Type
//               </TableCell>
//               <TableCell align="right" sx={{ fontWeight: 600, color: theme.palette.text.primary, py: 1.5 }}>
//                 Actions
//               </TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {/* Folders */}
//             {folders.map((folder: FolderType) => (
//               <TableRow
//                 key={`folder-${folder.id}`}
//                 hover
//                 onClick={() => handleFolderClick(folder)}
//                 sx={{
//                   cursor: "pointer",
//                   "&:hover": {
//                     bgcolor: theme.palette.mode === "dark" ? alpha("#fff", 0.05) : alpha("#000", 0.02),
//                   },
//                   height: "48px",
//                 }}
//               >
//                 <TableCell component="th" scope="row" sx={{ py: 1 }}>
//                   <Box sx={{ display: "flex", alignItems: "center" }}>
//                     <Box
//                       sx={{
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         width: 28,
//                         height: 28,
//                         mr: 2,
//                       }}
//                     >
//                       <FolderIcon sx={{ color: "#ffa000", fontSize: 22 }} />
//                     </Box>
//                     <Typography sx={{ fontWeight: 500 }}>{folder.name}</Typography>
//                   </Box>
//                 </TableCell>
//                 <TableCell align="right" sx={{ py: 1 }}>
//                   <Typography variant="body2" color="text.secondary">
//                     {formatDate(folder.updatedAt || folder.createdAt)}
//                   </Typography>
//                 </TableCell>
//                 <TableCell align="right" sx={{ py: 1 }}>
//                   <Typography variant="body2" color="text.secondary">
//                     —
//                   </Typography>
//                 </TableCell>
//                 <TableCell align="right" sx={{ py: 1 }}>
//                   <Typography variant="body2" color="text.secondary">
//                     Folder
//                   </Typography>
//                 </TableCell>
//                 <TableCell align="right" sx={{ py: 1 }}>
//                   <IconButton
//                     size="small"
//                     onClick={(e) => {
//                       e.stopPropagation()
//                       handleFolderMenuOpen(e, folder)
//                     }}
//                     sx={{
//                       color: theme.palette.text.secondary,
//                       "&:hover": {
//                         bgcolor: alpha(theme.palette.primary.main, 0.1),
//                         color: theme.palette.primary.main,
//                       },
//                     }}
//                   >
//                     <MoreVertIcon fontSize="small" />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}

//             {/* Files */}
//             {files.map((file: FileType) => (
//               <TableRow
//                 key={`file-${file.id}`}
//                 hover
//                 onClick={() => handleFileClick(file)}
//                 sx={{
//                   cursor: "pointer",
//                   "&:hover": {
//                     bgcolor: theme.palette.mode === "dark" ? alpha("#fff", 0.05) : alpha("#000", 0.02),
//                   },
//                   height: "48px",
//                 }}
//               >
//                 <TableCell component="th" scope="row" sx={{ py: 1 }}>
//                   <Box sx={{ display: "flex", alignItems: "center" }}>
//                     <Box
//                       sx={{
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         width: 28,
//                         height: 28,
//                         mr: 2,
//                       }}
//                     >
//                       {getFileTypeIcon(file.fileName)}
//                     </Box>
//                     <Typography sx={{ fontWeight: 500 }}>{file.fileName}</Typography>
//                   </Box>
//                 </TableCell>
//                 <TableCell align="right" sx={{ py: 1 }}>
//                   <Typography variant="body2" color="text.secondary">
//                     {formatDate(file.updatedAt || file.createdAt)}
//                   </Typography>
//                 </TableCell>
//                 <TableCell align="right" sx={{ py: 1 }}>
//                   <Typography variant="body2" color="text.secondary">
//                     {formatFileSize(file.fileSize)}
//                   </Typography>
//                 </TableCell>
//                 <TableCell align="right" sx={{ py: 1 }}>
//                   <Typography variant="body2" color="text.secondary">
//                     {getFileTypeLabel(file.fileName)}
//                   </Typography>
//                 </TableCell>
//                 <TableCell align="right" sx={{ py: 1 }}>
//                   <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
//                     {/* Share/Unshare button with dynamic icon and animation */}
//                     <Tooltip title={file.isPublic ? "Shared with others (click to unshare)" : "Share with forum"}>
//                       <IconButton
//                         size="small"
//                         onClick={(e) => handleShareClick(e, file)}
//                         sx={{
//                           color: file.isPublic
//                             ? theme.palette.primary.main
//                             : theme.palette.text.secondary,
//                           mr: 0.5,
//                           transition: "transform 0.2s",
//                           transform: file.isPublic ? "scale(1.15)" : "scale(1)",
//                           bgcolor: file.isPublic
//                             ? alpha(theme.palette.primary.main, 0.08)
//                             : "transparent",
//                           "&:hover": {
//                             bgcolor: alpha(theme.palette.primary.main, 0.14),
//                             color: theme.palette.primary.main,
//                             transform: "scale(1.2)",
//                           },
//                         }}
//                       >
//                         {file.isPublic ? (
//                           <PeopleIcon fontSize="small" />
//                         ) : (
//                           <ShareIcon fontSize="small" />
//                         )}
//                       </IconButton>
//                     </Tooltip>
//                     {/* Actions menu */}
//                     <IconButton
//                       size="small"
//                       onClick={(e) => handleMenuOpen(e, file)}
//                       sx={{
//                         color: theme.palette.text.secondary,
//                         "&:hover": {
//                           bgcolor: alpha(theme.palette.primary.main, 0.1),
//                           color: theme.palette.primary.main,
//                         },
//                       }}
//                     >
//                       <MoreVertIcon fontSize="small" />
//                     </IconButton>
//                   </Box>
//                 </TableCell>
//               </TableRow>
//             ))}

//             {folders.length === 0 && files.length === 0 && (
//               <TableRow>
//                 <TableCell colSpan={5} align="center" sx={{ py: 8 }}>
//                   <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 3 }}>
//                     <FolderIcon sx={{ fontSize: 36, color: "#ffa000", mb: 2 }} />
//                     <Typography variant="h6" sx={{ mb: 1, fontWeight: 500 }}>
//                       This folder is empty
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       Upload files or create folders to get started
//                     </Typography>
//                   </Box>
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       {/* Share dialog */}
//       <FileShareDialog
//         open={shareDialogOpen}
//         onClose={handleShareDialogClose}
//         file={selectedFile}
//         handleShareToggle={handleShareToggle}
//       />
//     </>
//   )
// }

// export default FileTable



import React, { useState, useEffect } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Typography,
  IconButton,
  useTheme,
  alpha,
  Tooltip,
} from "@mui/material"
import {
  Folder as FolderIcon,
  MoreVert as MoreVertIcon,
  Share as ShareIcon,
  People as PeopleIcon,
} from "@mui/icons-material"
import { keyframes } from "@mui/system"
import type { FolderType } from "../../models/FolderType"
import type { FileType } from "../../models/FileType"
import { formatDate, formatFileSize, getFileTypeIcon, getFileTypeLabel } from "./FileUtils"
import FileShareDialog from "./FileShareDialog"

interface FileTableProps {
  folders: FolderType[]
  files: FileType[]
  handleFolderClick: (folder: FolderType) => void
  handleFileClick: (file: FileType) => void
  handleMenuOpen: (event: React.MouseEvent<HTMLButtonElement>, file: FileType) => void
  handleFolderMenuOpen: (event: React.MouseEvent<HTMLButtonElement>, folder: FolderType) => void
handleShareToggle: (fileId: number, isShared: boolean, topicId: number) => void}

// Animation for shared icon "pop"
const pop = keyframes`
  0%   { transform: scale(1);}
  30%  { transform: scale(1.25);}
  60%  { transform: scale(0.9);}
  100% { transform: scale(1);}
`

const FileTable: React.FC<FileTableProps> = ({
  folders,
  files,
  handleFolderClick,
  handleFileClick,
  handleMenuOpen,
  handleFolderMenuOpen,
  handleShareToggle,
}) => {
  const theme = useTheme()
  const [shareDialogOpen, setShareDialogOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<FileType | null>(null)
  const [animatedFiles, setAnimatedFiles] = useState<{ [id: number]: boolean }>({})

  // Track which files just became shared, to animate icon
  useEffect(() => {
    const newAnimatedFiles: { [id: number]: boolean } = {}
    files.forEach(file => {
      // אם קובץ משותף עכשיו ולא היה משותף לפני זה, נפעיל אנימציה
      if (file.isPublic && !animatedFiles[file.id]) {
        newAnimatedFiles[file.id] = true
        // ננקה אחרי חצי שנייה
        setTimeout(() => {
          setAnimatedFiles(prev => ({ ...prev, [file.id]: false }))
        }, 500)
      }
    })
    if (Object.keys(newAnimatedFiles).length > 0) {
      setAnimatedFiles(prev => ({ ...prev, ...newAnimatedFiles }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files.map(f => f.isPublic).join(",")])

  const handleShareClick = (e: React.MouseEvent, file: FileType) => {
    e.stopPropagation()
    setSelectedFile(file)
    setShareDialogOpen(true)
  }

  const handleShareDialogClose = () => {
    setShareDialogOpen(false)
    setSelectedFile(null)
  }

  return (
    <>
      <TableContainer
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          border: "1px solid",
          borderColor: theme.palette.divider,
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="file table" size="small">
          <TableHead sx={{ bgcolor: theme.palette.mode === "dark" ? alpha("#000", 0.2) : alpha("#f5f5f5", 0.8) }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary, py: 1.5 }}>Name</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600, color: theme.palette.text.primary, py: 1.5 }}>
                Date Modified
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 600, color: theme.palette.text.primary, py: 1.5 }}>
                Size
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 600, color: theme.palette.text.primary, py: 1.5 }}>
                Type
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 600, color: theme.palette.text.primary, py: 1.5 }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Folders */}
            {folders.map((folder: FolderType) => (
              <TableRow
                key={`folder-${folder.id}`}
                hover
                onClick={() => handleFolderClick(folder)}
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    bgcolor: theme.palette.mode === "dark" ? alpha("#fff", 0.05) : alpha("#000", 0.02),
                  },
                  height: "48px",
                }}
              >
                <TableCell component="th" scope="row" sx={{ py: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 28,
                        height: 28,
                        mr: 2,
                      }}
                    >
                      <FolderIcon sx={{ color: "#ffa000", fontSize: 22 }} />
                    </Box>
                    <Typography sx={{ fontWeight: 500 }}>{folder.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell align="right" sx={{ py: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    {formatDate(folder.updatedAt || folder.createdAt)}
                  </Typography>
                </TableCell>
                <TableCell align="right" sx={{ py: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    —
                  </Typography>
                </TableCell>
                <TableCell align="right" sx={{ py: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Folder
                  </Typography>
                </TableCell>
                <TableCell align="right" sx={{ py: 1 }}>
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleFolderMenuOpen(e, folder)
                    }}
                    sx={{
                      color: theme.palette.text.secondary,
                      "&:hover": {
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        color: theme.palette.primary.main,
                      },
                    }}
                  >
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

            {/* Files */}
            {files.map((file: FileType) => (
              <TableRow
                key={`file-${file.id}`}
                hover
                onClick={() => handleFileClick(file)}
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    bgcolor: theme.palette.mode === "dark" ? alpha("#fff", 0.05) : alpha("#000", 0.02),
                  },
                  height: "48px",
                }}
              >
                <TableCell component="th" scope="row" sx={{ py: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 28,
                        height: 28,
                        mr: 2,
                      }}
                    >
                      {getFileTypeIcon(file.fileName)}
                    </Box>
                    <Typography sx={{ fontWeight: 500 }}>{file.fileName}</Typography>
                  </Box>
                </TableCell>
                <TableCell align="right" sx={{ py: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    {formatDate(file.updatedAt || file.createdAt)}
                  </Typography>
                </TableCell>
                <TableCell align="right" sx={{ py: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    {formatFileSize(file.fileSize)}
                  </Typography>
                </TableCell>
                <TableCell align="right" sx={{ py: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    {getFileTypeLabel(file.fileName)}
                  </Typography>
                </TableCell>
                <TableCell align="right" sx={{ py: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                    {/* Share/Unshare button with dynamic icon and animation */}
                    <Tooltip title={file.isPublic ? "Shared with others (click to unshare)" : "Share with forum"}>
                      <IconButton
                        size="small"
                        onClick={(e) => handleShareClick(e, file)}
                        sx={{
                          color: file.isPublic
                            ? theme.palette.primary.main
                            : theme.palette.text.secondary,
                          mr: 0.5,
                          transition: "transform 0.2s",
                          transform: file.isPublic ? "scale(1.15)" : "scale(1)",
                          bgcolor: file.isPublic
                            ? alpha(theme.palette.primary.main, 0.08)
                            : "transparent",
                          "&:hover": {
                            bgcolor: alpha(theme.palette.primary.main, 0.14),
                            color: theme.palette.primary.main,
                            transform: "scale(1.2)",
                          },
                          animation: file.isPublic && animatedFiles[file.id] ? `${pop} 0.5s` : undefined,
                        }}
                      >
                        {file.isPublic ? (
                          <PeopleIcon fontSize="small" />
                        ) : (
                          <ShareIcon fontSize="small" />
                        )}
                      </IconButton>
                    </Tooltip>
                    {/* Actions menu */}
                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuOpen(e, file)}
                      sx={{
                        color: theme.palette.text.secondary,
                        "&:hover": {
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                          color: theme.palette.primary.main,
                        },
                      }}
                    >
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}

            {folders.length === 0 && files.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 8 }}>
                  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 3 }}>
                    <FolderIcon sx={{ fontSize: 36, color: "#ffa000", mb: 2 }} />
                    <Typography variant="h6" sx={{ mb: 1, fontWeight: 500 }}>
                      This folder is empty
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Upload files or create folders to get started
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Share dialog */}
      <FileShareDialog
        open={shareDialogOpen}
        onClose={handleShareDialogClose}
        file={selectedFile}
        handleShareToggle={handleShareToggle}
      />

    </>
  )
}

export default FileTable