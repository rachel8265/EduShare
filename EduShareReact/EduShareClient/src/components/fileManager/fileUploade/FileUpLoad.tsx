//#region 
// import React, { useState } from 'react';
// import { Button, LinearProgress } from '@mui/material';
// import { CloudUpload } from '@mui/icons-material';
// import { useDispatch, useSelector } from 'react-redux';
// import { uploadFile } from './FileSlice';
// import { AppDispatch, RootStore } from '../Store';

// interface FileUploaderProps {
//     folderId: number | null;
//     userId: number;
// }

// const FileUploader: React.FC<FileUploaderProps> = ({ folderId, userId }) => {
//     const dispatch = useDispatch<AppDispatch>();
//     const { uploadProgress, loading } = useSelector((state: RootStore) => state.files);

//     const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const file = event.target.files?.[0];
//         if (file) {
//             dispatch(uploadFile({ file, folderId, userId }));
//         }
//     };

//     return (
//         <div>
//             <Button
//                 component="label"
//                 variant="contained"
//                 startIcon={<CloudUpload />}
//                 disabled={loading}
//             >
//                 העלאת קובץ
//                 <input 
//                     type="file" 
//                     hidden 
//                     onChange={handleFileUpload} 
//                 />
//             </Button>

//             {uploadProgress > 0 && (
//                 <LinearProgress 
//                     variant="determinate" 
//                     value={uploadProgress} 
//                 />
//             )}
//         </div>
//     );
// };

// export default FileUploader;
// //-----------------
// import React, { useState } from 'react';
// import { 
//     Box, Typography, Button, 
//     LinearProgress, Snackbar, Alert 
// } from '@mui/material';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import { useDispatch } from 'react-redux';
// import { uploadFile } from './FileSlice';
// import { AppDispatch } from '../Store';

// interface FileUploaderProps {
//     folderId: number | null;
//     userId: number;
// }

// const FileUploader: React.FC<FileUploaderProps> = ({ folderId, userId }) => {
//     const dispatch = useDispatch<AppDispatch>();
//     const [file, setFile] = useState<File | null>(null);
//     const [uploadProgress, setUploadProgress] = useState(0);
//     const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
//     const [errorMessage, setErrorMessage] = useState('');

//     const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const selectedFile = event.target.files?.[0];
//         if (selectedFile) {
//             // בדיקת גודל וסוג קובץ
//             const maxSize = 10 * 1024 * 1024; // 10MB
//             const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png'];

//             if (selectedFile.size > maxSize) {
//                 setErrorMessage('הקובץ גדול מדי. הגודל המרבי הוא 10MB');
//                 setUploadStatus('error');
//                 return;
//             }

//             if (!allowedTypes.includes(selectedFile.type)) {
//                 setErrorMessage('סוג קובץ לא נתמך');
//                 setUploadStatus('error');
//                 return;
//             }

//             setFile(selectedFile);
//             setUploadStatus('idle');
//         }
//     };

//     const handleUpload = async () => {
//         if (!file) return;

//         try {
//             setUploadStatus('uploading');
//             setUploadProgress(0);

//             // סימולציה של העלאה עם התקדמות
//             const uploadPromise = new Promise<void>((resolve) => {
//                 let progress = 0;
//                 const interval = setInterval(() => {
//                     progress += 20;
//                     setUploadProgress(progress);
//                     if (progress >= 100) {
//                         clearInterval(interval);
//                         resolve();
//                     }
//                 }, 200);
//             });

//             await uploadPromise;

//             // העלאת הקובץ בפועל
            
//             await dispatch(uploadFile({
//                 file,
//                 folderId,
//                 userId
//             }));
// 
//             setUploadStatus('success');
//             setFile(null);
            
//         } catch (error) {

//             console.log(error,"fileUpload");
            
//             setUploadStatus('error');
//             setErrorMessage('שגיאה בהעלאת הקובץ');
//         }
//     };

//     const handleCloseSnackbar = () => {
//         setUploadStatus('idle');
//         setErrorMessage('');
//     };

//     return (
//         <Box sx={{ my: 2, p: 2, border: '2px dashed', borderColor: 'grey.300', borderRadius: 2 }}>
//             <input
//                 type="file"
//                 id="file-upload"
//                 style={{ display: 'none' }}
//                 onChange={handleFileSelect}
//                 accept=".pdf,.docx,.jpg,.png"
//             />
//             <label htmlFor="file-upload">
//                 <Button 
//                     component="span" 
//                     variant="outlined" 
//                     startIcon={<CloudUploadIcon />}
//                 >
//                     בחר קובץ להעלאה
//                 </Button>
//             </label>

