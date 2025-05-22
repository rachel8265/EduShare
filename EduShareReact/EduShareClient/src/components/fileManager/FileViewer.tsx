//#region 
// import React, { useState, useEffect } from 'react';
// import { 
//     Box, Typography, IconButton, Paper, 
//     Dialog, DialogTitle, DialogContent, 
//     DialogActions, Button, CircularProgress
// } from '@mui/material';
// import { 
//     Close as CloseIcon,
//     PictureAsPdf as PdfIcon,
//     Image as ImageIcon,
//     Description as DocIcon,
//     TableChart as SpreadsheetIcon,
//     InsertDriveFile as FileIcon,
//     Download as DownloadIcon
// } from '@mui/icons-material';
// import axios from 'axios';
// import { FileType } from '../../models/FileType';

// interface FileViewerProps {
//     file: FileType | null;
//     open: boolean;
//     onClose: () => void;
// }

// const FileViewer: React.FC<FileViewerProps> = ({ file, open, onClose }) => {
//     const [fileContent, setFileContent] = useState<string | null>(null);
//     const [loading, setLoading] = useState<boolean>(false);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         if (file && open) {
//             fetchFileContent(file);
//         } else {
//             setFileContent(null);
//             setError(null);
//         }
//     }, [file, open]);

//     const fetchFileContent = async (fileData: FileType) => {
        
//         setLoading(true);
//         setError(null);
//         try {
//             // קבלת ה-URL לצפייה בקובץ
            
//             const response = await axios.get(`http://localhost:5066/api/File/download/${fileData.fileName}`);
//             console.log("url", response.data);
            
//             const viewUrl = response.data.url;
            
//             // const viewUrl = fileData.fileUrl;
            
//             // בדיקת סוג הקובץ כדי לקבוע איך להציג אותו
//             const extension = fileData.fileName.split('.').pop()?.toLowerCase();
            
//             if (['jpg', 'jpeg', 'png', 'gif'].includes(extension || '')) {
//                 // אין צורך לקרוא את התוכן, נציג ישירות את התמונה
//                 setFileContent(viewUrl);
//             } else if (['pdf'].includes(extension || '')) {
//                 // גם PDF ניתן להציג באמצעות תגית iframe
//                 setFileContent(viewUrl);
//             } else if (['txt', 'json', 'html', 'css', 'js'].includes(extension || '')) {
//                 // קריאת תוכן טקסטואלי
//                 const contentResponse = await axios.get(viewUrl);
//                 setFileContent(contentResponse.data);
//             } else {
//                 // קבצים אחרים שלא ניתן להציג
//                 setError('לא ניתן להציג את תוכן הקובץ. ניתן להוריד את הקובץ.');
//                 setFileContent(viewUrl); // שמירת ה-URL להורדה
//             }
//         } catch (error) {
//             console.error('שגיאה בטעינת תוכן הקובץ:', error);
//             setError('אירעה שגיאה בטעינת תוכן הקובץ.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const getFileIcon = () => {
//         if (!file) return <FileIcon />;
        
//         const extension = file.fileName.split('.').pop()?.toLowerCase();
//         switch (extension) {
//             case 'pdf':
//                 return <PdfIcon color="error" fontSize="large" />;
//             case 'jpg':
//             case 'jpeg':
//             case 'png':
//             case 'gif':
//                 return <ImageIcon color="primary" fontSize="large" />;
//             case 'doc':
//             case 'docx':
//                 return <DocIcon color="primary" fontSize="large" />;
//             case 'xls':
//             case 'xlsx':
//                 return <SpreadsheetIcon color="success" fontSize="large" />;
//             default:
//                 return <FileIcon fontSize="large" />;
//         }
//     };

//     const renderFileContent = () => {
//         if (!file || !fileContent) return null;
        
//         const extension = file.fileName.split('.').pop()?.toLowerCase();
        
//         if (['jpg', 'jpeg', 'png', 'gif'].includes(extension || '')) {
//             return (
//                 <Box sx={{ textAlign: 'center', p: 2 }}>
//                     <img 
//                         src={fileContent} 
//                         alt={file.fileName} 
//                         style={{ maxWidth: '100%', maxHeight: '70vh' }} 
//                     />
//                 </Box>
//             );
//         } else if (['pdf'].includes(extension || '')) {
//             return (
//                 <Box sx={{ height: '70vh', width: '100%' }}>
//                     <iframe 
//                         src={fileContent} 
//                         title={file.fileName}
//                         width="100%"
//                         height="100%"
//                         style={{ border: 'none' }}
//                     />
//                 </Box>
//             );
//         } else if (['txt', 'json', 'html', 'css', 'js'].includes(extension || '')) {
//             return (
//                 <Paper 
//                     variant="outlined" 
//                     sx={{ 
//                         p: 2, 
//                         maxHeight: '70vh', 
//                         overflow: 'auto', 
//                         fontFamily: 'monospace',
//                         direction: 'ltr', // טקסט מקוד יוצג משמאל לימין
//                         textAlign: 'left'
//                     }}
//                 >
//                     <pre>{fileContent}</pre>
//                 </Paper>
//             );
//         } else {
//             return (
//                 <Box sx={{ textAlign: 'center', p: 4 }}>
//                     {getFileIcon()}
//                     <Typography variant="h6" sx={{ mt: 2 }}>
//                         לא ניתן להציג את תוכן הקובץ
//                     </Typography>
//                     <Button 
//                         variant="contained" 
//                         startIcon={<DownloadIcon />}
//                         sx={{ mt: 2 }}
//                         href={fileContent}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                     >
//                         הורד קובץ
//                     </Button>
//                 </Box>
//             );
//         }
//     };

//     return (
//         <Dialog 
//             open={open} 
//             onClose={onClose}
//             fullWidth
//             maxWidth="md"
//             aria-labelledby="file-viewer-dialog"
//         >
//             <DialogTitle id="file-viewer-dialog" sx={{ display: 'flex', alignItems: 'center' }}>
//                 <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
//                     {getFileIcon()}
//                     <Typography variant="h6" sx={{ ml: 2 }}>
//                         {file?.fileName}
//                     </Typography>
//                 </Box>
// //                 <IconButton 
//                     edge="end" 
//                     color="inherit" 
//                     onClick={onClose} 
//                     aria-label="close"
//                 >
//                     <CloseIcon />
//                 </IconButton>
//             </DialogTitle>
            
//             <DialogContent dividers>
//                 {loading ? (
//                     <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
//                         <CircularProgress />
//                     </Box>
//                 ) : error ? (
//                     <Box sx={{ textAlign: 'center', p: 4 }}>
//                         <Typography color="error">{error}</Typography>
//                         {fileContent && (
//                             <Button 
//                                 variant="contained" 
//                                 startIcon={<DownloadIcon />}
//                                 sx={{ mt: 2 }}
//                                 href={fileContent}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                             >
//                                 הורד קובץ
//                             </Button>
//                         )}
//                     </Box>
//                 ) : (
//                     renderFileContent()
//                 )}
//             </DialogContent>
            
//             <DialogActions>
//                 {file && fileContent && (
//                     <Button 
//                         startIcon={<DownloadIcon />}
//                         href={fileContent}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                     >
//                         הורד
//                     </Button>
//                 )}
//                 <Button onClick={onClose} color="primary">
//                     סגור
//                 </Button>
//             </DialogActions>
//         </Dialog>
//     );
// };

// export default FileViewer;
//#endregion


//#region Old 

// "use client"

// import type React from "react"
// import { useState, useEffect } from "react"
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   IconButton,
//   Typography,
//   Box,
//   CircularProgress,
//   useTheme,
// } from "@mui/material"
// import {
//   Close as CloseIcon,
//   GetApp as DownloadIcon,
//   ZoomIn as ZoomInIcon,
//   ZoomOut as ZoomOutIcon,
// } from "@mui/icons-material"
// import type { FileType } from "../../models/FileType"
// import { getFileTypeLabel } from "./FileUtils";
// // import { getFileType, downloadFile } from "../fileManager/FileUtils"

// interface FileViewerProps {
//   open: boolean
//   onClose: () => void
//   file: FileType
// }

// const FileViewer: React.FC<FileViewerProps> = ({ open, onClose, file }) => {
//   const theme = useTheme()
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const [zoom, setZoom] = useState(1)
//   const fileType = getFileTypeLabel(file.fileName).toLowerCase()
// console.log(file.fileUrl);

//   useEffect(() => {
//     if (open) {
//       setLoading(true)
//       setError(null)
//       setZoom(1)

//       // Simulate loading
//       const timer = setTimeout(() => {
//         setLoading(false)
//       }, 1000)

//       return () => clearTimeout(timer)
//     }
//   }, [open, file])

// //   const handleDownload = () => {
// //     if (file?.fileUrl) {
// //       downloadFile(file.fileUrl, file.fileName)
// //     } else {
// //       // Mock URL for demo
// //       const mockUrl = `https://example.com/files/${file?.id}/${file?.fileName}`
// //       downloadFile(mockUrl, file.fileName)
// //     }
// //   }

//   const handleZoomIn = () => {
//     setZoom((prev) => Math.min(prev + 0.25, 3))
//   }

//   const handleZoomOut = () => {
//     setZoom((prev) => Math.max(prev - 0.25, 0.5))
//   }

//   const renderFileContent = () => {
//     if (loading) {
//       return (
//         <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", p: 4 }}>
//           <CircularProgress />
//         </Box>
//       )
//     }

//     if (error) {
//       return (
//         <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", p: 4 }}>
//           <Typography color="error">{error}</Typography>
//         </Box>
//       )
//     }

//     // Handle different file types
//     if (fileType.includes("image")) {
//       return (
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             height: "100%",
//             overflow: "auto",
//             p: 2,
//           }}
//         >
//           <img
//             src={encodeURIComponent(file.fileUrl) || `/placeholder.svg?height=600&width=800`}
//             alt={file.fileName}
//             style={{
//               maxWidth: "100%",
//               maxHeight: "100%",
//               transform: `scale(${zoom})`,
//               transition: "transform 0.2s ease",
//             }}
//           />
//         </Box>
//       )
//     } else if (fileType === "pdf") {
//       // For PDF files, use an iframe with proper styling
//       return (
//         <Box
//           sx={{
//             height: "100%",
//             width: "100%",
//             overflow: "hidden",
//             display: "flex",
//             flexDirection: "column",
//           }}
//         >
//           <iframe
//             src={`${encodeURIComponent(file.fileUrl) || "https://mozilla.github.io/pdf.js/web/viewer.html"}#zoom=${zoom * 100}`}
//             title={file.fileName}
//             width="100%"
//             height="100%"
//             style={{
//               border: "none",
//               flexGrow: 1,
//             }}
//           />
//         </Box>
//       )
//     } else if (fileType === "document") {
//       // For DOCX files, we can use Google Docs Viewer or Microsoft Office Online
//       return (
//         <Box
//           sx={{
//             height: "100%",
//             width: "100%",
//             overflow: "hidden",
//           }}
//         >
//           <iframe
//             src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(file.fileUrl || "https://example.com/sample.docx")}`}
//             title={file.fileName}
//             width="100%"
//             height="100%"
//             style={{ border: "none" }}
//           />
//         </Box>
//       )
//     } else {
//       // For unsupported file types
//       return (
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             alignItems: "center",
//             height: "100%",
//             p: 4,
//             textAlign: "center",
//           }}
//         >
//           <Typography variant="h6" sx={{ mb: 2 }}>
//             Preview not available for this file type
//           </Typography>
//           <Button
//             variant="contained"
//             startIcon={<Icon />}
//             // onClick={handleDownload}
//             sx={{
//               mt: 2,
//               borderRadius: 50,
//               px: 3,
//               background: "linear-gradient(to right, #0d9488, #10b981)",
//               "&:hover": {
//                 background: "linear-gradient(to right, #0f766e, #047857)",
//               },
//             }}
//           >
//             Download to view
//           </Button>
//         </Box>
//       )
//     }
//   }

//   return (
//     <Dialog
//       open={open}
//       onClose={onClose}
//       maxWidth="lg"
//       fullWidth
//       PaperProps={{
//         sx: {
//           borderRadius: 2,
//           height: "80vh",
//           maxHeight: "80vh",
//           display: "flex",
//           flexDirection: "column",
//           overflow: "hidden",
//         },
//       }}
//     >
//       <DialogTitle
//         sx={{
//           p: 2,
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           borderBottom: "1px solid",
//           borderColor: theme.palette.divider,
//         }}
//       >
//         <Typography variant="h6" sx={{ fontWeight: 500, display: "flex", alignItems: "center" }}>
//           {file.fileName}
//         </Typography>
//         <Box sx={{ display: "flex", gap: 1 }}>
//           <IconButton size="small" onClick={handleZoomOut} disabled={zoom <= 0.5}>
//             <ZoomOutIcon fontSize="small" />
//           </IconButton>
//           <Typography variant="body2" sx={{ display: "flex", alignItems: "center", mx: 1 }}>
//             {Math.round(zoom * 100)}%
//           </Typography>
//           <IconButton size="small" onClick={handleZoomIn} disabled={zoom >= 3}>
//             <ZoomInIcon fontSize="small" />
//           </IconButton>
//           <IconButton size="small" 
//         //   onClick={handleDownload}
//           >
//             <DownloadIcon fontSize="small" />
//           </IconButton>
//           <IconButton size="small" onClick={onClose}>
//             <CloseIcon fontSize="small" />
//           </IconButton>
//         </Box>
//       </DialogTitle>

//       <DialogContent sx={{ p: 0, flexGrow: 1, overflow: "hidden" }}>{renderFileContent()}</DialogContent>

//       <DialogActions sx={{ p: 2, borderTop: "1px solid", borderColor: theme.palette.divider }}>
//         <Button
//           onClick={onClose}
//           variant="outlined"
//           sx={{
//             borderRadius: 50,
//             px: 3,
//           }}
//         >
//           Close
//         </Button>
//         <Button
//         //   onClick={handleDownload}
//           variant="contained"
//           startIcon={<DownloadIcon />}
//           sx={{
//             borderRadius: 50,
//             px: 3,
//             background: "linear-gradient(to right, #0d9488, #10b981)",
//             "&:hover": {
//               background: "linear-gradient(to right, #0f766e, #047857)",
//             },
//           }}
//         >
//           Download
//         </Button>
//       </DialogActions>
//     </Dialog>
//   )
// }

// export default FileViewer
//#endregion

 //#region Old
// "use client"

// import type React from "react"
// import { useState, useEffect } from "react"
// import {
//   Box,
//   Typography,
//   IconButton,
//   Paper,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   CircularProgress,
//   Tooltip,
//   Divider,
//   useTheme,
//   alpha,
//   Slide,
//   Zoom,
//   Fade,
//   Chip,
// } from "@mui/material"
// import {
//   Close as CloseIcon,
//   PictureAsPdf as PdfIcon,
//   Image as ImageIcon,
//   Description as DocIcon,
//   TableChart as SpreadsheetIcon,
//   InsertDriveFile as FileIcon,
//   Download as DownloadIcon,
//   Refresh as RefreshIcon,
//   ZoomIn as ZoomInIcon,
//   ZoomOut as ZoomOutIcon,
//   ErrorOutline as ErrorIcon,
//   Info as InfoIcon,
// } from "@mui/icons-material"
// import axios from "axios"
// import type { FileType } from "../../models/FileType"

// interface FileViewerProps {
//   file: FileType | null
//   open: boolean
//   onClose: () => void
// }

// const FileViewer: React.FC<FileViewerProps> = ({ file, open, onClose }) => {
//   const theme = useTheme()
//   const [fileUrl, setFileUrl] = useState<string | null>(null)
//   const [loading, setLoading] = useState<boolean>(false)
//   const [error, setError] = useState<string | null>(null)
//   const [refreshing, setRefreshing] = useState<boolean>(false)
//   const [zoom, setZoom] = useState<number>(1)
//   const [fileInfo, setFileInfo] = useState<{ size: string; type: string; lastModified: string } | null>(null)
//   const [showInfo, setShowInfo] = useState<boolean>(false)

//   useEffect(() => {
//     if (file && open) {
//       fetchFileUrl(file)
//     } else {
//       setFileUrl(null)
//       setError(null)
//       setZoom(1)
//       setShowInfo(false)
//     }
//   }, [file, open])