//             {file && (
//                 <Box sx={{ mt: 2 }}>
//                     <Typography variant="body2">
//                         {file.name} - {(file.size / 1024).toFixed(2)} KB
//                     </Typography>
//                     {uploadStatus === 'uploading' && (
//                         <LinearProgress 
//                             variant="determinate" 
//                             value={uploadProgress} 
//                             sx={{ mt: 1 }}
//                         />
//                     )}
//                     <Button 
//                         variant="contained" 
//                         color="primary" 
//                         onClick={handleUpload}
//                         disabled={uploadStatus === 'uploading'}
//                         sx={{ mt: 1 }}
//                     >
//                         העלה קובץ
//                     </Button>
//                 </Box>
//             )}

//             <Snackbar 
//                 open={uploadStatus === 'success' || uploadStatus === 'error'}
//                 autoHideDuration={6000}
//                 onClose={handleCloseSnackbar}
//             >
//                 <Alert 
//                     onClose={handleCloseSnackbar}
//                     severity={uploadStatus === 'success' ? 'success' : 'error'}
//                 >
//                     {uploadStatus === 'success' 
//                         ? 'הקובץ הועלה בהצלחה' 
//                         : errorMessage}
//                 </Alert>
//             </Snackbar>
//         </Box>
//     );
// };

// export default FileUploader;
//#endregion

// import React, { useState } from 'react';
// import { 
//     Box, Typography, Button, 
//     LinearProgress, Snackbar, Alert,
//     Paper, IconButton
// } from '@mui/material';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
// import CloseIcon from '@mui/icons-material/Close';
// import { useDispatch } from 'react-redux';
// import { uploadFile } from './FileSlice';
// import { AppDispatch } from '../Store';

// interface FileUploaderProps {
//     folderId: number | null;
//     userId: number;
// }

// const FileUploader: React.FC<FileUploaderProps> = ({ folderId, userId }) => {
//     const dispatch = useDispatch<AppDispatch>();
//     const [file, setFile] = useState<File | null>(null);
//     const [uploadProgress, setUploadProgress] = useState(0);
//     const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
//     const [errorMessage, setErrorMessage] = useState('');

//     const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const selectedFile = event.target.files?.[0];
//         if (selectedFile) {
//             // בדיקת גודל וסוג קובץ
//             const maxSize = 10 * 1024 * 1024; // 10MB
//             const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png'];

//             if (selectedFile.size > maxSize) {
//                 setErrorMessage('הקובץ גדול מדי. הגודל המרבי הוא 10MB');
//                 setUploadStatus('error');
//                 return;
//             }

//             if (!allowedTypes.includes(selectedFile.type)) {
//                 setErrorMessage('סוג קובץ לא נתמך');
//                 setUploadStatus('error');
//                 return;
//             }

//             setFile(selectedFile);
//             setUploadStatus('idle');
//         }
//     };

//     const handleClearFile = () => {
//         setFile(null);
//         setUploadProgress(0);
//         setUploadStatus('idle');
//     };

//     const handleUpload = async () => {
//         if (!file) return;

//         try {
//             setUploadStatus('uploading');
//             setUploadProgress(0);

//             // סימולציה של העלאה עם התקדמות
//             const uploadPromise = new Promise<void>((resolve) => {
//                 let progress = 0;
//                 const interval = setInterval(() => {
//                     progress += 20;
//                     setUploadProgress(progress);
//                     if (progress >= 100) {
//                         clearInterval(interval);
//                         resolve();
//                     }
//                 }, 200);
//             });

//             await uploadPromise;

//             // העלאת הקובץ בפועל
//             await dispatch(uploadFile({
//                 file,
//                 folderId,
//                 userId
//             }));

//             setUploadStatus('success');
//             setFile(null);
            
//         } catch (error) {
//             console.log(error, "fileUpload");
            
//             setUploadStatus('error');
//             setErrorMessage('שגיאה בהעלאת הקובץ');
//         }
//     };

//     const handleCloseSnackbar = () => {
//         setUploadStatus('idle');
//         setErrorMessage('');
//     };

//     return (
//         <Box sx={{ p: 3 }}>
//             <Box 
//                 sx={{ 
//                     display: 'flex', 
//                     flexDirection: 'column', 
//                     alignItems: 'center',
//                     p: 4, 
//                     border: '2px dashed', 
//                     borderColor: 'primary.light', 
//                     borderRadius: 2,
//                     backgroundColor: 'background.default',
//                     transition: 'all 0.3s',
//                     '&:hover': {
//                         borderColor: 'primary.main',
//                         backgroundColor: 'rgba(0, 0, 0, 0.02)',
//                     }
//                 }}
//             >
//                 <input
//                     type="file"
//                     id="file-upload"
//                     style={{ display: 'none' }}
//                     onChange={handleFileSelect}
//                     accept=".pdf,.docx,.jpg,.png"
//                 />
                