//   const fetchFileUrl = async (fileData: FileType) => {
//     setLoading(true)
//     setError(null)

//     try {
        
//       // Get the URL for viewing the file
//       const response = await axios.get(`http://localhost:5066/api/File/download/${fileData.fileName}`)
//       console.log("url", response.data)

//       const viewUrl = response.data.url
//       setFileUrl(viewUrl)

//       // Set file information
//       setFileInfo({
//         size: formatFileSize(fileData.fileSize || 0),
//         type: getFileTypeLabel(fileData.fileName),
//         lastModified: formatDate(fileData.updatedAt || fileData.createdAt || ""),
//       })
//     } catch (error) {
//       console.error("Error loading file:", error)
//       setError("Error loading file. The URL may have expired.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleRefresh = async () => {
//     if (!file) return

//     setRefreshing(true)
//     try {
//       await fetchFileUrl(file)
//     } finally {
//       setRefreshing(false)
//     }
//   }

//   const handleDownload = () => {
//     if (!fileUrl || !file) return

//     // Create a temporary anchor element for download
//     const anchor = document.createElement("a")
//     anchor.href = fileUrl
//     anchor.download = file.fileName
//     document.body.appendChild(anchor)
//     anchor.click()
//     document.body.removeChild(anchor)
//   }

//   const handleZoomIn = () => {
//     setZoom((prev) => Math.min(prev + 0.25, 3))
//   }

//   const handleZoomOut = () => {
//     setZoom((prev) => Math.max(prev - 0.25, 0.5))
//   }

//   const getFileIcon = () => {
//     if (!file) return <FileIcon />

//     const extension = file.fileName.split(".").pop()?.toLowerCase()
//     switch (extension) {
//       case "pdf":
//         return <PdfIcon sx={{ color: "#e53935" }} fontSize="large" />
//       case "jpg":
//       case "jpeg":
//       case "png":
//       case "gif":
//         return <ImageIcon sx={{ color: "#43a047" }} fontSize="large" />
//       case "doc":
//       case "docx":
//         return <DocIcon sx={{ color: "#1e88e5" }} fontSize="large" />
//       case "xls":
//       case "xlsx":
//         return <SpreadsheetIcon sx={{ color: "#7cb342" }} fontSize="large" />
//       default:
//         return <FileIcon sx={{ color: "#757575" }} fontSize="large" />
//     }
//   }

//   const renderFileContent = () => {
//     if (!file || !fileUrl) return null

//     const extension = file.fileName.split(".").pop()?.toLowerCase()

//     if (["jpg", "jpeg", "png", "gif"].includes(extension || "")) {
//       return (
//         <Fade in={!loading}>
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               height: "100%",
//               overflow: "auto",
//               bgcolor: alpha(theme.palette.common.black, 0.03),
//               p: 2,
//             }}
//           >
//             <img
//               src={fileUrl || "/placeholder.svg"}
//               alt={file.fileName}
//               style={{
//                 maxWidth: "100%",
//                 maxHeight: "100%",
//                 transform: `scale(${zoom})`,
//                 transition: "transform 0.2s ease",
//                 boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
//               }}
//               crossOrigin="anonymous"
//             />
//           </Box>
//         </Fade>
//       )
//     } else if (["pdf"].includes(extension || "")) {
//       return (
//         <Fade in={!loading}>
//           <Box
//             sx={{
//               height: "100%",
//               width: "100%",
//               overflow: "hidden",
//               display: "flex",
//               flexDirection: "column",
//               bgcolor: "white",
//               borderRadius: 1,
//               boxShadow: "inset 0 0 10px rgba(0,0,0,0.05)",
//             }}
//           >
//             <object
//               data={fileUrl}
//               type="application/pdf"
//               width="100%"
//               height="100%"
//               style={{
//                 border: "none",
//                 flexGrow: 1,
//               }}
//             >
//               <Box
//                 sx={{
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   height: "100%",
//                   p: 4,
//                   textAlign: "center",
//                 }}
//               >
//                 <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
//                   Unable to display PDF
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 400 }}>
//                   Your browser doesn't support PDF viewing or the URL has expired. Please download the file to view it.
//                 </Typography>
//                 <Button
//                   variant="contained"
//                   startIcon={<DownloadIcon />}
//                   onClick={handleDownload}
//                   sx={{
//                     borderRadius: 50,
//                     px: 3,
//                     py: 1,
//                     background: "linear-gradient(to right, #0d9488, #10b981)",
//                     "&:hover": {
//                       background: "linear-gradient(to right, #0f766e, #047857)",
//                     },
//                     boxShadow: "0 4px 10px rgba(16, 185, 129, 0.2)",
//                   }}
//                 >
//                   Download File
//                 </Button>
//               </Box>
//             </object>
//           </Box>
//         </Fade>
//       )
//     } else if (["txt", "json", "html", "css", "js"].includes(extension || "")) {
//       // For text files, display content in a code box
//       return (
//         <Fade in={!loading}>
//           <Paper
//             variant="outlined"
//             sx={{
//               p: 3,
//               height: "100%",
//               overflow: "auto",
//               fontFamily: "monospace",
//               direction: "ltr",
//               textAlign: "left",
//               bgcolor: alpha(theme.palette.common.black, 0.02),
//               borderRadius: 2,
//               boxShadow: "inset 0 0 10px rgba(0,0,0,0.05)",
//             }}
//           >
//             <Box sx={{ position: "relative" }}>
//               <Button
//                 variant="contained"
//                 size="small"
//                 startIcon={<DownloadIcon />}
//                 onClick={handleDownload}
//                 sx={{
//                   position: "absolute",
//                   top: 0,
//                   right: 0,
//                   borderRadius: 20,
//                   background: "linear-gradient(to right, #0d9488, #10b981)",
//                   "&:hover": {
//                     background: "linear-gradient(to right, #0f766e, #047857)",
//                   },
//                 }}
//               >
//                 Download
//               </Button>
//               <Typography variant="body2" component="div" sx={{ mt: 5 }}>
//                 <pre style={{ margin: 0, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
//                   {/* Content would go here, but we're showing a message instead */}
//                   Content preview is not available. Please download the file to view its contents.
//                 </pre>
//               </Typography>
//             </Box>
//           </Paper>
//         </Fade>
//       )
//     } else if (["doc", "docx"].includes(extension || "")) {
//       // For Word documents, use Microsoft Office Online Viewer
//       const encodedUrl = encodeURIComponent(fileUrl)
//       const viewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodedUrl}`

//       return (
//         <Fade in={!loading}>
//           <Box
//             sx={{
//               height: "100%",
//               width: "100%",
//               overflow: "hidden",
//               display: "flex",
//               flexDirection: "column",
//               bgcolor: "white",
//               borderRadius: 1,
//               boxShadow: "inset 0 0 10px rgba(0,0,0,0.05)",
//             }}
//           >
//             <iframe
//               src={viewerUrl}
//               title={file.fileName}
//               width="100%"
//               height="100%"
//               style={{
//                 border: "none",
//                 flexGrow: 1,
//               }}
//             />
//           </Box>
//         </Fade>
//       )
//     } else {
//       // For other files that can't be displayed
//       return (
//         <Fade in={!loading}>
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               justifyContent: "center",
//               height: "100%",
//               p: 4,
//               textAlign: "center",
//             }}
//           >
//             <Zoom in={true}>
//               <Box
//                 sx={{
//                   p: 3,
//                   borderRadius: "50%",
//                   bgcolor: alpha(theme.palette.primary.main, 0.1),
//                   mb: 3,
//                 }}
//               >
//                 {getFileIcon()}
//               </Box>
//             </Zoom>
//             <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
//               Cannot display file content
//             </Typography>
//             <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 400 }}>
//               This file type is not supported for preview. Please download the file to view its contents.
//             </Typography>
//             <Button
//               variant="contained"
//               startIcon={<DownloadIcon />}
//               onClick={handleDownload}
//               sx={{
//                 borderRadius: 50,
//                 px: 3,
//                 py: 1,
//                 background: "linear-gradient(to right, #0d9488, #10b981)",
//                 "&:hover": {
//                   background: "linear-gradient(to right, #0f766e, #047857)",
//                 },
//                 boxShadow: "0 4px 10px rgba(16, 185, 129, 0.2)",
//               }}
//             >
//               Download File
//             </Button>
//           </Box>
//         </Fade>
//       )
//     }
//   }

//   const renderError = () => {
//     return (
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center",
//           height: "100%",
//           p: 4,
//           textAlign: "center",
//         }}
//       >
//         <ErrorIcon color="error" sx={{ fontSize: 48, mb: 2 }} />
//         <Typography variant="h6" color="error" sx={{ mb: 2 }}>
//           Error Loading File
//         </Typography>
//         <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 400 }}>
//           {error || "An unexpected error occurred. The URL may have expired or the file is no longer available."}
//         </Typography>
//         <Button
//           variant="contained"
//           startIcon={<RefreshIcon />}
//           onClick={handleRefresh}
//           disabled={refreshing}
//           sx={{
//             borderRadius: 50,
//             px: 3,
//             py: 1,
//             background: "linear-gradient(to right, #0d9488, #10b981)",
//             "&:hover": {
//               background: "linear-gradient(to right, #0f766e, #047857)",
//             },
//             boxShadow: "0 4px 10px rgba(16, 185, 129, 0.2)",
//           }}
//         >
//           {refreshing ? "Refreshing..." : "Refresh File"}
//         </Button>
//       </Box>
//     )
//   }

//   return (
//     <Dialog
//       open={open}
//       onClose={onClose}
//       fullWidth
//       maxWidth="lg"
//       PaperProps={{
//         sx: {
//           borderRadius: 2,
//           height: "85vh",
//           maxHeight: "85vh",
//           display: "flex",
//           flexDirection: "column",
//           overflow: "hidden",
//           boxShadow: "0 10px 40px rgba(0, 0, 0, 0.15)",
//         },
//       }}
//       TransitionComponent={Slide}
//       TransitionProps={{ direction: "up" }}
//     >
//       <DialogTitle
//         sx={{
//           p: 2,
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           borderBottom: "1px solid",
//           borderColor: theme.palette.divider,
//           bgcolor: alpha(theme.palette.primary.main, 0.03),
//         }}
//       >
//         <Box sx={{ display: "flex", alignItems: "center" }}>
//           {getFileIcon()}
//           <Typography variant="h6" sx={{ ml: 2, fontWeight: 500 }}>
//             {file?.fileName}
//           </Typography>
//           {fileInfo && (
//             <Tooltip title="Show file details">
//               <IconButton
//                 size="small"
//                 onClick={() => setShowInfo(!showInfo)}
//                 sx={{ ml: 1, color: showInfo ? theme.palette.primary.main : "inherit" }}
//               >
//                 <InfoIcon fontSize="small" />
//               </IconButton>
//             </Tooltip>
//           )}
//         </Box>

//         <Box sx={{ display: "flex", gap: 0.5 }}>
//           {/* Zoom buttons only for images */}
//           {file && ["jpg", "jpeg", "png", "gif"].includes(file.fileName.split(".").pop()?.toLowerCase() || "") && (
//             <>
//               <Tooltip title="Zoom Out">
//                 <IconButton size="small" onClick={handleZoomOut} disabled={zoom <= 0.5}>
//                   <ZoomOutIcon fontSize="small" />
//                 </IconButton>
//               </Tooltip>
//               <Typography variant="body2" sx={{ display: "flex", alignItems: "center", mx: 1 }}>
//                 {Math.round(zoom * 100)}%
//               </Typography>
//               <Tooltip title="Zoom In">
//                 <IconButton size="small" onClick={handleZoomIn} disabled={zoom >= 3}>
//                   <ZoomInIcon fontSize="small" />
//                 </IconButton>
//               </Tooltip>
//               <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
//             </>
//           )}

//           <Tooltip title="Refresh">
//             <IconButton size="small" onClick={handleRefresh} disabled={refreshing || loading}>
//               <RefreshIcon fontSize="small" />
//             </IconButton>
//           </Tooltip>

//           <Tooltip title="Download">
//             <IconButton size="small" onClick={handleDownload} disabled={!fileUrl || loading}>
//               <DownloadIcon fontSize="small" />
//             </IconButton>
//           </Tooltip>

//           <Tooltip title="Close">
//             <IconButton size="small" onClick={onClose} sx={{ ml: 0.5 }}>
//               <CloseIcon fontSize="small" />
//             </IconButton>
//           </Tooltip>
//         </Box>
//       </DialogTitle>

//       {showInfo && fileInfo && (
//         <Box
//           sx={{
//             p: 2,
//             bgcolor: alpha(theme.palette.primary.main, 0.02),
//             borderBottom: "1px solid",
//             borderColor: theme.palette.divider,
//             display: "flex",
//             flexWrap: "wrap",
//             gap: 2,
//           }}
//         >
//           <Chip icon={<FileIcon fontSize="small" />} label={`Type: ${fileInfo.type}`} variant="outlined" size="small" />
//           <Chip icon={<InfoIcon fontSize="small" />} label={`Size: ${fileInfo.size}`} variant="outlined" size="small" />
//           <Chip
//             icon={<InfoIcon fontSize="small" />}
//             label={`Modified: ${fileInfo.lastModified}`}
//             variant="outlined"
//             size="small"
//           />
//         </Box>
//       )}

//       <DialogContent
//         sx={{
//           p: 0,
//           flexGrow: 1,
//           overflow: "hidden",
//           display: "flex",
//           position: "relative",
//         }}
//       >
//         {loading ? (
//           <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
//             <CircularProgress size={40} thickness={4} />
//           </Box>
//         ) : error ? (
//           renderError()
//         ) : (
//           renderFileContent()
//         )}
//       </DialogContent>

//       <DialogActions
//         sx={{
//           p: 2,
//           borderTop: "1px solid",
//           borderColor: theme.palette.divider,
//           bgcolor: alpha(theme.palette.primary.main, 0.03),
//         }}
//       >
//         <Button
//           onClick={handleRefresh}
//           startIcon={<RefreshIcon />}
//           disabled={refreshing || loading}
//           variant="outlined"
//           sx={{ borderRadius: 50, px: 3 }}
//         >
//           {refreshing ? "Refreshing..." : "Refresh"}
//         </Button>

//         <Button
//           onClick={handleDownload}
//           startIcon={<DownloadIcon />}
//           disabled={!fileUrl || loading}
//           variant="outlined"
//           sx={{ borderRadius: 50, px: 3 }}
//         >
//           Download
//         </Button>

//         <Button
//           onClick={onClose}
//           variant="contained"
//           sx={{
//             borderRadius: 50,
//             px: 3,
//             ml: 1,
//             background: "linear-gradient(to right, #0d9488, #10b981)",
//             "&:hover": {
//               background: "linear-gradient(to right, #0f766e, #047857)",
//             },
//           }}
//         >
//           Close
//         </Button>
//       </DialogActions>
//     </Dialog>
//   )
// }

// // Helper functions
// const formatFileSize = (bytes: number): string => {
//   if (bytes === 0) return "0 Bytes"
//   const k = 1024
//   const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
//   const i = Math.floor(Math.log(bytes) / Math.log(k))
//   return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
// }

// const formatDate = (dateString: string): string => {
//   if (!dateString) return "Unknown"

//   try {
//     const date = new Date(dateString)
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     })
//   } catch (error) {
//     return "Unknown"
//   }
// }

// const getFileTypeLabel = (fileName: string): string => {
//   const extension = fileName.split(".").pop()?.toLowerCase()
//   switch (extension) {
//     case "pdf":
//       return "PDF Document"
//     case "doc":
//     case "docx":
//       return "Word Document"
//     case "xls":
//     case "xlsx":
//       return "Excel Spreadsheet"
//     case "ppt":
//     case "pptx":
//       return "PowerPoint Presentation"
//     case "jpg":
//     case "jpeg":
//     case "png":
//     case "gif":
//       return "Image"
//     case "txt":
//       return "Text File"
//     case "json":
//       return "JSON File"
//     case "html":
//       return "HTML File"
//     case "css":
//       return "CSS File"
//     case "js":
//       return "JavaScript File"
//     default:
//       return extension ? `${extension.toUpperCase()} File` : "Unknown File"
//   }
// }

// export default FileViewer
// #endregion
// #region New

// "use client"