//                 {!file ? (
//                     <>
//                         <CloudUploadIcon color="primary" sx={{ fontSize: 60, mb: 2, opacity: 0.7 }} />
//                         <Typography variant="h6" align="center" sx={{ mb: 2 }}>
//                             גרור קבצים לכאן או לחץ לבחירה
//                         </Typography>
//                         <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
//                             תומך בקבצים מסוג PDF, DOCX, JPG, PNG עד 10MB
//                         </Typography>
//                         <label htmlFor="file-upload">
//                             <Button 
//                                 component="span" 
//                                 variant="contained" 
//                                 startIcon={<CloudUploadIcon />}
//                                 sx={{ direction: 'rtl' }}
//                             >
//                                 בחר קובץ
//                             </Button>
//                         </label>
//                     </>
//                 ) : (
//                     <Box sx={{ width: '100%' }}>
//                         <Paper
//                             elevation={2}
//                             sx={{
//                                 p: 2,
//                                 mb: 2,
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 justifyContent: 'space-between'
//                             }}
//                         >
//                             <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                                 <InsertDriveFileIcon color="primary" sx={{ mr: 2 }} />
//                                 <Box>
//                                     <Typography variant="subtitle1">
//                                         {file.name}
//                                     </Typography>
//                                     <Typography variant="body2" color="text.secondary">
//                                         {(file.size / 1024 / 1024).toFixed(2)} MB
//                                     </Typography>
//                                 </Box>
//                             </Box>
//                             <IconButton size="small" onClick={handleClearFile}>
//                                 <CloseIcon />
//                             </IconButton>
//                         </Paper>
                        
//                         {uploadStatus === 'uploading' && (
//                             <Box sx={{ width: '100%', mb: 2 }}>
//                                 <LinearProgress 
//                                     variant="determinate" 
//                                     value={uploadProgress} 
//                                     sx={{ height: 8, borderRadius: 1 }}
//                                 />
//                                 <Typography variant="body2" align="center" sx={{ mt: 1 }}>
//                                     {uploadProgress}% הושלם
//                                 </Typography>
//                             </Box>
//                         )}

//                         <Box sx={{ display: 'flex', justifyContent: 'center' }}>
//                             <Button 
//                                 variant="contained" 
//                                 color="primary" 
//                                 onClick={handleUpload}
//                                 disabled={uploadStatus === 'uploading'}
//                                 size="large"
//                                 sx={{ minWidth: 120 }}
//                             >
//                                 העלה קובץ
//                             </Button>
//                         </Box>
//                     </Box>
//                 )}
//             </Box>

//             <Snackbar 
//                 open={uploadStatus === 'success' || uploadStatus === 'error'}
//                 autoHideDuration={6000}
//                 onClose={handleCloseSnackbar}
//                 anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//             >
//                 <Alert 
//                     onClose={handleCloseSnackbar}
//                     severity={uploadStatus === 'success' ? 'success' : 'error'}
//                     variant="filled"
//                     sx={{ width: '100%' }}
//                 >
//                     {uploadStatus === 'success' 
//                         ? 'הקובץ הועלה בהצלחה' 
//                         : errorMessage}
//                 </Alert>
//             </Snackbar>
//         </Box>
//     );
// };

// export default FileUploader;
//--------------------------------------------

// import {
//   InsertDriveFile as FileIcon,
//   PictureAsPdf as PdfIcon,
//   Image as ImageIcon,
//   Description as DocIcon,
//   TableChart as SpreadsheetIcon,
//   Slideshow as PresentationIcon,
// } from "@mui/icons-material"

// export const getFileTypeIcon = (fileName: string) => {
//   const extension = fileName.split(".").pop()?.toLowerCase()
//   switch (extension) {
//     case "pdf":
//       return <PdfIcon sx={{ color: "#e53935" }} />
//     case "jpg":
//     case "jpeg":
//     case "png":
//     case "gif":
//       return <ImageIcon sx={{ color: "#43a047" }} />
//     case "doc":
//     case "docx":
//       return <DocIcon sx={{ color: "#1e88e5" }} />
//     case "xls":
//     case "xlsx":
//       return <SpreadsheetIcon sx={{ color: "#7cb342" }} />
//     case "ppt":
//     case "pptx":
//       return <PresentationIcon sx={{ color: "#fb8c00" }} />
//     default:
//       return <FileIcon sx={{ color: "#757575" }} />
//   }
// }