// import type React from "react"
// import { useState, useEffect } from "react"
// import {
//   Box,
//   Typography,
//   IconButton,
//   Paper,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   CircularProgress,
//   Tooltip,
//   Divider,
//   useTheme,
//   alpha,
//   Slide,
//   Zoom,
//   Fade,
//   Chip,
// } from "@mui/material"
// import {
//   Close as CloseIcon,
//   PictureAsPdf as PdfIcon,
//   Image as ImageIcon,
//   Description as DocIcon,
//   TableChart as SpreadsheetIcon,
//   InsertDriveFile as FileIcon,
//   Download as DownloadIcon,
//   Refresh as RefreshIcon,
//   ZoomIn as ZoomInIcon,
//   ZoomOut as ZoomOutIcon,
//   ErrorOutline as ErrorIcon,
//   Info as InfoIcon,
// } from "@mui/icons-material"
// import axios from "axios"
// import type { FileType } from "../../models/FileType"
// import { getFileTypeIcon } from "./FileUtils"

// interface FileViewerProps {
//   file: FileType | null
//   open: boolean
//   onClose: () => void
// }

// const FileViewer: React.FC<FileViewerProps> = ({ file, open, onClose }) => {
//   const theme = useTheme()
//   const [fileUrl, setFileUrl] = useState<string | null>(null)
//   const [loading, setLoading] = useState<boolean>(false)
//   const [error, setError] = useState<string | null>(null)
//   const [refreshing, setRefreshing] = useState<boolean>(false)
//   const [zoom, setZoom] = useState<number>(1)
//   const [fileInfo, setFileInfo] = useState<{ size: string; type: string; lastModified: string } | null>(null)
//   const [showInfo, setShowInfo] = useState<boolean>(false)

//   useEffect(() => {
//     if (file && open) {
//       fetchFileUrl(file)
//     } else {
//       setFileUrl(null)
//       setError(null)
//       setZoom(1)
//       setShowInfo(false)
//     }
//   }, [file, open])

//   const fetchFileUrl = async (fileData: FileType) => {
//     setLoading(true)
//     setError(null)

//     try {
//       // Get the URL for viewing the file
//       const response = await axios.get(`http://localhost:5066/api/File/download/${fileData.fileName}`)
//       console.log("url", response.data)

//       const viewUrl = response.data.url
//       setFileUrl(viewUrl)

//       // Set file information
//       setFileInfo({
//         size: formatFileSize(fileData.fileSize || 0),
//         type: getFileTypeLabel(fileData.fileName),
//         lastModified: formatDate(fileData.updatedAt || fileData.createdAt || ""),
//       })
//     } catch (error) {
//       console.error("Error loading file:", error)
//       setError("Error loading file. The URL may have expired.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleRefresh = async () => {
//     if (!file) return

//     setRefreshing(true)
//     try {
//       await fetchFileUrl(file)
//     } finally {
//       setRefreshing(false)
//     }
//   }

//   const handleDownload = () => {
//     if (!fileUrl || !file) return

//     // Create a temporary anchor element for download
//     const anchor = document.createElement("a")
//     anchor.href = fileUrl
//     anchor.download = file.fileName
//     document.body.appendChild(anchor)
//     anchor.click()
//     document.body.removeChild(anchor)
//   }

//   const handleZoomIn = () => {
//     setZoom((prev) => Math.min(prev + 0.25, 3))
//   }

//   const handleZoomOut = () => {
//     setZoom((prev) => Math.max(prev - 0.25, 0.5))
//   }

// //   const getFileIcon = () => {
// //     if (!file) return <FileIcon />

// //     const extension = file.fileName.split(".").pop()?.toLowerCase()
// //     switch (extension) {
// //       case "pdf":
// //         return <PdfIcon sx={{ color: "#e53935" }} fontSize="large" />
// //       case "jpg":
// //       case "jpeg":
// //       case "png":
// //       case "gif":
// //         return <ImageIcon sx={{ color: "#43a047" }} fontSize="large" />
// //       case "doc":
// //       case "docx":
// //         return <DocIcon sx={{ color: "#1e88e5" }} fontSize="large" />
// //       case "xls":
// //       case "xlsx":
// //         return <SpreadsheetIcon sx={{ color: "#7cb342" }} fontSize="large" />
// //       default:
// //         return <FileIcon sx={{ color: "#757575" }} fontSize="large" />
// //     }
// //   }

//   const renderFileContent = () => {
//     if (!file || !fileUrl) return null

//     const extension = file.fileName.split(".").pop()?.toLowerCase()

//     if (["jpg", "jpeg", "png", "gif"].includes(extension || "")) {
//       return (
//         <Fade in={!loading}>
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               height: "100%",
//               overflow: "auto",
//               bgcolor: alpha(theme.palette.common.black, 0.03),
//               p: 2,
//             }}
//           >
//             <img
//               src={fileUrl || "/placeholder.svg"}
//               alt={file.fileName}
//               style={{
//                 maxWidth: "100%",
//                 maxHeight: "100%",
//                 transform: `scale(${zoom})`,
//                 transition: "transform 0.2s ease",
//                 boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
//               }}
//               crossOrigin="anonymous"
//             />
//           </Box>
//         </Fade>
//       )
//     } else if (["pdf"].includes(extension || "")) {
//       return (
//         <Fade in={!loading}>
//           <Box
//             sx={{
//               height: "100%",
//               width: "100%",
//               overflow: "hidden",
//               display: "flex",
//               flexDirection: "column",
//               bgcolor: "white",
//               borderRadius: 1,
//             }}
//           >
//             <iframe
//               src={fileUrl}
//               title={file.fileName}
//               width="100%"
//               height="100%"
//               style={{
//                 border: "none",
//                 flexGrow: 1,
//               }}
//             />
//           </Box>
//         </Fade>
//       )
//     // } else if (["txt", "json", "html", "css", "js"].includes(extension || "")) {
//     //   // For text files, display content in a code box
//     //   return (
//     //     <Fade in={!loading}>
//     //       <Paper
//     //         variant="outlined"
//     //         sx={{
//     //           p: 3,
//     //           height: "100%",
//     //           overflow: "auto",
//     //           fontFamily: "monospace",
//     //           direction: "ltr",
//     //           textAlign: "left",
//     //           bgcolor: alpha(theme.palette.common.black, 0.02),
//     //           borderRadius: 2,
//     //           boxShadow: "inset 0 0 10px rgba(0,0,0,0.05)",
//     //         }}
//     //       >
//     //         <Box sx={{ position: "relative" }}>
//     //           <Button
//     //             variant="contained"
//     //             size="small"
//     //             startIcon={<DownloadIcon />}
//     //             onClick={handleDownload}
//     //             sx={{
//     //               position: "absolute",
//     //               top: 0,
//     //               right: 0,
//     //               borderRadius: 20,
//     //               background: "linear-gradient(to right, #0d9488, #10b981)",
//     //               "&:hover": {
//     //                 background: "linear-gradient(to right, #0f766e, #047857)",
//     //               },
//     //             }}
//     //           >
//     //             Download
//     //           </Button>
//     //           <Typography variant="body2" component="div" sx={{ mt: 5 }}>
//     //             <pre style={{ margin: 0, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
//     //               {/* Content would go here, but we're showing a message instead */}
//     //               Content preview is not available. Please download the file to view its contents.
//     //             </pre>
//     //           </Typography>
//     //         </Box>
//     //       </Paper>
//     //     </Fade>
//     //   )
//     } 
//     // else if (["doc", "docx"].includes(extension || "")) {
//     //   // For Word documents, use PDF-like viewer instead of Office Online
//     //   return (
//     //     <Fade in={!loading}>
//     //       <Box
//     //         sx={{
//     //           height: "100%",
//     //           width: "100%",
//     //           overflow: "hidden",
//     //           display: "flex",
//     //           flexDirection: "column",
//     //           bgcolor: "white",
//     //           borderRadius: 1,
//     //         }}
//     //       >
//     //         <iframe
//     //           src={fileUrl}
//     //           title={file.fileName}
//     //           width="100%"
//     //           height="100%"
//     //           style={{
//     //             border: "none",
//     //             flexGrow: 1,
//     //           }}
//     //         />
//     //       </Box>
//     //     </Fade>
//     //   )
//     // }
//  else if (["doc", "docx"].includes(extension || "")) {
//           // For Word documents, use Microsoft Office Online Viewer
//           const encodedUrl = encodeURIComponent(fileUrl)
//           const viewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodedUrl}`
    
//           return (
//             <Fade in={!loading}>
//               <Box
//                 sx={{
//                   height: "100%",
//                   width: "100%",
//                   overflow: "hidden",
//                   display: "flex",
//                   flexDirection: "column",
//                   bgcolor: "white",
//                   borderRadius: 1,
//                   boxShadow: "inset 0 0 10px rgba(0,0,0,0.05)",
//                 }}
//               >
//                 <iframe
//                   src={viewerUrl}
//                   title={file.fileName}
//                   width="100%"
//                   height="100%"
//                   style={{
//                     border: "none",
//                     flexGrow: 1,
//                   }}
//                 />
//               </Box>
//             </Fade>
//           )
//         } 
//     else {
//       // For other files that can't be displayed
//       return (
//         <Fade in={!loading}>
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               justifyContent: "center",
//               height: "100%",
//               p: 4,
//               textAlign: "center",
//             }}
//           >
//             <Zoom in={true}>
//               <Box
//                 sx={{
//                   p: 3,
//                   borderRadius: "50%",
//                   bgcolor: alpha(theme.palette.primary.main, 0.1),
//                   mb: 3,
//                 }}
//               >
//                 {getFileTypeIcon(file.fileName)}
//               </Box>
//             </Zoom>
//             <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
//               Cannot display file content
//             </Typography>
//             <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 400 }}>
//               This file type is not supported for preview. Please download the file to view its contents.
//             </Typography>
//             <Button
//               variant="contained"
//               startIcon={<DownloadIcon />}
//               onClick={handleDownload}
//               sx={{
//                 borderRadius: 50,
//                 px: 3,
//                 py: 1,
//                 background: "linear-gradient(to right, #0d9488, #10b981)",
//                 "&:hover": {
//                   background: "linear-gradient(to right, #0f766e, #047857)",
//                 },
//                 boxShadow: "0 4px 10px rgba(16, 185, 129, 0.2)",
//               }}
//             >
//               Download File
//             </Button>
//           </Box>
//         </Fade>
//       )
//     }
//   }

//   const renderError = () => {
//     return (
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center",
//           height: "100%",
//           p: 4,
//           textAlign: "center",
//         }}
//       >
//         <ErrorIcon color="error" sx={{ fontSize: 48, mb: 2 }} />
//         <Typography variant="h6" color="error" sx={{ mb: 2 }}>
//           Error Loading File
//         </Typography>
//         <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 400 }}>
//           {error || "An unexpected error occurred. The URL may have expired or the file is no longer available."}
//         </Typography>
//         <Button
//           variant="contained"
//           startIcon={<RefreshIcon />}
//           onClick={handleRefresh}
//           disabled={refreshing}
//           sx={{
//             borderRadius: 50,
//             px: 3,
//             py: 1,
//             background: "linear-gradient(to right, #0d9488, #10b981)",
//             "&:hover": {
//               background: "linear-gradient(to right, #0f766e, #047857)",
//             },
//             boxShadow: "0 4px 10px rgba(16, 185, 129, 0.2)",
//           }}
//         >
//           {refreshing ? "Refreshing..." : "Refresh File"}
//         </Button>
//       </Box>
//     )
//   }

//   return (
//     <Dialog
//       open={open}
//       onClose={onClose}
//       fullWidth
//       maxWidth="lg"
//       PaperProps={{
//         sx: {
//           borderRadius: 2,
//           height: "85vh",
//           maxHeight: "85vh",
//           display: "flex",
//           flexDirection: "column",
//           overflow: "hidden",
//           boxShadow: "0 10px 40px rgba(0, 0, 0, 0.15)",
//         },
//       }}
//       TransitionComponent={Slide}
//     //   TransitionProps={{ direction: "up" }}
//     >
//       <DialogTitle
//         sx={{
//           p: 2,
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           borderBottom: "1px solid",
//           borderColor: theme.palette.divider,
//           bgcolor: alpha(theme.palette.primary.main, 0.03),
//         }}
//       >
//         <Box sx={{ display: "flex", alignItems: "center" }}>
//           {getFileTypeIcon(file.fileName)}
//           <Typography variant="h6" sx={{ ml: 2, fontWeight: 500 }}>
//             {file?.fileName}
//           </Typography>
//           {fileInfo && (
//             <Tooltip title="Show file details">
//               <IconButton
//                 size="small"
//                 onClick={() => setShowInfo(!showInfo)}
//                 sx={{ ml: 1, color: showInfo ? theme.palette.primary.main : "inherit" }}
//               >
//                 <InfoIcon fontSize="small" />
//               </IconButton>
//             </Tooltip>
//           )}
//         </Box>

//         <Box sx={{ display: "flex", gap: 1 }}>
//           {/* Zoom buttons only for images */}
//           {file && ["jpg", "jpeg", "png", "gif"].includes(file.fileName.split(".").pop()?.toLowerCase() || "") && (
//             <>
//               <Tooltip title="Zoom Out">
//                 <IconButton size="small" onClick={handleZoomOut} disabled={zoom <= 0.5}>
//                   <ZoomOutIcon fontSize="small" />
//                 </IconButton>
//               </Tooltip>
//               <Typography variant="body2" sx={{ display: "flex", alignItems: "center", mx: 1 }}>
//                 {Math.round(zoom * 100)}%
//               </Typography>
//               <Tooltip title="Zoom In">
//                 <IconButton size="small" onClick={handleZoomIn} disabled={zoom >= 3}>
//                   <ZoomInIcon fontSize="small" />
//                 </IconButton>
//               </Tooltip>
//               <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
//             </>
//           )}

//           <Tooltip title="Refresh">
//             <IconButton
//               onClick={handleRefresh}
//               disabled={refreshing || loading}
//               sx={{
//                 bgcolor: alpha(theme.palette.primary.main, 0.1),
//                 "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.2) },
//               }}
//             >
//               <RefreshIcon />
//             </IconButton>
//           </Tooltip>

//           <Tooltip title="Download">
//             <IconButton
//               onClick={handleDownload}
//               disabled={!fileUrl || loading}
//               sx={{
//                 bgcolor: alpha(theme.palette.primary.main, 0.1),
//                 "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.2) },
//               }}
//             >
//               <DownloadIcon />
//             </IconButton>
//           </Tooltip>

//           <Tooltip title="Close">
//             <IconButton
//               onClick={onClose}
//               sx={{
//                 bgcolor: alpha(theme.palette.error.main, 0.1),
//                 "&:hover": { bgcolor: alpha(theme.palette.error.main, 0.2) },
//               }}
//             >
//               <CloseIcon />
//             </IconButton>
//           </Tooltip>
//         </Box>
//       </DialogTitle>

//       {showInfo && fileInfo && (
//         <Box
//           sx={{
//             p: 2,
//             bgcolor: alpha(theme.palette.primary.main, 0.02),
//             borderBottom: "1px solid",
//             borderColor: theme.palette.divider,
//             display: "flex",
//             flexWrap: "wrap",
//             gap: 2,
//           }}
//         >
//           <Chip icon={<FileIcon fontSize="small" />} label={`Type: ${fileInfo.type}`} variant="outlined" size="small" />
//           <Chip icon={<InfoIcon fontSize="small" />} label={`Size: ${fileInfo.size}`} variant="outlined" size="small" />
//           <Chip
//             icon={<InfoIcon fontSize="small" />}
//             label={`Modified: ${fileInfo.lastModified}`}
//             variant="outlined"
//             size="small"
//           />
//         </Box>
//       )}

//       <DialogContent
//         sx={{
//           p: 0,
//           flexGrow: 1,
//           overflow: "hidden",
//           display: "flex",
//           position: "relative",
//         }}
//       >
//         {loading ? (
//           <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
//             <CircularProgress size={40} thickness={4} />
//           </Box>
//         ) : error ? (
//           renderError()
//         ) : (
//           renderFileContent()
//         )}
//       </DialogContent>