// export const formatDate = (dateString: string) => {
//   if (!dateString) return "—"

//   try {
//     const date = new Date(dateString)

//     // Check if date is valid
//     if (isNaN(date.getTime())) {
//       return "—"
//     }

//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     })
//   } catch (error) {
//     console.error("Error formatting date:", error)
//     return "—"
//   }
// }

// export const formatFileSize = (bytes: number) => {
//   if (!bytes) return "—"
//   if (bytes < 1024 * 1024) {
//     return (bytes / 1024).toFixed(1) + " KB"
//   } else {
//     return (bytes / (1024 * 1024)).toFixed(1) + " MB"
//   }
// }

// export const getFileType = (fileName: string): string => {
//   const extension = fileName.split(".").pop()?.toLowerCase()
//   switch (extension) {
//     case "pdf":
//       return "PDF"
//     case "doc":
//     case "docx":
//       return "Document"
//     case "jpg":
//     case "jpeg":
//     case "png":
//       return "Image"
//     case "xls":
//     case "xlsx":
//       return "Spreadsheet"
//     case "ppt":
//     case "pptx":
//       return "Presentation"
//     default:
//       return extension?.toUpperCase() || "File"
//   }
// }

// export const getIconColor = (fileName: string): string => {
//   const extension = fileName.split(".").pop()?.toLowerCase()
//   switch (extension) {
//     case "pdf":
//       return "#e53935" // Red
//     case "doc":
//     case "docx":
//       return "#1e88e5" // Blue
//     case "jpg":
//     case "jpeg":
//     case "png":
//       return "#43a047" // Green
//     case "xls":
//     case "xlsx":
//       return "#7cb342" // Light Green
//     case "ppt":
//     case "pptx":
//       return "#fb8c00" // Orange
//     default:
//       return "#757575" // Grey
//   }
// }

// export const validateFile = (file: File): { valid: boolean; errorMessage?: string } => {
//   const maxSize = 10 * 1024 * 1024 // 10MB
//   const allowedTypes = [
//     "application/pdf",
//     "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//     "image/jpeg",
//     "image/png",
//   ]

//   if (file.size > maxSize) {
//     return {
//       valid: false,
//       errorMessage: "File is too large. Maximum size is 10MB",
//     }
//   }

//   if (!allowedTypes.includes(file.type)) {
//     return {
//       valid: false,
//       errorMessage: "Unsupported file type",
//     }
//   }

//   return { valid: true }
// }

// // Helper function to download a file
// export const downloadFile = (url: string, fileName: string) => {
//   console.log(`Attempting to download file: ${fileName} from URL: ${url}`)

//   // For direct download of files that don't need special handling
//   try {
//     // Create a temporary anchor element
//     const anchor = document.createElement("a")
//     anchor.href = url
//     anchor.download = fileName
//     anchor.target = "_blank" // Open in new tab if direct download fails

//     // Append to the body
//     document.body.appendChild(anchor)

//     // Trigger click event
//     anchor.click()

//     // Clean up
//     document.body.removeChild(anchor)

//     console.log("Download initiated")
//   } catch (error) {
//     console.error("Error downloading file:", error)
//     alert(`Error downloading file: ${error}`)

//     // Fallback - open in new tab
//     window.open(url, "_blank")
//   }
// }

// // Function to generate a signed URL for file upload to AWS S3
// export const getSignedUploadUrl = async (fileName: string, fileType: string, folderId: number | null = null) => {
//   try {
//     // This would be your API endpoint that generates a signed URL
//     const response = await fetch("/api/get-upload-url", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         fileName,
//         fileType,
//         folderId,
//       }),
//     })

//     if (!response.ok) {
//       throw new Error(`Failed to get upload URL: ${response.status}`)
//     }

//     const data = await response.json()
//     return data.uploadUrl // The signed URL from your server
//   } catch (error) {
//     console.error("Error getting signed upload URL:", error)
//     throw error
//   }
// }

// // Function to upload a file to AWS S3 using a signed URL
// export const uploadFileToS3 = async (file: File, signedUrl: string) => {
//   try {
//     const response = await fetch(signedUrl, {
//       method: "PUT",
//       body: file,
//       headers: {
//         "Content-Type": file.type,
//       },
//     })

//     if (!response.ok) {
//       throw new Error(`Failed to upload file: ${response.status}`)
//     }

//     // Return the public URL of the file (this depends on your S3 configuration)
//     // Usually, you can derive the public URL from the signed URL by removing the query parameters
//     const publicUrl = signedUrl.split("?")[0]
//     return publicUrl
//   } catch (error) {
//     console.error("Error uploading file to S3:", error)
//     throw error
//   }
// }