//       <DialogActions
//         sx={{
//           p: 2,
//           borderTop: "1px solid",
//           borderColor: theme.palette.divider,
//           bgcolor: alpha(theme.palette.primary.main, 0.03),
//         }}
//       >
//         <Button
//           onClick={onClose}
//           variant="contained"
//           sx={{
//             borderRadius: 50,
//             px: 3,
//             ml: "auto", // Push to right
//             background: "linear-gradient(to right, #0d9488, #10b981)",
//             "&:hover": {
//               background: "linear-gradient(to right, #0f766e, #047857)",
//             },
//           }}
//         >
//           Close
//         </Button>
//       </DialogActions>
//     </Dialog>
//   )
// }

// // Helper functions
// const formatFileSize = (bytes: number): string => {
//   if (bytes === 0) return "0 Bytes"
//   const k = 1024
//   const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
//   const i = Math.floor(Math.log(bytes) / Math.log(k))
//   return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
// }

// const formatDate = (dateString: string): string => {
//   if (!dateString) return "Unknown"

//   try {
//     const date = new Date(dateString)
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     })
//   } catch (error) {
//     return "Unknown"
//   }
// }

// const getFileTypeLabel = (fileName: string): string => {
//   const extension = fileName.split(".").pop()?.toLowerCase()
//   switch (extension) {
//     case "pdf":
//       return "PDF Document"
//     case "doc":
//     case "docx":
//       return "Word Document"
//     case "xls":
//     case "xlsx":
//       return "Excel Spreadsheet"
//     case "ppt":
//     case "pptx":
//       return "PowerPoint Presentation"
//     case "jpg":
//     case "jpeg":
//     case "png":
//     case "gif":
//       return "Image"
//     case "txt":
//       return "Text File"
//     case "json":
//       return "JSON File"
//     case "html":
//       return "HTML File"
//     case "css":
//       return "CSS File"
//     case "js":
//       return "JavaScript File"
//     default:
//       return extension ? `${extension.toUpperCase()} File` : "Unknown File"
//   }
// }

// export default FileViewer
//#endregion
"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  Box,
  Typography,
  IconButton,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  Tooltip,
  Divider,
  useTheme,
  alpha,
  Slide,
  Zoom,
  Fade,
  Chip,
} from "@mui/material"
import {
  Close as CloseIcon,
  PictureAsPdf as PdfIcon,
  Image as ImageIcon,
  Description as DocIcon,
  TableChart as SpreadsheetIcon,
  InsertDriveFile as FileIcon,
  Download as DownloadIcon,
  Refresh as RefreshIcon,
  ZoomIn as ZoomInIcon,
  ZoomOut as ZoomOutIcon,
  ErrorOutline as ErrorIcon,
  Info as InfoIcon,
} from "@mui/icons-material"
import axios from "axios"
import type { FileType } from "../../models/FileType"
import { formatDate, formatFileSize, getFileTypeIcon, getFileTypeLabel } from "./FileUtils"

interface FileViewerProps {
  file: FileType | null
  open: boolean
  onClose: () => void
}

const FileViewer: React.FC<FileViewerProps> = ({ file, open, onClose }) => {
  console.log(file);
  
  
  
  const theme = useTheme()
  const [fileUrl, setFileUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const [zoom, setZoom] = useState<number>(1)
  const [fileInfo, setFileInfo] = useState<{ size: string; type: string; lastModified: string } | null>(null)
  const [showInfo, setShowInfo] = useState<boolean>(false)

  useEffect(() => {
    if (file && open) {
      fetchFileUrl(file)
    } else {
      setFileUrl(null)
      setError(null)
      setZoom(1)
      setShowInfo(false)
    }
  }, [file, open])

  const fetchFileUrl = async (fileData: FileType) => {
    setLoading(true)
    setError(null)

    try {
      debugger
      // Get the URL for viewing the file
      const response = await axios.get(`http://localhost:5066/api/File/download/${fileData.fileUrl}`)
      console.log("url", response.data)

const viewUrl = response.data.url ?? response.data.Url ?? response.data;
      console.log(viewUrl+"viewUrl");
      
      setFileUrl(viewUrl)

      // Set file information
      setFileInfo({
        size: formatFileSize(fileData.fileSize || 0), 
        type: getFileTypeLabel(fileData.fileName),
        lastModified: formatDate(fileData.updatedAt || fileData.createdAt || ""),
      })
    } catch (error) {
      console.error("Error loading file:", error)
      setError("Error loading file. The URL may have expired.")
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = async () => {
    if (!file) return

    setRefreshing(true)
    try {
      await fetchFileUrl(file)
    } finally {
      setRefreshing(false)
    }
  }

  const handleDownload = () => {
    if (!fileUrl || !file) return

    try {
      // For direct download, we need to fetch the file and force download
      fetch(fileUrl)
        .then((response) => response.blob())
        .then((blob) => {
          // Create a blob URL for the file
          const blobUrl = window.URL.createObjectURL(blob)

          // Create a temporary anchor element for download
          const anchor = document.createElement("a")
          anchor.href = blobUrl
          anchor.download = file.fileName // Set the filename
          anchor.style.display = "none"

          // Append to the body, click, and clean up
          document.body.appendChild(anchor)
          anchor.click()

          // Clean up
          setTimeout(() => {
            document.body.removeChild(anchor)
            window.URL.revokeObjectURL(blobUrl)
          }, 100)
        })
        .catch((err) => {
          console.error("Download failed:", err)
          // Fallback to opening in new tab if download fails
          window.open(fileUrl, "_blank")
        })
    } catch (error) {
      console.error("Error initiating download:", error)
      // Fallback to opening in new tab
      window.open(fileUrl, "_blank")
    }
  }

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.25, 3))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.25, 0.5))
  }

//   const getFileIcon = () => {
//     if (!file) return <FileIcon />

//     const extension = file.fileName.split(".").pop()?.toLowerCase()
//     switch (extension) {
//       case "pdf":
//         return <PdfIcon sx={{ color: "#e53935" }} fontSize="large" />
//       case "jpg":
//       case "jpeg":
//       case "png":
//       case "gif":
//         return <ImageIcon sx={{ color: "#43a047" }} fontSize="large" />
//       case "doc":
//       case "docx":
//         return <DocIcon sx={{ color: "#1e88e5" }} fontSize="large" />
//       case "xls":
//       case "xlsx":
//         return <SpreadsheetIcon sx={{ color: "#7cb342" }} fontSize="large" />
//       default:
//         return <FileIcon sx={{ color: "#757575" }} fontSize="large" />
//     }
//   }

  const renderFileContent = () => {
    if (!file || !fileUrl) return null

    const extension = file.fileName.split(".").pop()?.toLowerCase()

    if (["jpg", "jpeg", "png", "gif"].includes(extension || "")) {
      return (
        <Fade in={!loading}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              overflow: "auto",
              bgcolor: alpha(theme.palette.common.black, 0.03),
              p: 2,
            }}
          >
            
            <img
              src={fileUrl || "/placeholder.svg"}
              alt={file.fileName}
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                transform: `scale(${zoom})`,
                transition: "transform 0.2s ease",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              }}
              crossOrigin="anonymous"
            />
          </Box>
        </Fade>
      )
    } else if (["pdf"].includes(extension || "")) {
      return (
        <Fade in={!loading}>
          <Box
            sx={{
              height: "100%",
              width: "100%",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              bgcolor: "white",
              borderRadius: 1,
            }}
          >
            <iframe
              src={fileUrl}
              title={file.fileName}
              width="100%"
              height="100%"
              style={{
                border: "none",
                flexGrow: 1,
              }}
            />
          </Box>
        </Fade>
      )
    } else if (["txt", "json", "html", "css", "js"].includes(extension || "")) {
      // For text files, display content in a code box
      return (
        <Fade in={!loading}>
          <Paper
            variant="outlined"
            sx={{
              p: 3,
              height: "100%",
              overflow: "auto",
              fontFamily: "monospace",
              direction: "ltr",
              textAlign: "left",
              bgcolor: alpha(theme.palette.common.black, 0.02),
              borderRadius: 2,
              boxShadow: "inset 0 0 10px rgba(0,0,0,0.05)",
            }}
          >
            <Box sx={{ position: "relative" }}>
              <Button
                variant="contained"
                size="small"
                startIcon={<DownloadIcon />}
                onClick={handleDownload}
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  borderRadius: 20,
                  background: "linear-gradient(to right, #0d9488, #10b981)",
                  "&:hover": {
                    background: "linear-gradient(to right, #0f766e, #047857)",
                  },
                }}
              >
                Download
              </Button>
              <Typography variant="body2" component="div" sx={{ mt: 5 }}>
                <pre style={{ margin: 0, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                  {/* Content would go here, but we're showing a message instead */}
                  Content preview is not available. Please download the file to view its contents.
                </pre>
              </Typography>
            </Box>
          </Paper>
        </Fade>
      )
    } 
    else if (["doc", "docx"].includes(extension || "")) {
              // For Word documents, use Microsoft Office Online Viewer
              const encodedUrl = encodeURIComponent(fileUrl)
              const viewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodedUrl}`
        
              return (
                <Fade in={!loading}>
                  <Box
                    sx={{
                      height: "100%",
                      width: "100%",
                      overflow: "hidden",
                      display: "flex",
                      flexDirection: "column",
                      bgcolor: "white",
                      borderRadius: 1,
                      boxShadow: "inset 0 0 10px rgba(0,0,0,0.05)",
                    }}
                  >
                    <iframe
                      src={viewerUrl}
                      title={file.fileName}
                      width="100%"
                      height="100%"
                      style={{
                        border: "none",
                        flexGrow: 1,
                      }}
                    />
                  </Box>
                </Fade>
              )
    } else {
      // For other files that can't be displayed
      return (
        <Fade in={!loading}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              p: 4,
              textAlign: "center",
            }}
          >
            <Zoom in={true}>
              <Box
                sx={{
                  p: 3,
                  borderRadius: "50%",
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  mb: 3,
                }}
              >
                {getFileTypeIcon(file.fileName)}
              </Box>
            </Zoom>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
              Cannot display file content
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 400 }}>
              This file type is not supported for preview. Please download the file to view its contents.
            </Typography>
            <Button
              variant="contained"
              startIcon={<DownloadIcon />}
              onClick={handleDownload}
              sx={{
                borderRadius: 50,
                px: 3,
                py: 1,
                background: "linear-gradient(to right, #0d9488, #10b981)",
                "&:hover": {
                  background: "linear-gradient(to right, #0f766e, #047857)",
                },
                boxShadow: "0 4px 10px rgba(16, 185, 129, 0.2)",
              }}
            >
              Download File
            </Button>
          </Box>
        </Fade>
      )
    }
  }

  const renderError = () => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          p: 4,
          textAlign: "center",
        }}
      >
        <ErrorIcon color="error" sx={{ fontSize: 48, mb: 2 }} />
        <Typography variant="h6" color="error" sx={{ mb: 2 }}>
          Error Loading File
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 400 }}>
          {error || "An unexpected error occurred. The URL may have expired or the file is no longer available."}
        </Typography>
        <Button
          variant="contained"
          startIcon={<RefreshIcon />}
          onClick={handleRefresh}
          disabled={refreshing}
          sx={{
            borderRadius: 50,
            px: 3,
            py: 1,
            background: "linear-gradient(to right, #0d9488, #10b981)",
            "&:hover": {
              background: "linear-gradient(to right, #0f766e, #047857)",
            },
            boxShadow: "0 4px 10px rgba(16, 185, 129, 0.2)",
          }}
        >
          {refreshing ? "Refreshing..." : "Refresh File"}
        </Button>
      </Box>
    )
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="lg"
      PaperProps={{
        sx: {
          borderRadius: 2,
          height: "85vh",
          maxHeight: "85vh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.15)",
        },
      }}
      TransitionComponent={Slide}
    //   TransitionProps={{ direction: "up" }}
    >
      <DialogTitle
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid",
          borderColor: theme.palette.divider,
          bgcolor: alpha(theme.palette.primary.main, 0.03),
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {file && getFileTypeIcon(file.fileName)}
          <Typography variant="h6" sx={{ ml: 2, fontWeight: 500 }}>
            {file?.fileName}
          </Typography>
          {fileInfo && (
            <Tooltip title="Show file details">
              <IconButton
                size="small"
                onClick={() => setShowInfo(!showInfo)}
                sx={{ ml: 1, color: showInfo ? theme.palette.primary.main : "inherit" }}
              >
                <InfoIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Box sx={{ display: "flex", gap: 1 }}>
          {/* Zoom buttons only for images */}
          {file && ["jpg", "jpeg", "png", "gif"].includes(file.fileName.split(".").pop()?.toLowerCase() || "") && (
            <>
              <Tooltip title="Zoom Out">
                <IconButton size="small" onClick={handleZoomOut} disabled={zoom <= 0.5}>
                  <ZoomOutIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Typography variant="body2" sx={{ display: "flex", alignItems: "center", mx: 1 }}>
                {Math.round(zoom * 100)}%
              </Typography>
              <Tooltip title="Zoom In">
                <IconButton size="small" onClick={handleZoomIn} disabled={zoom >= 3}>
                  <ZoomInIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
            </>
          )}

          <Tooltip title="Refresh">
            <IconButton
              onClick={handleRefresh}
              disabled={refreshing || loading}
              sx={{
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.2) },
              }}
            >
              <RefreshIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Download">
            <IconButton
              onClick={handleDownload}
              disabled={!fileUrl || loading}
              sx={{
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.2) },
              }}
            >
              <DownloadIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Close">
            <IconButton
              onClick={onClose}
              sx={{
                bgcolor: alpha(theme.palette.error.main, 0.1),
                "&:hover": { bgcolor: alpha(theme.palette.error.main, 0.2) },
              }}
            >
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </DialogTitle>

      {showInfo && fileInfo && (
        <Box
          sx={{
            p: 2,
            bgcolor: alpha(theme.palette.primary.main, 0.02),
            borderBottom: "1px solid",
            borderColor: theme.palette.divider,
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Chip icon={<FileIcon fontSize="small" />} label={`Type: ${fileInfo.type}`} variant="outlined" size="small" />
          <Chip icon={<InfoIcon fontSize="small" />} label={`Size: ${fileInfo.size}`} variant="outlined" size="small" />
          <Chip
            icon={<InfoIcon fontSize="small" />}
            label={`Modified: ${fileInfo.lastModified}`}
            variant="outlined"
            size="small"
          />
        </Box>
      )}

      <DialogContent
        sx={{
          p: 0,
          flexGrow: 1,
          overflow: "hidden",
          display: "flex",
          position: "relative",
        }}
      >
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
            <CircularProgress size={40} thickness={4} />
          </Box>
        ) : error ? (
          renderError()
        ) : (
          renderFileContent()
        )}
      </DialogContent>

      <DialogActions
        sx={{
          p: 2,
          borderTop: "1px solid",
          borderColor: theme.palette.divider,
          bgcolor: alpha(theme.palette.primary.main, 0.03),
        }}
      >
        <Button
          onClick={onClose}
          variant="contained"
          sx={{
            borderRadius: 50,
            px: 3,
            ml: "auto", // Push to right
            background: "linear-gradient(to right, #0d9488, #10b981)",
            "&:hover": {
              background: "linear-gradient(to right, #0f766e, #047857)",
            },
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

// Helper functions
// const formatFileSize = (bytes: number): string => {
//   if (bytes === 0) return "0 Bytes"
//   const k = 1024
//   const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
//   const i = Math.floor(Math.log(bytes) / Math.log(k))
//   return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
// }

// const formatDate = (dateString: string): string => {
//   if (!dateString) return "Unknown"

//   try {
//     const date = new Date(dateString)
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     })
//   } catch (error) {
//     return "Unknown"
//   }
// }

// const getFileTypeLabel = (fileName: string): string => {
//   const extension = fileName.split(".").pop()?.toLowerCase()
//   switch (extension) {
//     case "pdf":
//       return "PDF Document"
//     case "doc":
//     case "docx":
//       return "Word Document"
//     case "xls":
//     case "xlsx":
//       return "Excel Spreadsheet"
//     case "ppt":
//     case "pptx":
//       return "PowerPoint Presentation"
//     case "jpg":
//     case "jpeg":
//     case "png":
//     case "gif":
//       return "Image"
//     case "txt":
//       return "Text File"
//     case "json":
//       return "JSON File"
//     case "html":
//       return "HTML File"
//     case "css":
//       return "CSS File"
//     case "js":
//       return "JavaScript File"
//     default:
//       return extension ? `${extension.toUpperCase()} File` : "Unknown File"
//   }
// }

export default FileViewer
